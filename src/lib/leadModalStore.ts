import { useSyncExternalStore } from 'react';

type ModalState = { open: boolean };

let state: ModalState = { open: false };
const listeners = new Set<() => void>();

function emit(next: ModalState) {
    state = next;
    listeners.forEach((fn) => fn());
}

export function openLeadModal() {
    emit({ open: true });
}

export function closeLeadModal() {
    emit({ open: false });
}

function subscribe(callback: () => void) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

function getSnapshot() {
    return state;
}

export function useLeadModal() {
    return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
