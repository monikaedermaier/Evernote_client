import {Component, OnInit} from '@angular/core';
import {Todo} from "../shared/todo";
import {EvernoteService} from "../shared/evernote.service";
import {RouterLink} from "@angular/router";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-todo-list',
  standalone: true,
  imports: [
    TodoListItemComponent,
    RouterLink
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent implements OnInit{
  todos: Todo[] = [];

  constructor(
    private en:EvernoteService,
    public authService:AuthenticationService) {}

  ngOnInit() {
    this.en.getAllTodos().subscribe(res => this.todos = res);
  }
}
