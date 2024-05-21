import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  register(): void {
    this.authService.register(this.username, this.password).subscribe(
      response => {
        this.toastr.success('User registered successfully');
        this.router.navigate(['/signin']);
      },
      error => {
        console.error('Registration failed', error);
        this.toastr.error('Failed to register user');
      }
    );
  }
}
