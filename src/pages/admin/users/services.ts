import { createResourceHooks } from '../../../_api/crud';
import type { AdminUser } from '../types';
import type { CreateUserDto, UpdateUserDto } from '../../../_api/dto';

// Ключи кэша для TanStack Query (единое пространство ключей для Users)
export const userKeys = {
  all: ['admin', 'users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  byId: (id: string) => [...userKeys.all, 'byId', id] as const,
};

// Базовый путь ресурса Users в OpenAPI
export const BASE_PATH = '/api/users' as const;

// Единая обёртка для Users на базе общей фабрики CRUD-хуков
export const useAdminUsersApi = createResourceHooks<AdminUser, CreateUserDto, UpdateUserDto>({
  basePath: BASE_PATH,
  keys: userKeys,
});
