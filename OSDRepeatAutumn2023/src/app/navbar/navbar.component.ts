import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getAuthState().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      this.isAdmin = this.authService.getUserRoleSync() === 'admin';
    });
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/signin']);
  }
}