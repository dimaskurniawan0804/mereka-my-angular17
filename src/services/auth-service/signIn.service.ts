import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  isLoggedIn: boolean;
  constructor(public angularFireAuth: AngularFireAuth) {
    this.isLoggedIn = false;
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
