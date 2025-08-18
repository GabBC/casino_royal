import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

/**
 * NoAuthGuard
 *
 * Blocks access to public auth pages (login/signup) when the user is already authenticated.
 * Redirects authenticated users to /games.
 */
export const noAuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return router.createUrlTree(["/games"]);
  }

  return true;
};
