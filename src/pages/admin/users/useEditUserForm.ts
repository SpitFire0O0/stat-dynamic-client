import { useCallback, useMemo, useState } from 'react';
import { useAdminUsersApi } from './services';
import type { AdminUser } from '../types';
import type { UpdateUserDto } from '../../../_api/dto';

// Простой словарь ошибок по полям
type Errors = Partial<Record<keyof UpdateUserDto, string>> & { common?: string };

// Локальное состояние формы редактирования пользователя
// birthday храним как YYYY-MM-DD (удобно для <input type="date">)
export interface EditUserFormState {
  id: string | null;
  login: string;
  firstName: string;
  lastName: string;
  birthday: string; // YYYY-MM-DD
  phone: string;
  address: string;
  gender: 'MALE' | 'FEMALE';
  permissions: 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT';
}

const empty: EditUserFormState = {
  id: null,
  login: '',
  firstName: '',
  lastName: '',
  birthday: '',
  phone: '',
  address: '',
  gender: 'MALE',
  permissions: 'STUDENT',
};

export const useEditUserForm = () => {
  const { update } = useAdminUsersApi();

  const [form, setForm] = useState<EditUserFormState>(empty);
  const [errors, setErrors] = useState<Errors>({});

  // Инициализация формы из выбранного пользователя
  const beginEdit = useCallback((u: AdminUser) => {
    setForm({
      id: u.id,
      login: u.login,
      firstName: u.firstName,
      lastName: u.lastName,
      birthday: u.birthday ? u.birthday.slice(0, 10) : '',
      phone: u.phone ?? '',
      address: u.address ?? '',
      gender: u.gender,
      permissions: u.permissions,
    });
    setErrors({});
  }, []);

  // Изменение поля
  const setField = useCallback(<K extends keyof EditUserFormState>(key: K, value: EditUserFormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  // Валидация необходимых полей (без пароля)
  const validate = useCallback((s: EditUserFormState): Errors => {
    const e: Errors = {};
    if (!s.id) e.common = 'Не выбран пользователь';
    if (!s.login) e.login = 'Укажите email (логин)';
    if (!s.firstName) e.firstName = 'Укажите имя';
    if (!s.lastName) e.lastName = 'Укажите фамилию';
    if (!s.birthday) e.birthday = 'Укажите дату рождения';
    return e;
  }, []);

  // Сохранение (PATCH)
  const submit = useCallback(async () => {
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return Promise.reject(v);

    const id = form.id as string;
    const birthdayIso = new Date(form.birthday).toISOString();

    const payload: UpdateUserDto = {
      // в Update не отправляем пароль
      login: form.login,
      firstName: form.firstName,
      lastName: form.lastName,
      birthday: birthdayIso,
      phone: form.phone,
      address: form.address,
      gender: form.gender,
      permissions: form.permissions,
    } as unknown as UpdateUserDto;

    await update.mutateAsync({ id, payload });
  }, [form, update, validate]);

  // Сброс формы
  const reset = useCallback(() => {
    setForm(empty);
    setErrors({});
  }, []);

  const canSubmit = useMemo(() => !!(form.id && form.login && form.firstName && form.lastName && form.birthday), [form]);
  const isSubmitting = update.isPending;

  return {
    form,
    setField,
    beginEdit,
    errors,
    submit,
    reset,
    canSubmit: Boolean(canSubmit),
    isSubmitting,
    mutation: update,
  } as const;
};

