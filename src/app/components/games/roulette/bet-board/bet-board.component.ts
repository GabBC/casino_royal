/* importing angular modules */
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

/**
 * BetBoardComponent
 *
 * Component responsible for displaying the roulette betting board logic
 *
 * @selector app-bet-board
 * @standalone true
 * @imports CommonModule, FormsModule
 * @templateUrl ./bet-board.component.html
 * @styleUrls ./bet-board.component.css
 * @author Gabos
 */
@Component({
  selector: 'app-bet-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bet-board.component.html',
  styleUrls: ['./bet-board.component.css'],
})
export class BetBoardComponent {

  /* utility function to floor a number */
  mathFloor(value: number): number {
    return Math.floor(value)
  }

  /* array of numbers from 0 to 36 */
  numbers = Array.from({ length: 37 }, (_, i) => i)

  /* visual order of numbers on the roulette */
  rouletteOrder: number[] = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ]

  /* returns color based on roulette rules */
  getColor(n: number): string {
    if (n === 0) return 'green'
    const reds = [
      1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
    ]
    return reds.includes(n) ? 'red' : 'black'
  }

  /* selected number to bet on */
  betNumber: number | null = null

  /* result of last spin */
  lastResult: number | null = null

  /* stores last 10 results */
  numbersHistory: number[] = []

  /* selected bet details */
  selectedBet: { type: string; value: any } | null = null

  /* returns parity for given number */
  getParity(n: number): 'even' | 'odd' {
    if (n === 0) return 'even' // adjust if needed
    return n % 2 === 0 ? 'even' : 'odd'
  }
}
