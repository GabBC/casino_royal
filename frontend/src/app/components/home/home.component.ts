/* importing necessary angular modules and core services */
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavigationService } from '../../core/services/navigation.service'

/**
 * HomeComponent
 *
 * Component responsible for displaying the homepage content
 *
 * @selector app-home
 * @standalone true
 * @imports CommonModule
 * @templateUrl ./home.component.html
 * @author Gabos
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  /* injecting the navigation service into the constructor */
  constructor(public navService: NavigationService) {}

}
