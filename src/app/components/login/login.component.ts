import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginSuccess = false;
  handleLogin(event: Event) {
    event.preventDefault();
    this.loginSuccess = true;
  }

  // Injecter le service dans le constructeur
  constructor(public navService: NavigationService) {}

}
