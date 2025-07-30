import { CanActivateFn } from '@angular/router';

/**
 * AuthGuard
 *
 * A simple guard function that checks if the user is logged in by verifying the presence of a token.
 * If the user is logged in, they are prevented from accessing the login page.
 *
 * @function authGuard
 * @returns {boolean} `true` if the user is not logged in (can access the login page), `false` otherwise.
 */
export const authGuard: CanActivateFn = () => {

  // Check if the user is logged in by checking the existence of the token in localStorage
  const token = localStorage.getItem('token');

  // If a token exists and the user in on the login page, redirect to the 'games' page (block access to login)
  if (token && (window.location.pathname === '/login' || window.location.pathname === '/signup')) {
    window.location.href = '/games';  // Simple redirect to the games page
    return false;
  }

  // If no token is found, the user can access the login page
  return true;
};
