
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    createLeadHandler,
} from '../supabase/functions/submit-lead/handler.ts';

function fixture(language = 'es') {
    const id =
        'a9fbe394-285a-41ca-85cc-fba1e1e91681';

    const rows = new Map();
    const sent = [];
    const provider = new Map();

    const handler = createLeadHandler({
        apiKey: () => 'fake-key',

        fromEmail: () =>
            'notifications@futurefoundationsedu.com',

        logoUrl: () => undefined,

        now: () =>
            Date.parse('2026-09-27T12:00:00Z'),

        store: {
            async saveOnce(row) {
                if (!rows.has(row.id)) {
                    rows.set(
                        row.id,
                        structuredClone(row),
                    );
                }

                return structuredClone(
                    rows.get(row.id),
                );
            },

            async markAccepted(key, emailId) {
                Object.assign(rows.get(key), {
                    email_status: 'accepted',
                    resend_email_id: emailId,
                });
            },

            async markConfirmationAccepted(
                key,
                emailId,
            ) {
                Object.assign(rows.get(key), {
                    confirmation_status: 'accepted',
                    confirmation_email_id: emailId,
                });
            },
        },

        fetch: async (_url, init) => {
            const key =
                init.headers['Idempotency-Key'];

            sent.push({
                key,
                body: JSON.parse(init.body),
            });

            if (!provider.has(key)) {
                provider.set(key, {
                    id: `resend-${provider.size + 1}`,
                    body: init.body,
                });
            } else {
                assert.equal(
                    provider.get(key).body,
                    init.body,
                );
            }

            return Response.json({
                id: provider.get(key).id,
            });
        },
    });

    const payload = {
        submission_id: id,
        parent_name: 'TEST Parent',
        email: 'parent@example.com',
        student_name: 'TEST Child',
        message: 'TEST ONLY',
        source: 'contact_page',
        language,
    };

    const request = () =>
        new Request('https://local.test', {
            method: 'POST',
            body: JSON.stringify(payload),
        });

    return {
        id,
        rows,
        sent,
        handler,
        request,
    };
}

for (const lang of ['es', 'en']) {
    test(
        `new ${lang} lead: staff + parent emails, no duplicate on retry`,
        async () => {
            const f = fixture(lang);

            const response =
                await f.handler(f.request());

            assert.equal(
                response.status,
                200,
            );

            assert.equal(
                (await response.json())
                    .confirmation_status,
                'accepted',
            );

            assert.equal(f.sent.length, 2);

            assert.deepEqual(
                f.sent[0].body.to,
                ['futurefoundations.edu@gmail.com'],
            );

            assert.deepEqual(
                f.sent[1].body.to,
                ['parent@example.com'],
            );

            assert.match(
                f.sent[1].body.subject,
                lang === 'es'
                    ? /recibido su consulta/i
                    : /received your inquiry/i,
            );

            assert.equal(
                f.rows.get(f.id)
                    .confirmation_eligible,
                true,
            );

            assert.deepEqual(
                f.rows.get(f.id)
                    .confirmation_payload,
                f.sent[1].body,
            );

            await f.handler(f.request());

            assert.equal(f.sent.length, 2);
        },
    );
}

test(
    'ineligible saved lead never receives parent email',
    async () => {
        const f = fixture('en');

        await f.handler(f.request());

        f.sent.length = 0;

        f.rows.get(f.id)
            .confirmation_eligible = false;

        f.rows.get(f.id)
            .confirmation_status = 'pending';

        f.rows.get(f.id)
            .confirmation_email_id = null;

        const response =
            await f.handler(f.request());

        assert.equal(
            (await response.json())
                .confirmation_status,
            'not_applicable',
        );

        assert.equal(f.sent.length, 0);
    },
);
