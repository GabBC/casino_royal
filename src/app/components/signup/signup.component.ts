import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupSuccess = false;

  handleSignup(event: Event) {
    event.preventDefault();
    this.signupSuccess = true;
  }
  // Injecter le service dans le constructeur
  constructor(public navService: NavigationService) {}
}
