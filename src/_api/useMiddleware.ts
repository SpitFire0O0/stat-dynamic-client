// @ts-nocheck
import type { Middleware } from "openapi-fetch";
import { makeErrorResponse } from "./errorResponse";
import { useAuthStore } from "../store/auth.store";

export const REQUEST_TIMEOUT = 10000; // 10s

type Options = {
  baseUrl?: string; // used for refresh call
  refreshPath?: string; // default: /api/auth/refresh
};

export const useMiddleware = (opts: Options = {}) => {
  const baseUrl = opts.baseUrl ?? "";
  const refreshPath = opts.refreshPath ?? "/api/auth/refresh";

  const timeoutMap = new Map<string, { timeoutId: NodeJS.Timeout; controller: AbortController }>();

  const key = (req: Request) => `${req.method}:${req.url}`;

  const addAuthAndCredentials = (req: Request) => {
    const headers = new Headers(req.headers);
    const { accessToken } = useAuthStore.getState();
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

    return new Request(req, {
      headers,
      // include cookies for refresh-based auth
      credentials: "include",
    });
  };

  const withTimeout = (req: Request) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    const wrapped = new Request(req, { signal: controller.signal });
    timeoutMap.set(key(req), { timeoutId, controller });
    return wrapped;
  };

  const clearTimeoutFor = (req: Request) => {
    const item = timeoutMap.get(key(req));
    if (item) {
      clearTimeout(item.timeoutId);
      timeoutMap.delete(key(req));
    }
  };

  // Try refresh once and retry the original request with a new token
  const tryRefreshAndRetry = async (request: Request): Promise<Response> => {
    try {
      const refreshRes = await fetch(`${baseUrl}${refreshPath}`, {
        method: "POST",
        credentials: "include",
      });
      if (!refreshRes.ok) return makeErrorResponse("Unauthorized", 401);

      const { accessToken } = (await refreshRes.json()) as { accessToken: string };
      const { refreshToken } = useAuthStore.getState();
      useAuthStore.getState().setTokens(accessToken, refreshToken || "");

      const headers = new Headers(request.headers);
      headers.set("Authorization", `Bearer ${accessToken}`);

      return fetch(request, { headers, credentials: "include" as RequestCredentials });
    } catch (e) {
      useAuthStore.getState().logout();
      return makeErrorResponse(e, 401);
    }
  };

  const createMiddleware = (): Middleware => ({
    async onRequest({ request }) {
      // order: add auth/cookies -> apply timeout
      const withAuth = addAuthAndCredentials(request);
      return withTimeout(withAuth);
    },

    async onResponse({ request, response }) {
      clearTimeoutFor(request);
      if (response.status === 401) {
        // attempt refresh + single retry
        return tryRefreshAndRetry(request);
      }
      return response;
    },

    async onError({ error, request }) {
      clearTimeoutFor(request);
      return makeErrorResponse(error, 599);
    },
  });

  return { createMiddleware };
};

