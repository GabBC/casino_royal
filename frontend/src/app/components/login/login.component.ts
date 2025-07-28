/* Angular modules */
import { Component } from "@angular/core";

import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

/* App services */
import { NavigationService } from "../../core/services/navigation.service";
import { AuthService } from "../../core/services/auth.service";

/**
 * LoginComponent
 *
 * Component responsible for handling user login.
 * Displays a login form and processes authentication via AuthService.
 *
 * @selector app-login
 * @standalone true
 * @imports CommonModule, FormsModule
 * @templateUrl ./login.component.html
 * @author Gabos
 */
@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  /** User's username */
  username: string = "";

  /** User's password */
  password: string = "";

  /** Indicates if login was successful */
  loginSuccess: boolean = false;

  /** Holds an error message on login failure */
  loginError: string | null = null;

  /** FontAwesome icon for success */
  faCheck = faCircleCheck;
  /** FontAwesome icon for error */
  faError = faCircleExclamation;
  /** FontAwesome icon for back navigation */
  faBack = faArrowLeft;

  /**
   * Constructor injecting navigation and authentication services.
   *
   * @param navService NavigationService used for routing/navigation
   * @param authService AuthService used for login requests
   */
  constructor(
    public navService: NavigationService,
    private authService: AuthService
  ) {}

  /**
   * Handles the login form submission.
   * Calls the backend to authenticate the user and stores the JWT on success.
   *
   * @param event {Event} The form submit event
   */
  handleLogin(event: Event): void {
    event.preventDefault();

    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          if (!res.success) {
            this.loginError =
              res.message || "Erreur inconnue lors de la connexion";
            this.loginSuccess = false;
            return;
          }

          this.loginSuccess = true;
          this.loginError = null;

          // Store the JWT token in local storage
          if (res.token) {
            localStorage.setItem("token", res.token);
            this.navService.isLogged.set(true);
            this.navService.goTo("games");
          } else {
            this.loginError = "Token manquant dans la réponse";
            this.loginSuccess = false;
          }
        },
        error: (err) => {
          this.loginError = "Erreur de connexion au serveur";
          this.loginSuccess = false;
        },
      });
  }
}
