import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Import the AuthService to check login status
import { Router } from '@angular/router';

/**
 * NoAuthGuard
 *
 * This guard prevents authenticated users from accessing login or signup routes.
 * It redirects logged-in users to the 'games' page if they try to access login/signup routes.
 * 
 * @function noAuthGuard
 * @returns {boolean} Returns `true` if the user is not logged in, otherwise redirects to 'games'.
 */
export const noAuthGuard: CanActivateFn = () => {
  // Use Angular's inject() to get instances of AuthService and Router
  const authService = inject(AuthService);  // Dynamically inject AuthService
  const router = inject(Router);  // Dynamically inject Router
  
  // Check if user is logged in
  const token = localStorage.getItem('token');
  
  if (token) {
    // If the user is logged in, redirect to 'games'
    router.navigate(['/games']);
    return false;  // Block access to the login/signup pages
  }
  
  return true;  // Allow access to the login/signup pages if the user is not logged in
};
