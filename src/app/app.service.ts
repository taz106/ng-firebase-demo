import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private todosRef = this.ngFDB.list('/todos');

  constructor(
    private http: HttpClient,
    private ngFDB: AngularFireDatabase,
    private ngFMessaging: AngularFireMessaging
  ) { }

  public getTodoList(): Observable<any> {
    return this.todosRef.snapshotChanges();
  }

  public addNewTodo(data): any {
    return this.todosRef.push(data);
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

  public listenMessage(): Observable<any> {
    return this.ngFMessaging.messages;
  }

  public sendNotification(userToken: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `key=${env.fireBaseServerKey}`
      })
    };

    const body = {
      'to': userToken,
      'notification': {
        'title': 'ng-firebase-demo',
        'body': 'This message is for Brishti!'
      }
    };

    return this.http.post(
      'https://fcm.googleapis.com/fcm/send',
      body,
      httpOptions
    );
  }
}
