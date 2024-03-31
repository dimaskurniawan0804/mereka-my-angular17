import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  isOpenDetail: boolean;
  isLoadingTodo: boolean;
  showContent: string;
  constructor() {
    this.isOpenDetail = false;
    this.isLoadingTodo = true;
    this.showContent = 'list';
  }

  changeLoadStatus(event: any) {
    console.log(event);
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
}
