// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRole = next.data['role'];
    return this.authService.getAuthState().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          if (requiredRole) {
            return this.authService.getUserRoleSync() === requiredRole;
          }
          return true;
        } else {
          this.router.navigate(['/signin']);
          return false;
        }
      })
    );
  }
}
