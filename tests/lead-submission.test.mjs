import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';

async function load(entry, define = {}) {
  const result = await build({ entryPoints: [entry], bundle: true, write: false, platform: 'node', format: 'esm', define });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}
const { createLeadHandler } = await load('supabase/functions/submit-lead/handler.ts');
const client = await load('src/lib/supabase.ts', {
  'import.meta.env.VITE_SUPABASE_URL': '"https://test.supabase.co"',
  'import.meta.env.VITE_SUPABASE_ANON_KEY': '"test-anon-key"',
});
const id = 'f8839278-4261-4dc2-b5a7-c0e677460e76';
const payload = { submission_id: id, parent_name: 'TEST Family', email: 'family@example.com',
  student_name: 'TEST Student', preferred_contact: 'Email', message: '<b>TEST only</b>', source: 'contact_page' };
const request = (body = payload) => new Request('https://test/submit-lead', { method: 'POST', body: JSON.stringify(body) });
function setup(options = {}) {
  const rows = new Map();
  const calls = [];
  const receipts = new Map();
  let markFails = options.markFails || false;
  let clock = Date.parse('2026-09-23T12:00:00Z');
  const handler = createLeadHandler({
    apiKey: () => options.noKey ? undefined : 'fake-test-key',
    now: () => clock,
    store: {
      async saveOnce(lead) {
        if (options.saveFails) throw new Error('db down');
        if (!rows.has(lead.id)) rows.set(lead.id, structuredClone(lead));
        return structuredClone(rows.get(lead.id));
      },
      async markAccepted(key, emailId) {
        if (markFails) { markFails = false; throw new Error('db down'); }
        Object.assign(rows.get(key), { email_status: 'accepted', resend_email_id: emailId });
      },
    },
    fetch: async (url, init) => {
      calls.push({ url, ...init });
      if (options.networkFails) throw new TypeError('network');
      if (options.providerStatus) return new Response('{}', { status: options.providerStatus });
      if (options.missingId) return Response.json({});
      const key = init.headers['Idempotency-Key'];
      if (receipts.has(key)) assert.equal(receipts.get(key).body, init.body);
      else receipts.set(key, { body: init.body, id: 'test-email-id' });
      return Response.json({ id: receipts.get(key).id });
    },
  });
  return { handler, rows, calls, receipts, advance: ms => { clock += ms; } };
}

test('accepted receipt, exact sender/recipient/reply_to, all contact fields', async () => {
  const s = setup(); const r = await s.handler(request()); const b = await r.json();
  assert.equal(r.status, 200); assert.equal(b.status, 'accepted'); assert.equal(b.email_id, 'test-email-id');
  const mail = JSON.parse(s.calls[0].body);
  assert.equal(mail.from, 'Future Foundations Education <notifications@futurefoundationsedu.com>');
  assert.deepEqual(mail.to, ['futurefoundations.edu@gmail.com']); assert.equal(mail.reply_to, payload.email);
  assert.match(mail.text, /TEST Student/); assert.match(mail.text, /Preferred contact: Email/);
  assert.match(mail.text, /<b>TEST only<\/b>/); assert.equal(mail.html, undefined);
  assert.equal(s.rows.get(id).email_status, 'accepted');
});
for (const status of [400, 401, 403, 429, 500]) {
  test(`provider HTTP ${status} never reports success; saved lead remains pending`, async () => {
    const s = setup({ providerStatus: status }); const r = await s.handler(request());
    assert.equal(r.status, 502); assert.equal((await r.json()).success, false);
    assert.equal(s.rows.get(id).email_status, 'pending');
  });
}
for (const option of ['networkFails', 'missingId']) {
  test(`${option}: acceptance is unknown, not success`, async () => {
    const s = setup({ [option]: true }); const r = await s.handler(request());
    assert.equal(r.status, 502); assert.equal((await r.json()).code, 'email_status_unknown');
  });
}
test('missing secret and failed persistence never call Resend', async () => {
  for (const option of ['noKey', 'saveFails']) {
    const s = setup({ [option]: true }); const r = await s.handler(request());
    assert.equal(r.status, 503); assert.equal(s.calls.length, 0);
  }
});
test('repeat accepted submission reuses one database row and one email', async () => {
  const s = setup(); await s.handler(request()); const second = await s.handler(request());
  assert.equal(second.status, 200); assert.equal(s.rows.size, 1); assert.equal(s.calls.length, 1);
});
test('receipt write failure is recoverable using exact same provider body and key', async () => {
  const s = setup({ markFails: true });
  assert.equal((await s.handler(request())).status, 503);
  assert.equal((await s.handler(request())).status, 200);
  assert.equal(s.rows.size, 1); assert.equal(s.receipts.size, 1); assert.equal(s.calls.length, 2);
  assert.equal(s.calls[0].body, s.calls[1].body);
});
test('concurrent retries use one durable row and provider idempotency key', async () => {
  const s = setup(); const results = await Promise.all([s.handler(request()), s.handler(request())]);
  assert(results.every(r => r.status === 200)); assert.equal(s.rows.size, 1); assert.equal(s.receipts.size, 1);
});
test('same ID with changed content is rejected without another email', async () => {
  const s = setup(); await s.handler(request());
  const r = await s.handler(request({ ...payload, message: 'changed' }));
  assert.equal(r.status, 409); assert.equal((await r.json()).code, 'submission_conflict');
  assert.equal(s.calls.length, 1);
});
test('pending inquiry is not resent beyond the safe provider idempotency window', async () => {
  const s = setup({ networkFails: true }); await s.handler(request()); s.advance(23 * 60 * 60 * 1000);
  const r = await s.handler(request()); assert.equal(r.status, 409);
  assert.equal((await r.json()).code, 'review_required'); assert.equal(s.calls.length, 1);
});
test('invalid input, honeypot, oversized message, methods and CORS', async () => {
  const s = setup();
  for (const body of [null, [], { ...payload, email: 'bad' }, { ...payload, parent_name: 123 },
    { ...payload, website: 'bot' }, { ...payload, message: 'x'.repeat(5001) },
    { ...payload, submission_id: 'invalid' }, { ...payload, parent_name: 'Header\r\nInjection' }]) {
    assert.equal((await s.handler(request(body))).status, 400);
  }
  assert.equal((await s.handler(new Request('https://test', { method: 'GET' }))).status, 405);
  const preflight = await s.handler(new Request('https://test', { method: 'OPTIONS' }));
  assert.equal(preflight.status, 204); assert.equal(preflight.headers.get('Access-Control-Allow-Origin'), '*');
  assert.equal(s.calls.length, 0);
});
test('client rejects old false-success response, malformed receipts, and provider failures', async () => {
  const original = globalThis.fetch;
  try {
    for (const [status, body] of [[200, { success: true }], [200, { success: false }],
      [200, { success: true, status: 'accepted', submission_id: 'wrong', email_id: 'mail' }],
      [502, { success: false, code: 'email_not_accepted' }]]) {
      globalThis.fetch = async () => Response.json(body, { status });
      await assert.rejects(client.submitLead(payload, id), client.LeadSubmissionError);
    }
    globalThis.fetch = async () => { throw new TypeError('offline'); };
    await assert.rejects(client.submitLead(payload, id), { code: 'email_status_unknown' });
    globalThis.fetch = async (_url, init) => {
      assert.equal(JSON.parse(init.body).submission_id, id);
      return Response.json({ success: true, status: 'accepted', submission_id: id, email_id: 'mail' });
    };
    assert.equal((await client.submitLead(payload, id)).email_id, 'mail');
  } finally { globalThis.fetch = original; }
});
test('retry identity survives reload without storing personal information', async () => {
  const storage = new Map();
  globalThis.sessionStorage = { getItem: k => storage.get(k), setItem: (k,v) => storage.set(k,v) };
  try {
    const first = await client.getSubmissionAttempt(payload);
    assert.deepEqual(await client.getSubmissionAttempt(payload), first);
    assert.deepEqual(await client.getSubmissionAttempt(payload, first), first);
    assert.notEqual((await client.getSubmissionAttempt({ ...payload, message: 'new' }, first)).id, first.id);
    assert(!JSON.stringify([...storage.values()]).includes(payload.email));
  } finally { delete globalThis.sessionStorage; }
});
