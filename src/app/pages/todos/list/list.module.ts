import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../../../environments/environment';
import { TodoService } from '../../../../services/todo-service/todo.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    MatButtonModule,
    MatIcon,
    MatTooltipModule,
  ],
  exports: [ListComponent],
  providers: [TodoService],
})
export class ListModule {}
