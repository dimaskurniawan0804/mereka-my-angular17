import { Component } from '@angular/core';
import { Todo } from '../../../services/todo-service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  isOpenDetail: boolean;
  isLoadingTodo: boolean;
  showContent: string;
  selectedTodo: Todo;

  constructor() {
    this.isOpenDetail = false;
    this.isLoadingTodo = true;
    this.showContent = 'list';
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

  changeLoadStatus(event: any) {
    if (event) {
      this.isLoadingTodo = false;
    }
  }

  changeShowContent(contentToShow: 'list' | 'form') {
    this.showContent = contentToShow;
  }

  openDetail(todoId: string, action: string) {
    //
  }

  logout() {
    //
  }

  receiveSelectedTodoFromList(todo: Todo) {
    this.selectedTodo = todo;
    // this.isOpenDetail = true;
    this.showContent = 'form';
  }
}
