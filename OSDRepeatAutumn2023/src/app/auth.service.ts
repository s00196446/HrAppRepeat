// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';
  private authStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated());
  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(this.getUserRoleSync());

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private toastr: ToastrService) { }

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { username, password });
  }

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.authStateSubject.next(true);
        this.userRoleSubject.next(this.getUserRoleSync());
        this.toastr.success('Sign in successful!');
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('access_token');
    this.authStateSubject.next(false);
    this.userRoleSubject.next(null);
    this.toastr.success('Sign out successful!');
  }

  getAuthState(): Observable<boolean> {
    return this.authStateSubject.asObservable();
  }

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserRoleSync(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded: any = this.jwtHelper.decodeToken(token);
      return decoded['role'];
    }
    return null;
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`, { headers: this.getHeaders() });
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/profile`, profile, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });
  }
}
