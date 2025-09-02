import { apiClient } from './client';
import { isMockEnabled, mockList, mockCreate, mockUpdate, mockDelete } from './mock';

export const requestList = async <T = any>(basePath: string): Promise<T[]> => {
  if (isMockEnabled()) return await mockList(basePath) as T[];
  const { data, error } = await apiClient.path(basePath as any).method('get').create()();
  if (error) throw error;
  return (data as any) ?? [];
};

export const requestCreate = async <TCreate = any>(basePath: string, payload: TCreate): Promise<void> => {
  if (isMockEnabled()) { await mockCreate(basePath, payload as any); return; }
  const { error } = await apiClient.path(basePath as any).method('post').create()({ body: payload as any });
  if (error) throw error;
};

export const requestUpdate = async <TUpdate = any>(basePath: string, id: string, payload: TUpdate): Promise<void> => {
  if (isMockEnabled()) { await mockUpdate(basePath, id, payload as any); return; }
  const { error } = await apiClient
    .path(`${basePath}/{id}` as any)
    .method('patch')
    .create()({ params: { path: { id } }, body: payload as any });
  if (error) throw error;
};

export const requestDelete = async (basePath: string, id: string): Promise<void> => {
  if (isMockEnabled()) { await mockDelete(basePath, id); return; }
  const { error } = await apiClient
    .path(`${basePath}/{id}` as any)
    .method('delete')
    .create()({ params: { path: { id } } });
  if (error) throw error;
};

