import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const userAuthGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('user-token');
  if (!token) return false;

  try {
    const tokenParts = token.split('.');
    const userData = tokenParts[1];
    const user = JSON.parse(window.atob(userData));

    const userIdFromToken = user.id;
    const userIdFromParams = Number(route.params['id']);

    if (userIdFromToken !== userIdFromParams) {
      alert("You don't have access to this page! ");
      router.navigateByUrl('/');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Invalid token', error);
    return false;
  }
};
