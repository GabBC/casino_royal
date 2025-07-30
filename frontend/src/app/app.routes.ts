import { Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";
import { noAuthGuard } from "./core/guards/no-auth.guard";

// Define the app URLs
const APP_URLS = {
  HOME: "",
  LOGIN: "login",
  SIGNUP: "signup",
  PROFILE: "profile",
  GAMES: "games",
  ROULETTE: "games/roulette",
  BLACKJACK: "games/blackjack",
};

export const routes: Routes = [
  {
    path: APP_URLS.HOME,
    loadComponent: () =>
      import("./components/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: APP_URLS.LOGIN,
    canActivate: [noAuthGuard], // Prevent logged-in users from accessing login page
    loadComponent: () =>
      import("./components/login/login.component").then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: APP_URLS.SIGNUP,
    canActivate: [noAuthGuard], // Prevent logged-in users from accessing signup page
    loadComponent: () =>
      import("./components/signup/signup.component").then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: APP_URLS.PROFILE,
    canActivate: [authGuard],
    loadComponent: () =>
      import("./components/profile/profile.component").then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: APP_URLS.GAMES,
    loadComponent: () =>
      import("./components/games/games.component").then(
        (m) => m.GamesComponent
      ),
  },
  {
    path: APP_URLS.ROULETTE,
    canActivate: [authGuard],
    loadComponent: () =>
      import("./components/games/roulette/roulette.component").then(
        (m) => m.RouletteComponent
      ),
  },
  {
    path: APP_URLS.BLACKJACK,
    canActivate: [authGuard],
    loadComponent: () =>
      import("./components/games/blackjack/blackjack.component").then(
        (m) => m.BlackjackComponent
      ),
  },
];
