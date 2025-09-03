import React from 'react';
import type { DialogKey } from '../../store/dialog.store';
import { UserFormModal } from '../../pages/admin/users/UserFormModal';
import { UserDetailsModal } from '../../pages/admin/users/UserDetailsModal';
import { DeleteConfirmModal } from '../../pages/admin/components/DeleteConfirmModal';

export type DialogComponent = React.FC<{ isOpen: boolean; onClose: () => void; payload?: any }>;

const UserFormModalAdapter: DialogComponent = ({ isOpen, onClose, payload }) => (
  <UserFormModal isOpen={isOpen} onClose={onClose} user={payload?.user ?? null} />
);

const UserDetailsModalAdapter: DialogComponent = ({ isOpen, onClose, payload }) => (
  <UserDetailsModal isOpen={isOpen} onClose={onClose} user={payload?.user ?? null} />
);

const ConfirmDeleteAdapter: DialogComponent = ({ isOpen, onClose, payload }) => (
  <DeleteConfirmModal
    isOpen={isOpen}
    onClose={onClose}
    onConfirm={payload?.onConfirm}
    title={payload?.title ?? 'Подтверждение удаления'}
    message={payload?.message ?? 'Вы уверены, что хотите удалить запись?'}
  />
);

export const dialogRegistry: Record<DialogKey, DialogComponent> = {
  'user.form': UserFormModalAdapter,
  'user.details': UserDetailsModalAdapter,
  'confirm.delete': ConfirmDeleteAdapter,
};
