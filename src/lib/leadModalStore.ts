const EVENT = 'ff:open-lead-modal';

export function openLeadModal() {
    window.dispatchEvent(new CustomEvent(EVENT));
}

export function onOpenLeadModal(cb: () => void) {
    window.addEventListener(EVENT, cb);
    return () => window.removeEventListener(EVENT, cb);
}
