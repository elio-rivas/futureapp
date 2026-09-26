import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { createLeadHandler, type SavedLead } from './handler.ts';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

Deno.serve(createLeadHandler({
  apiKey: () => Deno.env.get('RESEND_API_KEY'),
  fromEmail: () => Deno.env.get('RESEND_FROM_EMAIL'),
  log: event => console.info(JSON.stringify(event)),
  now: Date.now,
  fetch,
  store: {
    async saveOnce(lead) {
      const { error } = await supabase.from('leads').upsert(lead, {
        onConflict: 'id', ignoreDuplicates: true,
      });
      if (error) throw new Error('Lead persistence failed');
      const { data, error: readError } = await supabase.from('leads')
        .select('*').eq('id', lead.id).single();
      if (readError || !data) throw new Error('Lead lookup failed');
      return data as SavedLead;
    },
    async markAccepted(id, emailId) {
      const { data, error } = await supabase.from('leads')
        .update({ email_status: 'accepted', resend_email_id: emailId, email_accepted_at: new Date().toISOString() })
        .eq('id', id).select('id').single();
      if (error || !data) throw new Error('Email receipt persistence failed');
    },
  },
}));
