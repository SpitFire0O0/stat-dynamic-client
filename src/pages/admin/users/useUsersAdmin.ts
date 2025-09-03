import { useMemo, useState } from 'react';
// Доменный хук для экрана управления пользователями (админ)
// Собирает данные/мутации из сервисной обёртки и локальную логику диалогов
import { useAdminUsersApi } from './services';
import type { AdminUser } from '../types';
import { useDialogStore } from '../../../store/dialog.store';

export const useUsersAdmin = () => {
  // Получаем унифицированный API для Users
  const { list, remove } = useAdminUsersApi();
  const { data: users = [], isLoading, isError, error, refetch } = list;
  
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  // Убрали клиентскую фильтрацию: используем список как есть
  const filteredUsers = users as AdminUser[];

  // Переименовываем для читабельности
  const deleteMutation = remove;
  // Подтверждение удаления
  const handleConfirmDelete = () => {
    console.log('[UsersAdmin] delete confirm', selectedUser?.id);
    if (selectedUser) deleteMutation.mutate(selectedUser.id);
  };

  // Примитивная статистика по ролям
  const stats = useMemo(() => ({
    total: users.length,
    teachers: users.filter(u => u.permissions === 'TEACHER').length,
    students: users.filter(u => u.permissions === 'STUDENT').length,
  }), [users]);

  const dialog = useDialogStore();

  return {
    filteredUsers,
    isLoading,
    isError,
    error,
    refetch,
    selectedUser,
    setSelectedUser,
    handleConfirmDelete,
    stats,
    dialog,
  };
};
