import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  TodoService,
  Todo,
} from '../../../../services/todo-service/todo.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  todos: Todo[];
  selectedTodo: Todo;

  @Output() emitLoadTodo = new EventEmitter<string>();
  @Output() emitSelectedTodo = new EventEmitter<Todo>();

  constructor(
    private todoService: TodoService,
    private cookieService: SsrCookieService,
    private snackbar: MatSnackBar
  ) {
    this.todos = [];
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

  ngOnInit(): void {
    this.getTodo();
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

  getTodo() {
    this.todoService
      .getTodos(this.cookieService.get('user_uid') ?? '')
      .subscribe((todos) => {
        this.todos = todos;
        this.emitLoadTodo.emit('false');
      });
  }

  createTodo() {
    const payload = {
      id: uuidv4(),
      title: 'New Todo',
      description: 'New Todo Description',
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

  deleteTodoById(id: string) {
    this.todoService.deleteTodo(id);
  }

  updateTodoStatus(status: boolean, id: string) {
    const payload = {
      id,
      is_done: status,
      updated_at: new Date(),
    };
    this.todoService.updateTodoStatus(payload);
  }

  selectTodoDetail(id: string) {
    const findTodo = this.todos.filter((el) => el.id === id);
    this.selectedTodo = findTodo[0];
    this.emitSelectedTodo.emit(findTodo[0]);
  }
}
