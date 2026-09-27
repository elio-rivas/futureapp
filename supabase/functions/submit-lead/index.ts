
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

import {
  createClient,
} from 'npm:@supabase/supabase-js@2';

import {
  createLeadHandler,
  type SavedLead,
} from './handler.ts';

// --------------------------------------------------
// Supabase connection
// --------------------------------------------------

const supabaseUrl =
  Deno.env.get('SUPABASE_URL');

const serviceRoleKey =
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    'Missing Supabase configuration',
  );
}

const supabase = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

// --------------------------------------------------
// Lead handler
// --------------------------------------------------

const handler = createLeadHandler({
  apiKey: () =>
    Deno.env.get('RESEND_API_KEY'),

  fromEmail: () =>
    Deno.env.get('RESEND_FROM_EMAIL'),

  logoUrl: () =>
    Deno.env.get('FFE_LOGO_URL'),

  now: Date.now,

  fetch,

  log: (event) => {
    console.info(
      JSON.stringify(event),
    );
  },

  store: {
    // ----------------------------------------------
    // Save a new lead only once
    // ----------------------------------------------

    async saveOnce(
      lead: SavedLead,
    ): Promise<SavedLead> {
      const {
        error: insertError,
      } = await supabase
        .from('leads')
        .upsert(lead, {
          onConflict: 'id',
          ignoreDuplicates: true,
        });

      if (insertError) {
        console.error(
          'Lead persistence failed',
        );

        throw new Error(
          'Lead persistence failed',
        );
      }

      /*
       * Always retrieve the stored record.
       *
       * If the submission already exists,
       * the original record is returned
       * without overwriting its delivery
       * status or Resend identifiers.
       */

      const {
        data,
        error: readError,
      } = await supabase
        .from('leads')
        .select('*')
        .eq('id', lead.id)
        .single();

      if (readError || !data) {
        console.error(
          'Lead lookup failed',
        );

        throw new Error(
          'Lead lookup failed',
        );
      }

      return data as SavedLead;
    },

    // ----------------------------------------------
    // Mark institutional notification accepted
    // ----------------------------------------------

    async markAccepted(
      id: string,
      emailId: string,
    ): Promise<void> {
      const {
        data,
        error,
      } = await supabase
        .from('leads')
        .update({
          email_status: 'accepted',

          resend_email_id:
            emailId,

          email_accepted_at:
            new Date().toISOString(),
        })
        .eq('id', id)
        .select('id')
        .single();

      if (error || !data) {
        console.error(
          'Institutional email receipt persistence failed',
        );

        throw new Error(
          'Institutional email receipt persistence failed',
        );
      }
    },

    // ----------------------------------------------
    // Mark family confirmation accepted
    // ----------------------------------------------

    async markConfirmationAccepted(
      id: string,
      emailId: string,
    ): Promise<void> {
      const {
        data,
        error,
      } = await supabase
        .from('leads')
        .update({
          confirmation_status:
            'accepted',

          confirmation_email_id:
            emailId,
        })
        .eq('id', id)
        .select('id')
        .single();

      if (error || !data) {
        console.error(
          'Confirmation email receipt persistence failed',
        );

        throw new Error(
          'Confirmation email receipt persistence failed',
        );
      }
    },
  },
});

// --------------------------------------------------
// Start Supabase Edge Function
// --------------------------------------------------

Deno.serve(handler);
