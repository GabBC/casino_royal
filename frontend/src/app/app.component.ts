/* Importing modules */

// Angular modules
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { RouterModule } from "@angular/router";

// import { FontAwesomeModule } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

// Core services
//import { NavigationService } from "./core/services/navigation.service";
import { AuthService } from "./core/services/auth.service";
import { GlobalErrorBannerComponent } from "./components/global-error-banner.component";

/**
 * Main application component
 *
 * This component handles the layout, imports all major pages and games,
 * and provides basic navigation between sections using the NavigationService
 *
 * @author Gabos
 * @selector app-root
 * @standalone true
 * @imports CommonModule, HomeComponent, LoginComponent, SignupComponent, GamesComponent, RouletteComponent, BlackjackComponent
 * @templateUrl ./app.component.html
 */
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    GlobalErrorBannerComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  /**
   * Creates an instance of AppComponent
   *
   * @param navService {NavigationService} Service responsible for managing navigation across sections
   * @see NavigationService
   */
  constructor(
    //public navService: NavigationService,
    public authService: AuthService,
    private router: Router
  ) {}

  isLoggedIn: boolean = false;
  username: string | null = null;

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      // Récupère le nom d'utilisateur si connecté
      if (status) {
        const token = this.authService.getToken();
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          this.username = payload.sub || payload.username || "Profil";
        }
      } else {
        this.username = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/"]); // Redirige vers la page d'accueil après déconnexion
    this.isLoggedIn = false;
  }

  /**
   * Navigates to a specified section
   *
   * This method delegates navigation control to the NavigationService
   *
   * @param section {string} The name of the section to navigate to
   * @see NavigationService#goTo
   */
  goTo(section: string) {
    // Transforme la "section" en chemin URL
    // Par exemple, "home" => "/", sinon "/section"
    const route = section === "home" ? "/" : `/${section}`;
    this.router.navigate([route]);
  }
}
