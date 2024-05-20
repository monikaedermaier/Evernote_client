import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Todo} from "../shared/note";
import {EvernoteService} from "../shared/evernote.service";
import {ToastrService} from "ngx-toastr";
import {TodoFactory} from "../shared/todo-factory";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-todo-detail',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './todo-detail.component.html',
  styles: ``
})
export class TodoDetailComponent implements OnInit{
  todo:Todo = TodoFactory.empty();

  constructor(
    private en:EvernoteService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService:AuthenticationService) {
  }

  ngOnInit(){
    const params = this.route.snapshot.params;
    this.en.getSingleTodo(params['id']).subscribe((t:Todo)=>this.todo=t);
  }

  deleteTodo() {
    if(confirm("ToDo wirklich löschen?")){
      this.en.deleteTodo(String(this.todo?.id)).subscribe(
        ()=> {
          this.router.navigate(['../'],
            {relativeTo: this.route}),
            this.toastr.success('Todo gelöscht!', "Evernote");
        }
      );
    }
  }
}
