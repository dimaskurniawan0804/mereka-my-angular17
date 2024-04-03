import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignInService } from '../../../../services/auth-service/signIn.service';
@NgModule({
  declarations: [LoginComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  providers: [SignInService],
})
export class LoginModule {}
