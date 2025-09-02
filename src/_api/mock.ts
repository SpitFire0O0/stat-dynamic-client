// Простой in-memory mock для CRUD эндпоинтов

type Row = Record<string, any> & { id?: string };

type Store = Record<string, Row[]>; // ключ — basePath

const store: Store = {
  '/api/users': [
    { id: 'u1', login: 'admin@example.com', firstName: 'Админ', lastName: 'Системы', permissions: 'ADMIN', gender: 'MALE' },
    { id: 'u2', login: 'teacher@example.com', firstName: 'Иван', lastName: 'Иванов', permissions: 'TEACHER', gender: 'MALE' },
  ],
  '/api/groups': [
    { id: 'g1', name: '11-2024', slug: '11-2024', curatorId: 'u2', description: 'Выпускной класс' },
  ],
  '/api/discipline': [
    { id: 'd1', title: 'Алгебра' },
    { id: 'd2', title: 'Физика' },
  ],
  '/api/course': [
    { id: 'c1', title: 'АЛГ-25', description: 'Курс Алгебры 2025', academicYear: 2025, disciplineId: 'd1' },
  ],
};

export const mockList = async (basePath: string) => {
  return (store[basePath] ?? []);
};

const rid = () => Math.random().toString(36).slice(2, 10);

export const mockCreate = async (basePath: string, payload: Row) => {
  const id = payload.id ?? rid();
  const row = { ...payload, id };
  store[basePath] = [...(store[basePath] ?? []), row];
  return row;
};

export const mockUpdate = async (basePath: string, id: string, payload: Row) => {
  const list = store[basePath] ?? [];
  store[basePath] = list.map((r) => (String(r.id) === String(id) ? { ...r, ...payload, id } : r));
  return store[basePath].find((r) => String(r.id) === String(id));
};

export const mockDelete = async (basePath: string, id: string) => {
  const list = store[basePath] ?? [];
  store[basePath] = list.filter((r) => String(r.id) !== String(id));
  return { ok: true };
};

export const isMockEnabled = () => {
  const env = (import.meta as any)?.env?.VITE_API_MOCK;
  if (env != null) return String(env) === '1' || String(env) === 'true';
  return typeof localStorage !== 'undefined' && localStorage.getItem('api-mock') === '1';
};
