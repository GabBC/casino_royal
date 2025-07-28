import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/auth/login";
  private tokenKey = "token";

  /** Subject to track the login status across the app */
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Sends login request and stores token on success.
   *
   * @param credentials Login form data
   * @returns Observable with login response
   */
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((res) => {
        if (res.success && res.token) {
          localStorage.setItem(this.tokenKey, res.token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  /**
   * Logs out the user by clearing token and login state.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
  }

  /**
   * Retrieves the current JWT token from storage.
   *
   * @returns JWT token string or null
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Checks if a JWT token is currently stored.
   *
   * @returns true if token exists
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
