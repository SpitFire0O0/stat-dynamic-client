import createClient from "openapi-fetch";
import type { paths } from "./schema";
import { useMiddleware } from "./useMiddleware";

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || "http://localhost:6000";

// Create OpenAPI client targeting our backend
export const apiClient = createClient<paths>({
  baseUrl: BASE_URL,
});

// Register middleware: auth header, cookies, timeout, refresh-on-401
const { createMiddleware } = useMiddleware({ baseUrl: BASE_URL });
apiClient.use(createMiddleware());

// Convenience helpers for common verbs
export const GET = apiClient.GET;
export const POST = apiClient.POST;
export const PATCH = apiClient.PATCH;
export const DELETE = apiClient.DELETE;

