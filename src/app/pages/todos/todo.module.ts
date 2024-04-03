import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TodoRoutingModule } from './todo-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TodoComponent } from './todo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ListModule } from './list/list.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormModule } from './form/form.module';
import { NavigationService } from '../../../services/navigation-service/navigation.service';
@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    ListModule,
    MatProgressSpinnerModule,
    FormModule,
  ],
  providers: [NavigationService],
})
export class TodoModule {}
