// src/app/core/services/auth.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ApiUrlService } from "../../core/services/api-url.service";

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe?: boolean;
}
export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly tokenKey = "token";
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  readonly isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private api: ApiUrlService) {}

  login(
    credentials: { username: string; password: string },
    rememberMe = false
  ): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.api.auth.login(), credentials)
      .pipe(
        tap((res) => {
          if (res?.success && res?.token) {
            this.storeToken(res.token, rememberMe);
            this.isLoggedInSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
  }

  getToken(): string | null {
    return (
      localStorage.getItem(this.tokenKey) ??
      sessionStorage.getItem(this.tokenKey)
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private storeToken(token: string, remember: boolean): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    (remember ? localStorage : sessionStorage).setItem(this.tokenKey, token);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }
}
