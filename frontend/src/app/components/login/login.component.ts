import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AuthService } from "../../core/services/auth.service";
import { GlobalErrorService } from "../../core/services/global-error.service";

/**
 * LoginComponent
 *
 * Presents a login form (username/password) using Angular Reactive Forms.
 * Supports a "remember me" checkbox: stores the token in localStorage (remember)
 * or sessionStorage (non-remember).
 *
 * On successful login, it navigates to the `redirect` query param if present,
 * otherwise to `/games`.
 *
 * Error handling:
 * - Uses GlobalErrorService to display a global toast/banner for errors.
 * - Avoids console logging of sensitive data.
 */
@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  /** DI services */
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly errorBus = inject(GlobalErrorService);

  /** UI state */
  isLoading = false;

  /** Reactive form */
  form = this.fb.nonNullable.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    password: ["", [Validators.required]],
    rememberMe: [false],
  });

  ngOnInit(): void {
    // Safety: if already logged in, bounce to /games
    if (this.auth.isLoggedIn()) {
      this.router.navigateByUrl("/games");
    }
  }

  /** Shorthand for template access */
  get f() {
    return this.form.controls;
  }

  /**
   * Handles the login flow:
   * - Validates the form
   * - Calls AuthService.login with rememberMe
   * - Navigates to `redirect` (or /games) on success
   * - Pushes errors to GlobalErrorService on failure
   */
  onSubmit(): void {
    if (this.form.invalid || this.isLoading) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password, rememberMe } = this.form.getRawValue();
    const redirect =
      this.route.snapshot.queryParamMap.get("redirect") || "/games";

    this.isLoading = true;

    this.auth.login({ username, password }, !!rememberMe).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res?.success) {
          this.router.navigateByUrl(redirect);
        } else {
          this.errorBus.setError("Identifiants incorrects.");
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorBus.setError(
          "Connexion impossible. Vérifiez vos identifiants."
        );
      },
    });
  }
}
