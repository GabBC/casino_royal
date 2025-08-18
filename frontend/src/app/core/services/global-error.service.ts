import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class GlobalErrorService {
  public readonly errorMessage = signal<string | null>(null);

  setError(message: string): void {
    this.errorMessage.set(message);
  }

  clear(): void {
    this.errorMessage.set(null);
  }
}
