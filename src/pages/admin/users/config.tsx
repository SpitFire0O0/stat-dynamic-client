// Конфигурация таблицы и формы пользователей админки (переиспользуемые элементы UI)
// Конфигурация таблицы и формы пользователей админки (переиспользуемые элементы UI)
import { HStack, Avatar, VStack, Text, Badge } from '@chakra-ui/react';
import type { AdminUser } from '../types';
import type { TableColumn } from '../../../components/base-table/types';
import { getRoleColor, getRoleLabel } from '../../../config/role-meta';

export const usersTableColumns: TableColumn<AdminUser>[] = [
  {
    header: 'Пользователь',
    field: (user: AdminUser) => (
      <HStack spacing={3}>
        <Avatar size="sm" name={`${user.firstName} ${user.lastName}`} />
        <VStack align="start" spacing={0}>
          <Text fontWeight="semibold">{user.firstName} {user.lastName}</Text>
          <Text fontSize="sm" color="gray.600">{user.gender === 'MALE' ? 'Мужской' : 'Женский'}</Text>
        </VStack>
      </HStack>
    )
  },
  { header: 'Email', field: 'login' },
  { header: 'Телефон', field: 'phone' },
  {
    header: 'Права',
    field: (user: AdminUser) => (
      <Badge colorScheme={getRoleColor(user.permissions as any)}>
        {getRoleLabel(user.permissions as any)}
      </Badge>
    )
  },
  { header: 'Дата создания', field: 'createdAt', isDateTime: true },
];

export type FieldKind = 'text' | 'textarea' | 'select' | 'password' | 'date';
export interface FieldSpec {
  key: keyof AdminUser | 'password';
  label: string;
  kind: FieldKind;
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
  showIf?: (ctx: { isEdit: boolean; user?: AdminUser | null }) => boolean;
}

export const usersFormFields: FieldSpec[] = [
  { key: 'firstName', label: 'Имя', kind: 'text', required: true },
  { key: 'lastName', label: 'Фамилия', kind: 'text', required: true },
  { key: 'login', label: 'Email (логин)', kind: 'text', required: true },
  { key: 'password', label: 'Пароль', kind: 'password', required: true, showIf: ({ isEdit }) => !isEdit },
  { key: 'birthday', label: 'Дата рождения', kind: 'date', required: true },
  { key: 'phone', label: 'Телефон', kind: 'text' },
  { key: 'gender', label: 'Пол', kind: 'select', options: [
    { label: 'Мужской', value: 'MALE' },
    { label: 'Женский', value: 'FEMALE' },
  ] },
  { key: 'address', label: 'Адрес', kind: 'textarea' },
  { key: 'permissions', label: 'Права доступа', kind: 'select', required: true, options: [
    { label: 'Студент', value: 'STUDENT' },
    { label: 'Преподаватель', value: 'TEACHER' },
    { label: 'Родитель', value: 'PARENT' },
    { label: 'Администратор', value: 'ADMIN' },
  ] },
];
