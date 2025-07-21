/* importing necessary angular modules and core services */
import { Component } from '@angular/core'

import { NavigationService } from '../../core/services/navigation.service'

/**
 * GamesComponent
 *
 * Component responsible for displaying the games page
 * Can show alerts and allows navigation to other sections
 *
 * @selector app-games
 * @standalone true
 * @imports CommonModule
 * @templateUrl ./games.component.html
 * @author Gabos
 */
@Component({
  selector: 'app-games',
  standalone: true,
  imports: [],
  templateUrl: './games.component.html',
})
export class GamesComponent {

  /* method to call the native alert function */
  showAlert(message: string): void {
    alert(message)
  }

  /* injecting the navigation service into the constructor */
  constructor(public navService: NavigationService) {}

}
