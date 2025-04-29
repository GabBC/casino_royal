/* Importing necessary Angular modules and core services */
import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationService } from '../../core/services/navigation.service'

/**
 * SignupComponent
 *
 * Component responsible for handling user signup simulation
 * Displays a signup form and shows success feedback after submission
 *
 * @selector app-signup
 * @standalone true
 * @imports CommonModule
 * @templateUrl ./signup.component.html
 * @author Gabos
 */
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  
  /**
   * Boolean indicating if the signup was successful
   *
   * @type {boolean}
   * @default false
   */
  signupSuccess = false

  /**
   * Handles the signup form submission
   *
   * Prevents default form behavior and sets signupSuccess to true
   *
   * @param event {Event} The form submit event
   */
  handleSignup(event: Event) {
    event.preventDefault()
    this.signupSuccess = true
  }

  /**
   * Creates an instance of SignupComponent
   *
   * Injects the NavigationService for future use
   *
   * @param navService {NavigationService} Service responsible for managing navigation
   * @see NavigationService
   */
  constructor(public navService: NavigationService) {}
}
