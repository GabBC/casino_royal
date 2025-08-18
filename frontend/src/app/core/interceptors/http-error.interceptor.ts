import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import { GlobalErrorService } from "../services/global-error.service";

/**
 * httpErrorInterceptor
 *
 * A global HTTP interceptor that catches all failed HTTP requests and handles error responses.
 * It routes unauthorized users to the login page, and broadcasts error messages to the
 * GlobalErrorService for UI display (e.g. via GlobalErrorBannerComponent).
 *
 * This function ensures consistent error handling across the application without having to
 * duplicate logic in each component or service.
 *
 * Behavior:
 * - For 401 (unauthorized), the user is redirected to the login page.
 * - For other errors, a meaningful message is extracted and displayed globally.
 *
 * @returns An HttpInterceptorFn compatible with Angular's standalone API.
 *
 * @author Gabriel Benniks
 * @since 2025-08-06
 */
export const httpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const errorService = inject(GlobalErrorService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log("Intercepted HTTP error:", error);

      if (error.status === 401) {
        // Redirect unauthorized users to the login page
        router.navigate(["/login"]);
      } else {
        // Extract message from backend error (supports string, object, etc.)
        let message = "An unexpected error occurred. Please try again.";

        if (typeof error.error === "string") {
          message = error.error;
        } else if (
          typeof error.error === "object" &&
          typeof error.error?.message === "string"
        ) {
          message = error.error.message;
        }

        errorService.setError(message);
      }

      return throwError(() => error);
    })
  );
};
