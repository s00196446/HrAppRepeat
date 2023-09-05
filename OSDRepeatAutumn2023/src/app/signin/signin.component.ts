import { Component } from '@angular/core';
import { Auth, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  private auth : Auth

  constructor() {
    this.auth = getAuth();
   }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try{
      await signInWithPopup(this.auth, provider);
    }catch (error) {
      console.error('Error signing in with Google:', error);
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}
