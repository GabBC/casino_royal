/* importing necessary angular modules and core services */
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationService } from '../../../core/services/navigation.service'

/**
 * BlackjackComponent
 *
 * Component responsible for handling the blackjack game view
 *
 * @selector app-blackjack
 * @standalone true
 * @imports CommonModule
 * @templateUrl ./blackjack.component.html
 * @styleUrls ./blackjack.component.css
 * @author Gabos
 */
@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blackjack.component.html',
  styleUrls: ['./blackjack.component.css'],
})
export class BlackjackComponent {

  /* injecting the navigation service into the constructor */
  constructor(public navService: NavigationService) {}

}
