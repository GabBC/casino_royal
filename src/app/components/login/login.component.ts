/* importing necessary angular modules and core services */
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationService } from '../../core/services/navigation.service'

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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  /**
   * Boolean indicating if the login was successful
   *
   * @type {boolean}
   * @default false
   */
  loginSuccess = false

  /**
   * Handles the login form submission
   *
   * Prevents default form behavior and sets loginSuccess to true
   *
   * @param event {Event} The form submit event
   */
  handleLogin(event: Event) {
    event.preventDefault()
    this.loginSuccess = true
  }

  /* injecting the navigation service into the constructor */
  constructor(public navService: NavigationService) {}

}
