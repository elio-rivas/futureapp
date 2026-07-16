const EVENT = 'ff:open-lead-modal';

export interface LeadModalPayload {
  defaultService?: string;
  defaultMessage?: string;
}

export function openLeadModal(payload?: LeadModalPayload) {
  window.dispatchEvent(new CustomEvent<LeadModalPayload>(EVENT, { detail: payload ?? {} }));
}

export function onOpenLeadModal(cb: (payload: LeadModalPayload) => void) {
  const handler = (e: Event) => {
    const ce = e as CustomEvent<LeadModalPayload>;
    cb(ce.detail ?? {});
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
