import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./components/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "login",
    loadComponent: () =>
      import("./components/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: "signup",
    loadComponent: () =>
      import("./components/signup/signup.component").then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: "profile/:username",
    loadComponent: () =>
      import("./components/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: "games",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./components/games/games.component").then(
        (m) => m.GamesComponent
      ),
  },
  // Routes enfants en dehors, pour ne pas afficher GamesComponent à la fois
  {
    path: "games/roulette",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./components/games/roulette/roulette.component").then(
        (m) => m.RouletteComponent
      ),
  },
  {
    path: "games/blackjack",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./components/games/blackjack/blackjack.component").then(
        (m) => m.BlackjackComponent
      ),
  },
];
