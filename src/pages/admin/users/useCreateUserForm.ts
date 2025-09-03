import { useCallback, useMemo, useState } from 'react';
// Хук для формы создания пользователя (без дженериков)
// Работает поверх готового сервисного слоя useAdminUsersApi
import { useAdminUsersApi } from './services';
import type { CreateUserDto } from '../../../_api/dto';

// Простой словарь ошибок по полям
type Errors = Partial<Record<keyof CreateUserDto | 'password', string>>;

// Локальное состояние формы — максимально близко к CreateUserDto
// Для удобства birthday храним как YYYY-MM-DD, а перед отправкой конвертим в ISO
export interface CreateUserFormState {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string; // YYYY-MM-DD
  phone: string;
  address: string;
  gender: 'MALE' | 'FEMALE';
  permissions: 'ADMIN' | 'TEACHER' | 'PARENT' | 'STUDENT';
}

const initialState: CreateUserFormState = {
  login: '',
  password: '',
  firstName: '',
  lastName: '',
  birthday: '',
  phone: '',
  address: '',
  gender: 'MALE',
  permissions: 'STUDENT',
};

export const useCreateUserForm = () => {
  // Берём create-мутацию из сервисного слоя
  const { create } = useAdminUsersApi();

  const [form, setForm] = useState<CreateUserFormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});

  // Установка значения поля
  const setField = useCallback(<K extends keyof CreateUserFormState>(key: K, value: CreateUserFormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  // Простая валидация обязательных полей
  const validate = useCallback((s: CreateUserFormState): Errors => {
    const e: Errors = {};
    if (!s.login) e.login = 'Укажите email (логин)';
    if (!s.password) e.password = 'Укажите пароль';
    if (!s.firstName) e.firstName = 'Укажите имя';
    if (!s.lastName) e.lastName = 'Укажите фамилию';
    if (!s.birthday) e.birthday = 'Укажите дату рождения';
    if (!s.gender) e.gender = 'Укажите пол';
    if (!s.permissions) e.permissions = 'Укажите права доступа';
    return e;
  }, []);

  // Сабмит формы: валидируем, маппим в CreateUserDto, вызываем мутацию
  const submit = useCallback(async () => {
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) return Promise.reject(v);

    // Конвертация даты YYYY-MM-DD → ISO строка
    const birthdayIso = new Date(form.birthday).toISOString();

    const payload: CreateUserDto = {
      login: form.login,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      birthday: birthdayIso,
      phone: form.phone,
      address: form.address,
      gender: form.gender,
      permissions: form.permissions,
    };

    await create.mutateAsync(payload);
    // После успешного создания очищаем форму
    setForm(initialState);
    setErrors({});
  }, [form, validate, create]);

  // Удобные флаги/деривативы
  const canSubmit = useMemo(() => form.login && form.password && form.firstName && form.lastName && form.birthday, [form]);
  const isSubmitting = create.isPending;

  // Сброс в исходное состояние
  const reset = useCallback(() => {
    setForm(initialState);
    setErrors({});
  }, []);

  return {
    form,
    setField,
    errors,
    submit,
    reset,
    canSubmit: Boolean(canSubmit),
    isSubmitting,
    // проброс мутации, если нужно тонко управлять onSuccess/onError извне
    mutation: create,
  } as const;
};

