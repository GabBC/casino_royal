import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './games.component.html',
})
export class GamesComponent {
  showAlert(message: string): void {
    alert(message);
  }
}
