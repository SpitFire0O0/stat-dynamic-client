import { create } from 'zustand';

export type DialogKey = 'user.form' | 'user.details' | 'confirm.delete';

type DialogState = {
  isOpen: boolean;
  key: DialogKey | null;
  payload: any;
};

type DialogActions = {
  open: (key: DialogKey, payload?: any) => void;
  close: () => void;
};

export const useDialogStore = create<DialogState & DialogActions>((set) => ({
  isOpen: false,
  key: null,
  payload: null,
  open: (key, payload) => set({ isOpen: true, key, payload }),
  close: () => set({ isOpen: false, key: null, payload: null }),
}));

