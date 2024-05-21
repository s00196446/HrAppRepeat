import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  signIn(): void {
    this.authService.signIn(this.username, this.password).subscribe(
      () => this.router.navigate(['/']),
      error => console.error('Login failed', error)
    );
  }
}