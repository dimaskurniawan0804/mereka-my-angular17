import { Component } from '@angular/core';
import { Todo } from '../../../services/todo-service/todo.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { NavigationService } from '../../../services/navigation-service/navigation.service';
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
  isEmptyList: boolean;

  constructor(
    private cookieService: SsrCookieService,
    private navigationService: NavigationService
  ) {
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
    this.isEmptyList = false;
  }

  changeLoadStatus(event: any) {
    if (event) {
      this.isLoadingTodo = false;
    }
  }

  changeShowContent(contentToShow: 'list' | 'form') {
    this.showContent = contentToShow;
  }

  logout() {
    this.cookieService.delete('user_uid');
    this.cookieService.delete('user_displayName');
    this.navigationService.navigateByUrlTree(['/login']);
  }

  receiveSelectedTodoFromList(todo: Todo) {
    this.selectedTodo = todo;
    // this.isOpenDetail = true;
    this.showContent = 'form';
  }
}
