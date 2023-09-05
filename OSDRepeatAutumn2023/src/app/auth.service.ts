import { Injectable } from '@angular/core';
import { Auth, signOut } from 'firebase/auth';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
