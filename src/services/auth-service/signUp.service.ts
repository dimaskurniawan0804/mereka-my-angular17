import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(public angularFireAuth: AngularFireAuth) {}

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
}
