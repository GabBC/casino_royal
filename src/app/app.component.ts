/* Importing modules */

// Angular core modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router'; // Could be used for routing

// Core services
import { NavigationService } from './core/services/navigation.service';

// Pages components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { GamesComponent } from './components/games/games.component';

// Games components
import { RouletteComponent } from './components/games/roulette/roulette.component';
import { BlackjackComponent } from './components/games/blackjack/blackjack.component';

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
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    GamesComponent,
    RouletteComponent,
    BlackjackComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  /**
   * Creates an instance of AppComponent
   *
   * @param navService {NavigationService} Service responsible for managing navigation across sections
   * @see NavigationService
   */
  constructor(public navService: NavigationService) {}

  /**
   * Navigates to a specified section
   *
   * This method delegates navigation control to the NavigationService
   *
   * @param section {string} The name of the section to navigate to
   * @see NavigationService#goTo
   */
  goTo(section: string) {
    this.navService.goTo(section);
  }
}
