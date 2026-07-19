export type DataLayerPrimitive = string | number | boolean | null;

export type DataLayerValue =
  | DataLayerPrimitive
  | DataLayerPrimitive[]
  | Record<string, unknown>;

export interface AnalyticsEvent {
  event: string;
  [key: string]: DataLayerValue | undefined;
}

declare global {
  interface Window {
    dataLayer: AnalyticsEvent[];
  }
}

/**
 * Sends an event to Google Tag Manager's dataLayer.
 *
 * This function does not send personally identifiable information.
 * Do not include names, email addresses, phone numbers, student data,
 * addresses, or any other sensitive information in analytics events.
 */
export function pushAnalyticsEvent(
  analyticsEvent: AnalyticsEvent,
): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(analyticsEvent);
}
