import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TodoService } from '../../../../services/todo-service/todo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  formChangesSubs: Subscription;
  disableSubmit: boolean;
  todoForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private cookieService: SsrCookieService,
    private snackbar: MatSnackBar,
    private todoService: TodoService
  ) {
    this.disableSubmit = true;
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.formChangesSubs = this.todoForm.valueChanges.subscribe(() => {
      if (!this.todoForm.invalid) {
        this.disableSubmit = false;
      } else {
        this.disableSubmit = true;
      }
    });
  }

  ngOnInit(): void {}

  openSnackBar(message: string, action: string, duration: number = 2000) {
    return new Promise((resolve) => {
      const config = new MatSnackBarConfig();
      config.verticalPosition = 'top';
      config.duration = duration;
      let snackBar = this.snackbar.open(message, action, config);
      snackBar.afterDismissed().subscribe({
        next: () => resolve(''),
        complete: () => resolve(''),
      });
    });
  }

  createTodo(title: string, description: string) {
    const payload = {
      id: uuidv4(),
      title: title,
      description: description,
      is_done: false,
      created_at: new Date(),
      updated_at: new Date(),
      user_uid: this.cookieService.get('user_uid') ?? '',
    };

    this.todoService.addTodo(payload).then(() => {
      this.openSnackBar('Success create new todo', 'ok!', 2000).then(() => {
        // this.emitChangeTab();
        // this.isEdit = false;
      });
    });
  }

  submitForm(type: 'create' | 'update') {
    if (this.todoForm.invalid) {
      return;
    }
    if (type === 'create') {
      const titleControl = this.todoForm.get('title');
      const descriptionControl = this.todoForm.get('description');
      const title = titleControl ? titleControl.value : '';
      const description = descriptionControl ? descriptionControl.value : '';
      this.createTodo(title, description);
    }
  }
}
