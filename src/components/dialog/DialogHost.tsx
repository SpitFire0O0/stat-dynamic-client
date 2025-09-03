import React from 'react';
import { useDialogStore } from '../../store/dialog.store';
import { dialogRegistry } from './registry';

export const DialogHost: React.FC = () => {
  const { isOpen, key, payload, close } = useDialogStore();
  if (!isOpen || !key) return null;
  const Cmp = dialogRegistry[key];
  if (!Cmp) return null;
  return <Cmp isOpen={isOpen} onClose={close} payload={payload} />;
};
