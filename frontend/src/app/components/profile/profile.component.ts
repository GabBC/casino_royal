import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs";

import { ApiUrlService } from "../../core/services/api-url.service";

/** DTOs aligned with backend contract */
export interface UserDTO {
  id: number;
  username: string;
  email: string;
  roles?: string[];
}

export interface UpdateUserDto {
  username: string;
  email: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

/**
 * ProfileComponent
 *
 * Displays and edits the authenticated user's profile using Reactive Forms.
 * All API URLs are built via ApiUrlService to avoid string duplication.
 *
 * Implementation notes:
 * - Standalone component
 * - Uses HttpClient directly (no intermediate UserService)
 * - Assumes an auth interceptor injects the Bearer token on /api/** calls
 * - Provides simple inline messages (success/error)
 */
@Component({
  selector: "app-profile",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  /** Services */
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiUrlService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  /** Last loaded user (immutable reference for comparison) */
  originalUser: UserDTO | null = null;

  /** UI state flags */
  isLoadingProfile = false;
  isSavingProfile = false;
  isChangingPassword = false;
  editMode = false;

  /** Inline feedback (replace with your toast system if available) */
  successMsg = "";
  errorMsg = "";

  /** Reactive form for profile fields */
  profileForm = this.fb.nonNullable.group({
    username: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
  });

  /** Reactive form for password change */
  passwordForm = this.fb.nonNullable.group(
    {
      oldPassword: ["", [Validators.required]],
      newPassword: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]],
    },
    {
      validators: [this.matchFieldsValidator("newPassword", "confirmPassword")],
    }
  );

  ngOnInit(): void {
    this.loadUserProfile();
  }

  /**
   * Loads user profile from the backend and populates the forms.
   * GET /api/profile
   */
  private loadUserProfile(): void {
    this.clearMessages();
    this.isLoadingProfile = true;

    this.http
      .get<UserDTO>(this.api.users.profile())
      .pipe(take(1))
      .subscribe({
        next: (user) => {
          this.originalUser = user;
          this.profileForm.reset({
            username: user.username ?? "",
            email: user.email ?? "",
          });
          this.isLoadingProfile = false;
        },
        error: (err) => {
          this.isLoadingProfile = false;
          // If token invalid/expired, interceptor should redirect,
          // but provide a final fallback:
          if (err?.status === 401) {
            // optional: clear storage / navigate
            this.router.navigate(["/login"]);
          } else {
            this.errorMsg =
              "Impossible de charger le profil. Réessaie plus tard.";
          }
        },
      });
  }

  /** Enables edit mode for the profile form. */
  enableEdit(): void {
    this.clearMessages();
    this.editMode = true;
  }

  /** Cancels edit mode and restores the original values. */
  cancelEdit(): void {
    this.clearMessages();
    this.editMode = false;
    if (this.originalUser) {
      this.profileForm.reset({
        username: this.originalUser.username ?? "",
        email: this.originalUser.email ?? "",
      });
    }
  }

  /**
   * Submits profile updates to the backend.
   * PUT /api/profile
   */
  updateProfile(): void {
    if (!this.profileForm.valid || !this.originalUser) return;

    const payload: UpdateUserDto = {
      username: this.profileForm.value.username!,
      email: this.profileForm.value.email!,
    };

    // Prevent unnecessary request if unchanged
    if (
      payload.username === this.originalUser.username &&
      payload.email === this.originalUser.email
    ) {
      this.successMsg = "Aucune modification détectée.";
      this.editMode = false;
      return;
    }

    this.clearMessages();
    this.isSavingProfile = true;

    this.http
      .put<UserDTO>(this.api.users.profile(), payload)
      .pipe(take(1))
      .subscribe({
        next: (updated) => {
          this.originalUser = updated;
          this.profileForm.reset({
            username: updated.username ?? "",
            email: updated.email ?? "",
          });
          this.isSavingProfile = false;
          this.editMode = false;
          this.successMsg = "Profil mis à jour avec succès.";
        },
        error: () => {
          this.isSavingProfile = false;
          this.errorMsg = "Erreur lors de la mise à jour du profil.";
        },
      });
  }

  /**
   * Submits a password change request.
   * PUT /api/profile/password
   */
  changePassword(): void {
    if (!this.passwordForm.valid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const { oldPassword, newPassword } = this.passwordForm.getRawValue();
    const payload: ChangePasswordDto = { oldPassword, newPassword };

    this.clearMessages();
    this.isChangingPassword = true;

    this.http
      .put<void>(this.api.users.changePassword(), payload)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isChangingPassword = false;
          this.successMsg = "Mot de passe mis à jour avec succès.";
          this.passwordForm.reset({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        },
        error: () => {
          this.isChangingPassword = false;
          this.errorMsg = "Impossible de changer le mot de passe.";
        },
      });
  }

  /**
   * Custom validator: ensures two fields match (e.g., password confirmation).
   * @param fieldA The primary field name
   * @param fieldB The field that must match fieldA
   */
  private matchFieldsValidator(fieldA: string, fieldB: string): ValidatorFn {
    return (group): ValidationErrors | null => {
      const a = group.get(fieldA)?.value;
      const b = group.get(fieldB)?.value;
      return a && b && a !== b ? { fieldsMismatch: true } : null;
    };
  }

  /** Helpers for template validation display */
  get f() {
    return this.profileForm.controls;
  }
  get p() {
    return this.passwordForm.controls;
  }

  private clearMessages() {
    this.successMsg = "";
    this.errorMsg = "";
  }
}
