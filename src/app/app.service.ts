import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private todosRef = this.ngFDB.list('/todos');

  constructor(
    private ngFDB: AngularFireDatabase,
    private ngFMessaging: AngularFireMessaging
  ) { }

  public getTodoList(): Observable<any> {
    return this.todosRef.snapshotChanges();
  }

  public addNewTodo(data) {
    this.todosRef.push(data);
  }

  public removeTodo(key: string) {
    this.todosRef.remove(key);
  }

  public requestPermission(): Observable<void> {
    return this.ngFMessaging.requestPermission;
  }

  public getToken(): Observable<any> {
    return this.ngFMessaging.getToken;
  }
}
