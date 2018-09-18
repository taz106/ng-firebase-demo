import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AppService } from './app.service';
import { mergeMap, mergeMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  welcomeTitle = 'Angular Firebase Todo';
  public todos: Array<object> = null;
  public title = '';
  public userToken: string;

  constructor(
    private service: AppService,
    private ngFireDB: AngularFireDatabase,
    private ngFMessaging: AngularFireMessaging
  ) { }

  ngOnInit() {
    this.service.getTodoList()
      .subscribe(todos => {
        this.todos = todos.map(todo => ({
          key: todo.key,
          value: todo.payload.val()
        }));
      });

    this.service.requestPermission()
      .pipe(
        mergeMapTo(this.service.getToken())
      )
      .subscribe(
        token => {
          this.userToken = token;
          console.log(this.userToken);
        },
        error => console.log(error)
      );

    // this.ngFMessaging.messages
    //   .subscribe(
    //     message => console.log(message)
    //   );
  }

  onTodoEnter(todoTitle: string) {
    const payload = {
      title: todoTitle,
      isCompleted: false
    };
    this.service.addNewTodo(payload)
      .then(
        res => {
          console.log(res);
          this.service.sendNotification(this.userToken)
            .subscribe(
              resIn => console.log(resIn)
            );
        }
      );
  }

  removeTodo(key: string) {
    this.service.removeTodo(key);
  }
}
