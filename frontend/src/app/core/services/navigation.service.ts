/* importing modules */
import { Injectable, signal } from '@angular/core';

/**
 * Service responsible for handling application navigation
 *
 * Provides navigation logic between the different sections of the application
 * and manages authentication state
 *
 * @service NavigationService
 * @providedIn root
 * @author Gabos
 */
@Injectable({ providedIn: 'root' })
export class NavigationService {
  
  /**
   * List of valid sections that the user can navigate to
   */
  private readonly validSections = [
    'home',
    'signup',
    'login',
    'games',
    'roulette',
    'blackjack',
  ]

  /**
   * Signal representing the current active section
   *
   * @type {Signal<string>}
   * @default 'home'
   */
  section = signal<string>('home')

  /**
   * Signal representing the user's authentication state
   *
   * @type {Signal<boolean>}
   * @default false
   */
  isLogged = signal<boolean>(false)

  /**
   * Navigates to the specified section
   *
   * If the section name is invalid, navigates back to 'home' by default
   *
   * @param section {string} The name of the section to navigate to
   * @see NavigationService#validSections
   */
  goTo(section: string) {
    if (!this.validSections.includes(section)) {
      section = 'home'
    }
    this.section.set(section)
  }
}
