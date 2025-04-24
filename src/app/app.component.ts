import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
/* core */
import { NavigationService } from './core/services/navigation.service';
/* pages */
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { GamesComponent } from './components/games/games.component';
/* games */
import { RouletteComponent } from './components/games/roulette/roulette.component';
import { BlackjackComponent } from './components/games/blackjack/blackjack.component';
/*import { RouterModule } from '@angular/router';*/

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
  constructor(public navService: NavigationService) {}

  goTo(section: string) {
    this.navService.goTo(section);
  }
}
