import { createStore } from "zustand/vanilla";

export type ModalState<T = unknown> = {
  open: boolean;
  restMethod: string;
  modalTitle: string;
  data: T | null;
  openWith: (data: T) => void;
  close: () => void;
  setModalDetails: (restMethod?: string, modalTitle?: string) => void;
};

/**
 * Store para manejar el estado del modal
 */
export const modalStore = createStore<ModalState<any>>((set) => ({
  open: false,
  data: null,
  restMethod: "",
  modalTitle: "",
  openWith: (data) => set({ open: true, data }),
  close: () => set({ open: false, data: null }),
  setModalDetails: (restMethod: string = "", modalTitle: string = "") => set({ restMethod, modalTitle }),
}));

/**
 * Hook para usar el estado del modal en componentes Preact
 */
import { useEffect, useState } from "preact/hooks";
export function useModal<T = unknown>() {
  const [state, setState] = useState(modalStore.getState());
  useEffect(() => modalStore.subscribe(setState), []);
  return state as ModalState<T>;
}
