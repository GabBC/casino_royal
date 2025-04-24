import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly validSections = [
    'home',
    'signup',
    'login',
    'games',
    'roulette',
    'blackjack',
  ];

  section = signal<string>('home');
  isLogged = signal<boolean>(false);

  goTo(section: string) {
    if (!this.validSections.includes(section)) {
      section = 'home';
    }
    this.section.set(section);
  }
}
