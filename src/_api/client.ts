// Минимальный клиент на базе openapi-fetch, завязанный на сгенерированную OpenAPI-схему
import createClient from 'openapi-fetch';
import type { paths } from './schema';
import { createMiddleware } from './middleware';

// Базовый URL берём из ENV с запасным значением
export const apiBaseUrl =
  (import.meta as any)?.env?.VITE_API_BASE_URL ?? 'http://localhost:6000/api';

export const apiClient = createClient<paths>({ baseUrl: apiBaseUrl });

// Подключаем минимальный middleware (заголовки/авторизация)
apiClient.use(createMiddleware());

// Полезные заметки по использованию:
// apiClient
//   .path('/api/users')
//   .method('get')
//   .create()();
