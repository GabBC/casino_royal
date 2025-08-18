// src/app/core/services/user.service.ts
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiUrlService } from "./api-url.service";

export interface User {
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

@Injectable({ providedIn: "root" })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly api = inject(ApiUrlService);

  /** GET /api/profile */
  getProfile(): Observable<User> {
    return this.http.get<User>(this.api.users.profile());
  }

  /** PUT /api/profile  (ou adapte si ton backend attend /user/update) */
  updateProfile(payload: UpdateUserDto): Observable<User> {
    return this.http.put<User>(this.api.users.profile(), payload);
  }

  /** PUT /api/profile/password  (ou adapte pour /user/change-password si besoin) */
  changePassword(payload: ChangePasswordDto): Observable<void> {
    return this.http.put<void>(this.api.users.changePassword(), payload);
  }
}
