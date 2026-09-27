
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import { createClient } from 'npm:@supabase/supabase-js@2';

import {
  createLeadHandler,
  type SavedLead,
} from './handler.ts';

// Official Future Foundations Education logo.
// This is the existing public image used by the website.
const LOGO_URL =
  'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

// Connect to the existing Bolt-managed Supabase project.
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

// Connect the HTTP handler to Supabase and Resend.
Deno.serve(
  createLeadHandler({
    apiKey: () =>
      Deno.env.get('RESEND_API_KEY'),

    fromEmail: () =>
      Deno.env.get('RESEND_FROM_EMAIL'),

    logoUrl: () => LOGO_URL,

    now: Date.now,

    fetch,

    log: (event) => {
      console.info(JSON.stringify(event));
    },

    store: {
      // Insert a submission only once.
      // Existing submissions are never overwritten.
      async saveOnce(lead: SavedLead): Promise<SavedLead> {
        const { error } = await supabase
          .from('leads')
          .upsert(lead, {
            onConflict: 'id',
            ignoreDuplicates: true,
          });

        if (error) {
          throw new Error('Lead persistence failed');
        }

        const {
          data,
          error: readError,
        } = await supabase
          .from('leads')
          .select('*')
          .eq('id', lead.id)
          .single();

        if (readError || !data) {
          throw new Error('Lead lookup failed');
        }

        return data as SavedLead;
      },

      // Record acceptance of the email sent to FFE.
      async markAccepted(
        id: string,
        emailId: string,
      ): Promise<void> {
        const { data, error } = await supabase
          .from('leads')
          .update({
            email_status: 'accepted',
            resend_email_id: emailId,
            email_accepted_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select('id')
          .single();

        if (error || !data) {
          throw new Error(
            'Institutional email receipt persistence failed',
          );
        }
      },

      // Record acceptance of the automatic email
      // sent to the parent or guardian.
      async markConfirmationAccepted(
        id: string,
        emailId: string,
      ): Promise<void> {
        const { data, error } = await supabase
          .from('leads')
          .update({
            confirmation_status: 'accepted',
            confirmation_email_id: emailId,
          })
          .eq('id', id)
          .select('id')
          .single();

        if (error || !data) {
          throw new Error(
            'Confirmation email receipt persistence failed',
          );
        }
      },
    },
  }),
);
