import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { AuthService } from '../../../../services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class RegisterModule {}
