import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../core/services/navigation.service';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css'],
})
export class BlackjackComponent {
  // Injecter le service dans le constructeur
  constructor(public navService: NavigationService) {}
}
