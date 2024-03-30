import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean;
  constructor(public angularFireAuth: AngularFireAuth) {
    this.isLoggedIn = false;
  }

  signUp(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      catchError((error) => {
        window.alert(error.message);
        throw error;
      })
    );
  }

  signIn(email: string, password: string): Observable<any> {
    return from(
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  updateIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn = isLoggedIn;
  }
}
