// Angular components
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// app services
import { NavigationService } from '../../../core/services/navigation.service';
// app components
import { RouletteWheelComponent } from './roulette-wheel/roulette-wheel.component';
import { BetBoardComponent } from './bet-board/bet-board.component';

@Component({
  selector: 'app-roulette',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouletteWheelComponent,
    BetBoardComponent
  ],
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css'],
})
export class RouletteComponent {
  
  constructor(public navService: NavigationService) {}

  numbers = Array.from({ length: 37 }, (_, i) => i);

  rouletteOrder: number[] = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23,
    10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
  ];

  betNumber: number | null = null;
  lastResult: number | null = null;
  numbersHistory: number[] = [];
  selectedBet: { type: string; value: any } | null = null;

  mathFloor(value: number): number {
    return Math.floor(value);
  }

  getColor(n: number): string {
    if (n === 0) return 'green';
    const reds = [
      1, 3, 5, 7, 9, 12, 14, 16, 18,
      19, 21, 23, 25, 27, 30, 32, 34, 36
    ];
    return reds.includes(n) ? 'red' : 'black';
  }

  getDozenHighlight(dozen: number): string {
    return this.selectedBet?.type === 'dozen' &&
      this.selectedBet.value === dozen
      ? 'yellow'
      : '#444';
  }

  getParity(n: number): 'even' | 'odd' {
    if (n === 0) return 'even'; // à ajuster selon ton jeu
    return n % 2 === 0 ? 'even' : 'odd';
  }

  selectBet(type: string, value: any) {
    this.selectedBet = { type, value };
  }

  spinRoulette() {
    const result = Math.floor(Math.random() * 37);
    this.lastResult = result;
    this.numbersHistory.unshift(result);
    this.numbersHistory = this.numbersHistory.slice(0, 10);

    const isWin =
      (this.selectedBet?.type === 'number' &&
        this.selectedBet.value === result) ||
      (this.selectedBet?.type === 'color' &&
        this.getColor(result) === this.selectedBet.value) ||
      (this.selectedBet?.type === 'parity' &&
        this.getParity(result) === this.selectedBet.value);

    alert(`Résultat : ${result} → ${isWin ? '🎉 Gagné !' : '💀 Perdu.'}`);
  }
}
