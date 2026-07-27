import { create } from "zustand";

export type ModalType = "about" | "guarantee" | "legal" | "contact" | "registro" | "video" | null;

interface ModalState {
    activeModal: ModalType;
    openModal: (type: ModalType) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    activeModal: null,
    openModal: (type) => set({ activeModal: type }),
    closeModal: () => set({ activeModal: null }),
}));
