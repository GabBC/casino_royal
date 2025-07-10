/* importing angular modules */
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

/**
 * RouletteWheelComponent
 *
 * Component responsible for rendering and controlling the roulette wheel logic
 *
 * @selector app-roulette-wheel
 * @standalone true
 * @imports CommonModule, FormsModule
 * @templateUrl ./roulette-wheel.component.html
 * @styleUrls ./roulette-wheel.component.css
 * @author Gabos
 */
@Component({
  selector: "app-roulette-wheel",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./roulette-wheel.component.html",
  styleUrls: ["./roulette-wheel.component.css"],
})
export class RouletteWheelComponent {
  /* utility function to floor a number */
  mathFloor(value: number): number {
    return Math.floor(value);
  }

  /* array of numbers from 0 to 36 */
  numbers = Array.from({ length: 37 }, (_, i) => i);

  /* numbers in visual roulette wheel order */
  rouletteOrder: number[] = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];

  /* returns color based on roulette rules */
  getColor(n: number): string {
    if (n === 0) return "green";
    const reds = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ];
    return reds.includes(n) ? "red" : "black";
  }

  /* selected number to bet on */
  betNumber: number | null = null;

  /* result of the latest spin */
  lastResult: number | null = null;

  /* stores up to 10 recent results */
  numbersHistory: number[] = [];

  /* selected bet object containing type and value */
  selectedBet: { type: string; value: any } | null = null;

  /* simulates roulette spin, stores result and checks win condition */
  spinRoulette() {
    const result = Math.floor(Math.random() * 37);
    this.lastResult = result;
    this.numbersHistory.unshift(result);
    this.numbersHistory = this.numbersHistory.slice(0, 10);

    const isWin =
      (this.selectedBet?.type === "number" &&
        this.selectedBet.value === result) ||
      (this.selectedBet?.type === "color" &&
        this.getColor(result) === this.selectedBet.value) ||
      (this.selectedBet?.type === "parity" &&
        this.getParity(result) === this.selectedBet.value);

    alert(`Résultat : ${result} → ${isWin ? "🎉 Gagné !" : "💀 Perdu."}`);
  }

  /* returns parity of the number (even or odd) */
  getParity(n: number): "even" | "odd" {
    if (n === 0) return "even"; // adjust if 0 shouldn't count
    return n % 2 === 0 ? "even" : "odd";
  }
}
