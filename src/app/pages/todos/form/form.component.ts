import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
  Todo,
  TodoService,
} from '../../../../services/todo-service/todo.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit, OnChanges {
  formChangesSubs: Subscription;
  disableSubmit: boolean;
  todoForm: UntypedFormGroup;

  @Input() selectedTodo: Todo;

  @Output() emitAfterSubmitForm = new EventEmitter<void>();

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

    this.selectedTodo = {
      id: '',
      title: '',
      description: '',
      is_done: false,
      created_at: new Date(),
      updated_at: new Date(),
      user_uid: '',
    };
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTodo']) {
      this.todoForm.patchValue({
        title: this.selectedTodo.title,
        description: this.selectedTodo.description,
      });
    }
  }

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

  createTodo() {
    const titleControl = this.todoForm.get('title');
    const descriptionControl = this.todoForm.get('description');
    const title = titleControl ? titleControl.value : '';
    const description = descriptionControl ? descriptionControl.value : '';
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
        this.todoForm.reset();
        this.emitAfterSubmitForm.emit();
      });
    });
  }

  updateTodo() {
    const titleControl = this.todoForm.get('title');
    const descriptionControl = this.todoForm.get('description');
    const title = titleControl ? titleControl.value : '';
    const description = descriptionControl ? descriptionControl.value : '';
    const payload = {
      id: this.selectedTodo.id,
      title: title,
      description: description,
      is_done: this.selectedTodo.is_done,
      created_at: this.selectedTodo.created_at,
      updated_at: new Date(),
      user_uid: this.selectedTodo.user_uid,
    };

    this.todoService.updateTodo(payload).then(() => {
      this.openSnackBar('Success update todo', 'ok!', 2000).then(() => {
        this.todoForm.reset();
        this.emitAfterSubmitForm.emit();
      });
    });
  }

  submitForm() {
    if (this.todoForm.invalid) {
      return;
    }
    if (this.selectedTodo.id === '') {
      this.createTodo();
    } else {
      this.updateTodo();
    }
  }
}
