import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GlobalErrorService } from "../core/services/global-error.service";

/**
 * GlobalErrorBannerComponent
 *
 * Displays a global error message banner at the top of the screen whenever an error
 * is emitted by the GlobalErrorService (typically triggered via HttpInterceptor).
 *
 * The banner appears only when an error is present, and can be dismissed manually by the user
 * or automatically via the service's timeout logic.
 *
 * Usage:
 * Place <app-global-error-banner> in your app.component.html or main layout.
 * Errors are displayed reactively based on the signal exposed by the GlobalErrorService.
 *
 * Example:
 *   <app-global-error-banner></app-global-error-banner>
 *
 * @author Gabriel Benniks
 * @since 2025-08-06
 */
@Component({
  selector: "app-global-error-banner",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="errorMessage()"
      class="bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-3 shadow-md text-sm flex justify-between items-center"
    >
      <span class="font-semibold">{{ errorMessage() }}</span>
      <button
        (click)="close()"
        class="ml-4 text-white font-bold hover:text-yellow-300 transition duration-200"
        aria-label="Close error banner"
        title="Close"
      >
        ✕
      </button>
    </div>
  `,
})
export class GlobalErrorBannerComponent {
  /** Reactive signal exposing the current error message, if any */
  public readonly errorMessage = this.errorService.errorMessage;

  /**
   * Constructor injecting the GlobalErrorService
   * @param errorService A singleton service managing global application errors
   */
  constructor(private errorService: GlobalErrorService) {}

  /**
   * Manually clears the current error message
   * This is typically triggered by the user clicking the close button (✕)
   */
  close(): void {
    this.errorService.clear();
  }
}
