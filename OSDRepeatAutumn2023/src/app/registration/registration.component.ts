import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private auth: AngularFireAuth) {}

signUpWithGoogle(): void {
  this.auth
    .signInWithPopup(new GoogleAuthProvider())
    .then((result) => {
      console.log('Signed up successfully!', result);
    })
    .catch((error) => {
      console.error('Error signing up:', error);
    });
  }
}
