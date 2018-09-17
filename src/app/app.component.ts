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

  constructor(
    private service: AppService,
    private ngFireDB: AngularFireDatabase,
  ) {}

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
        token => console.log('Permission granted', token),
        error => console.log(error)
      );
  }

  onTodoEnter(todoTitle: string) {
    const payload = {
      title: todoTitle,
      isCompleted: false
    };
    this.service.addNewTodo(payload);
  }

  removeTodo(key: string) {
    this.service.removeTodo(key);
  }
}
