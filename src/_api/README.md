# New API Client (openapi-fetch)

This folder provides a new, incremental API client using `openapi-fetch` and the already generated schema in `src/api/types.ts`.

Contents:
- `api.ts`: configured client bound to our `paths` types.
- `useMiddleware.ts`: middleware adding Authorization, credentials, timeout, and refresh-on-401.
- `types.ts`: friendly type aliases mapped to our OpenAPI schema.
- `schema.ts`: re-exports the generated `paths/components/operations`.

Usage example:

```ts
import { apiClient } from "@/\_api/api";

const { data, error } = await apiClient.GET("/api/users");
if (error) {
  // handle error
}
console.log(data);
```

Base URL can be configured via `VITE_API_BASE_URL` (defaults to `http://localhost:6000`).

