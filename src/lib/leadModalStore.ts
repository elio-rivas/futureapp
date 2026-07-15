let openCallback: (() => void) | null = null;

export function openLeadModal() {
    openCallback?.();
}

export function registerOpenLeadModal(cb: () => void) {
    openCallback = cb;
    return () => {
        if (openCallback === cb) openCallback = null;
    };
}
