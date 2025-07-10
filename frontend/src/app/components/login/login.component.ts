/* Importing modules */

// Angular modules
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

// app services
import { NavigationService } from "../../core/services/navigation.service";
import { AuthService } from "../../core/services/auth.service";

/**
 * LoginComponent
 *
 * Component responsible for handling user login simulation
 * Displays a login form and shows success feedback after submission
 *
 * @selector app-login
 * @standalone true
 * @imports CommonModule
 * @templateUrl ./login.component.html
 * @author Gabos
 */
@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  username = "";
  password = "";

  /**
   * Boolean indicating if the login was successful
   *
   * @type {boolean}
   * @default false
   */
  loginSuccess = false;

  /**
   * Handles the login form submission
   *
   * Prevents default form behavior and sets loginSuccess to true
   *
   * @param event {Event} The form submit event
   */
  handleLogin(event: Event) {
    event.preventDefault();

    console.log("Username:", this.username);
    console.log("Password:", this.password);

    this.authService
      .login({
        username: this.username,
        password: this.password,
      })
      .subscribe({
        next: (res) => {
          console.log("Login successful!", res);
          this.loginSuccess = true;

          // Tu peux stocker le token ici
          localStorage.setItem("token", res.token);
        },
        error: (err) => {
          console.error("Erreur de connexion", err);
          this.loginSuccess = false;
        },
      });
  }

  /* injecting the navigation service into the constructor */
  constructor(
    public navService: NavigationService,
    private authService: AuthService
  ) {}
}
