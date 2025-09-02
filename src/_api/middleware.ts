// Минимальный middleware без таймаутов (добавляет токен и базовые заголовки)
import type { Middleware } from 'openapi-fetch';
import { useAuthStore } from '../store/auth.store';

export const createMiddleware = (): Middleware => ({
  async onRequest({ request }) {
    const req = new Request(request);
    const { accessToken } = useAuthStore.getState();
    if (!req.headers.has('Content-Type')) {
      req.headers.set('Content-Type', 'application/json');
    }
    if (accessToken) {
      req.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return req;
  },
});

