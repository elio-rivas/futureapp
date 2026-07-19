/**
 * Analytics layer for the site.
 *
 * All tracking is dispatched exclusively through Google Tag Manager via the
 * global `window.dataLayer` array. No gtag.js, react-ga, react-ga4 or
 * react-gtm-module libraries are used, per the project analytics architecture.
 *
 * GTM container: GTM-MLV2FF5V
 * GA4 measurement id: G-6LR1E77L1B (wired inside GTM, not in the app)
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function push(event: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/**
 * Fire a virtual page view. Called by <RouteTracker /> on every route change
 * so GA4 receives accurate SPA navigation events.
 */
export function trackVirtualPageView(path: string, title: string): void {
  push({
    event: 'virtual_page_view',
    page_path: path,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
  });
}

export interface LeadEventPayload {
  source: string;
  service?: string;
  form_id?: string;
}

/** Fire when a lead form is successfully submitted. */
export function trackGenerateLead(payload: LeadEventPayload): void {
  push({
    event: 'generate_lead',
    lead_source: payload.source,
    interested_service: payload.service,
    form_id: payload.form_id ?? payload.source,
  });
}

/** Fire when any form submit attempt is made (success or failure tracked separately). */
export function trackFormSubmit(formId: string, source: string): void {
  push({
    event: 'form_submit',
    form_id: formId,
    form_source: source,
  });
}

/** Fire when a consultation request is initiated. */
export function trackScheduleConsultation(source: string): void {
  push({
    event: 'schedule_consultation',
    consultation_source: source,
  });
}

/** Fire when a phone number link is clicked. */
export function trackPhoneClick(phone: string, source: string): void {
  push({
    event: 'phone_click',
    phone_number: phone,
    click_source: source,
  });
}

/** Fire when an email link is clicked. */
export function trackEmailClick(email: string, source: string): void {
  push({
    event: 'email_click',
    email_address: email,
    click_source: source,
  });
}

/** Fire when the JotForm success link is clicked. */
export function trackJotformSubmit(source: string): void {
  push({
    event: 'jotform_submit',
    jotform_source: source,
  });
}

/** Fire when a link navigates away from the site. */
export function trackOutboundLinkClick(url: string, source: string): void {
  push({
    event: 'outbound_link_click',
    link_url: url,
    click_source: source,
  });
}
