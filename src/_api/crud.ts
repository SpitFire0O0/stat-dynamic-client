// Универсальные CRUD-функции поверх openapi-fetch
// Без any: только unknown и дженерики. Путь ресурса валидируем типами клиента.
import { apiClient } from './client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { paths } from './schema';

// Вычисляемые типы путей по схеме и типы параметров методов клиента
type GetPath = { [K in keyof paths]: paths[K] extends { get: any } ? K : never }[keyof paths];
type PostPathWithBody = { [K in keyof paths]: paths[K] extends { post: infer Op }
  ? (Op extends { requestBody: any } ? K : never)
  : never }[keyof paths];
type PatchPath = { [K in keyof paths]: paths[K] extends { patch: any } ? K : never }[keyof paths];
type DeletePath = { [K in keyof paths]: paths[K] extends { delete: any } ? K : never }[keyof paths];
type IdPath<K extends string> = `${K}/{id}`;

// Кросс-валидация базового CRUD-пути: GET+POST c телом, и наличие /{id} для PATCH/DELETE
type ValidCrudBase<K extends keyof paths & string> =
  K extends GetPath
    ? K extends PostPathWithBody
      ? IdPath<K> extends PatchPath
        ? IdPath<K> extends DeletePath
          ? K
          : never
        : never
      : never
    : never;
export type CrudType = ValidCrudBase<keyof paths & string>;

// Типы init/путей клиента для корректных вызовов
type GetInit = Parameters<typeof apiClient.GET>[1];
type PostInit = Parameters<typeof apiClient.POST>[1];
type PatchPathParam = Parameters<typeof apiClient.PATCH>[0];
type PatchInit = Parameters<typeof apiClient.PATCH>[1];
type DeletePathParam = Parameters<typeof apiClient.DELETE>[0];
type DeleteInit = Parameters<typeof apiClient.DELETE>[1];

// Список
export const requestList = async <T, Q = Record<string, unknown>>(
  listPath: GetPath,
  params?: Q,
): Promise<T[]> => {
  const init = (params ? { params: { query: params } } : {}) as GetInit;
  const { data, error } = await apiClient.GET(listPath, init);
  if (error) throw error
  const value = data
  return Array.isArray(value) ? (value as T[]) : [];
};

// Создать
export const requestCreate = async <P extends CrudType, TCreate = unknown>(
  listPath: P,
  payload: TCreate,
): Promise<void> => {
  const init = { body: payload } as PostInit;
  const { error } = await apiClient.POST(listPath as PostPathWithBody, init);
  if (error) throw error;
};

// Обновить по id
export const requestUpdate = async <P extends CrudType, TUpdate = unknown>(basePath: P, id: string, payload: TUpdate): Promise<void> => {
  const itemPath = (`${String(basePath)}/{id}`) as PatchPathParam;
  const init = ({ params: { path: { id } }, body: payload }) as PatchInit;
  const { error } = await apiClient.PATCH(itemPath, init);
  if (error) throw error as unknown;
};

// Удалить по id
export const requestDelete = async <P extends CrudType>(basePath: P, id: string): Promise<void> => {
  const itemPath = (`${String(basePath)}/{id}`) as DeletePathParam;
  const init = ({ params: { path: { id } } }) as DeleteInit;
  const { error } = await apiClient.DELETE(itemPath, init);
  if (error) throw error;
};

// Фабрика CRUD-хуков
export const createResourceHooks = <TList = unknown, TCreate = unknown, TUpdate = unknown>(opts: {
  basePath: CrudType;
  keys: {
    all: readonly unknown[];
    list: () => readonly unknown[];
  };
}) => {
  return () => {
    const qc = useQueryClient();

    const list = useQuery<TList[], Error>({
      queryKey: opts.keys.list(),
      queryFn: async () => await requestList<TList>(opts.basePath as GetPath),
    });

    const create = useMutation<void, Error, TCreate>({
      mutationFn: (payload: TCreate) => requestCreate(opts.basePath, payload),
      onSuccess: () => qc.invalidateQueries({ queryKey: opts.keys.list() }),
      onError: (err: unknown) => {
        console.error('[Hooks] create error:', String(opts.basePath), err);
      },
    });

    const update = useMutation<void, Error, { id: string; payload: TUpdate }>({
      mutationFn: ({ id, payload }) => requestUpdate(opts.basePath, id, payload),
      onSuccess: () => qc.invalidateQueries({ queryKey: opts.keys.list() }),
      onError: (err: unknown, vars) => {
        console.error('[Hooks] update error:', `${String(opts.basePath)}/${vars.id}`, err);
      },
    });

    const remove = useMutation<void, Error, string>({
      mutationFn: (id: string) => requestDelete(opts.basePath, id),
      onSuccess: () => qc.invalidateQueries({ queryKey: opts.keys.list() }),
      onError: (err: unknown, id) => {
        console.error('[Hooks] delete error:', `${String(opts.basePath)}/${id}`, err);
      },
    });

    const invalidateList = () => qc.invalidateQueries({ queryKey: opts.keys.list() });

    return { basePath: opts.basePath, keys: opts.keys, list, create, update, remove, invalidateList } as const;
  };
};
