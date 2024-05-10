import { Component } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private authService: SocialAuthService) {}

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user: SocialUser) => {
        // Handle sign-in success
        console.log('User successfully signed in:', user);
      })
      .catch((error) => {
        // Handle sign-in error
        console.error('Error signing in with Google:', error);
      });
  }
}