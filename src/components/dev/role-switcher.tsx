// Простой переключатель ролей для DEV (меняет permissions в user)
import React from 'react';
import { Select } from '@chakra-ui/react';
import { useAuthStore } from '../../store/auth.store';
import { useQueryClient } from '@tanstack/react-query';

const ROLE_OPTIONS = ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] as const;

export const RoleSwitcher: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const qc = useQueryClient();

  const current = user?.permissions ?? 'STUDENT';

  const onChange = (v: string) => {
    if (!user) return;
    const next = { ...user, permissions: v as any };
    // Обновляем стор и кэш React Query, чтобы useAuth() возвращал обновлённого пользователя
    setUser(next);
    qc.setQueryData(['user', 'current'], next);
  };

  return (
    <Select
      size="sm"
      width="180px"
      value={current}
      onChange={(e) => onChange(e.target.value)}
      title="Role switcher (DEV)"
    >
      {ROLE_OPTIONS.map((r) => (
        <option key={r} value={r}>{r}</option>
      ))}
    </Select>
  );
};
