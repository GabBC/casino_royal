import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { importProvidersFrom } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";

import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";

// Interceptors
import { authInterceptor } from "./app/core/interceptors/auth.interceptor";
import { httpErrorInterceptor } from "./app/core/interceptors/http-error.interceptor";

/**
 * Bootstrap the Angular application with:
 * - Router (standalone routes)
 * - HttpClient + global interceptors (auth first, error last)
 * - Animations (optional)
 */
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor, // add Authorization: Bearer <token>
        httpErrorInterceptor, // handle 401 & global error mapping
      ])
    ),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
