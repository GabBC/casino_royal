import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './games.component.html',
})
export class GamesComponent {
  // Méthode ajoutée pour appeler la fonction native alert()
  showAlert(message: string): void {
    alert(message);
  }
  // Injecter le service dans le constructeur
  constructor(public navService: NavigationService) {}

}
