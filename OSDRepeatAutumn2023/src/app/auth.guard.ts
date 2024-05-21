// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getAuthState().pipe(
      map((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['/signin']);
          return false;
        }
        return true;
      })
    );
  }
}
