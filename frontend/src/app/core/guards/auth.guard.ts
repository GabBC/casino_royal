import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

/**
 * AuthGuard
 *
 * Protects routes that require an authenticated user.
 * If not logged in, returns a UrlTree redirecting to the login page
 * and preserves the intended URL in a "redirect" query param.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Prefer using the service to decide login state (token presence)
  if (auth.isLoggedIn()) {
    return true;
  }

  // Redirect to /login, keeping the original URL to come back after login
  return router.createUrlTree(["/login"], {
    queryParams: { redirect: state.url },
  });
};
