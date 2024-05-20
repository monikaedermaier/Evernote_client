import {Component, Input} from '@angular/core';
import {Todo} from "../shared/todo";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'a.en-todo-list-item',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './todo-list-item.component.html',
  styles: ``
})
export class TodoListItemComponent {
  @Input() todo:Todo | undefined;
}
