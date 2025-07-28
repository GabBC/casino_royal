import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * ProfileComponent
 *
 * Displays the profile page of a user
 *
 * @selector app-profile
 * @standalone true
 * @templateUrl ./profile.component.html
 * @author Gabos
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  /** Username extracted from the route */
  username: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.username = params['username'] || 'Utilisateur';
    });
  }
}
