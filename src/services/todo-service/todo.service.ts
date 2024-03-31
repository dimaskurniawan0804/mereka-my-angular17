import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Todo {
  id: string;
  title: string;
  description: string;
  is_done: boolean;
  created_at: any;
  updated_at: any;
  user_uid: string;
}

interface UpdateStatus {
  id: string;
  is_done: boolean;
  updated_at: any;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosCollection: AngularFirestoreCollection<Todo>;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.todosCollection = afs.collection<Todo>('todos');
  }

  getTodos(userUid: string): Observable<Todo[]> {
    return this.afs
      .collection<Todo>('todos', (ref) => ref.where('user_uid', '==', userUid))
      .valueChanges();
  }

  addTodo(todo: Todo): Promise<any> {
    return this.todosCollection.doc(todo.id).set(todo);
  }

  updateTodo(todo: Todo): Promise<void> {
    return this.todosCollection.doc(todo.id).update(todo);
  }

  updateTodoStatus(payload: UpdateStatus) {
    return this.todosCollection
      .doc(payload.id)
      .update({ is_done: payload.is_done, updated_at: payload.updated_at });
  }

  deleteTodo(id: string): Promise<void> {
    return this.todosCollection.doc(id).delete();
  }

  fetchRandomQuote() {
    const headers = new HttpHeaders({
      'X-Api-Key': environment.keyApiNinja,
    });
    return this.http
      .get('https://api.api-ninjas.com/v1/quotes', { headers })
      .pipe(
        catchError((error) => {
          throw error;
        })
      );
  }
}
