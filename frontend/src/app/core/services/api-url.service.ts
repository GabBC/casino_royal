// src/app/core/services/api-url.service.ts
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({ providedIn: "root" })
export class ApiUrlService {
  private readonly base = trimTrailingSlash(environment.apiUrl);

  url(path: string): string {
    const clean = path.startsWith("/") ? path.slice(1) : path;
    return `${this.base}/${clean}`; // ex: http://127.0.0.1:8080/api/profile
  }

  auth = {
    login: () => this.url("auth/login"),
    register: () => this.url("auth/register"),
  };

  users = {
    profile: () => this.url("profile"), // GET / PUT
    changePassword: () => this.url("profile/password"), // PUT
  };
}

function trimTrailingSlash(s: string) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}
