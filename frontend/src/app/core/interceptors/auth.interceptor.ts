import { HttpInterceptorFn } from "@angular/common/http";

/**
 * Attaches the JWT Bearer token to API requests.
 * - Works with both relative ('/api/...') and absolute ('http(s)://.../api/...') URLs.
 * - Skips '/api/auth/**' endpoints.
 * - Does not override an existing 'Authorization' header.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const url = req.url;
  const isAbsolute = url.startsWith("http://") || url.startsWith("https://");
  const path = isAbsolute ? safeGetPath(url) : url; // '/api/...' if targeting our backend
  const isApi = path.startsWith("/api");

  // Skip non-API calls and auth endpoints
  if (!isApi || path.startsWith("/api/auth/")) {
    return next(req);
  }

  // Do not override an existing Authorization header
  if (req.headers.has("Authorization")) {
    return next(req);
  }

  // Read token from both storages to support "remember me" flows
  const token =
    localStorage.getItem("token") ?? sessionStorage.getItem("token");
  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
    // withCredentials: true // <-- enable only if you rely on cookies; not needed for Bearer tokens
  });

  return next(authReq);
};

/** Safely extracts the pathname from an absolute URL. Falls back to the original string on failure. */
function safeGetPath(url: string): string {
  try {
    return new URL(url).pathname || url;
  } catch {
    return url;
  }
}
