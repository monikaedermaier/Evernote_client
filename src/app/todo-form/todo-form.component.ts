import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TodoFactory} from "../shared/todo-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoFormErrorMessages} from "./todo-form-error-messages";
import {Tag, Todo, User} from "../shared/todo";
import {Note} from "../shared/note";

@Component({
  selector: 'en-todo-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todo-form.component.html',
  styles: ``
})
export class TodoFormComponent implements OnInit{
  todoForm : FormGroup;
  todo = TodoFactory.empty();
  isUpdatingTodo = false;
  images: FormArray;
  errors:{[key:string]:string} = {};
  tags: Tag[] = [];
  users: User[] = [];
  notes: any;

  constructor(
    private fb: FormBuilder,
    private en : EvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.todoForm = this.fb.group({});
    this.images = this.fb.array([]);
  }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){ // we're updating an existing todo
      this.isUpdatingTodo = true;
      this.en.getSingleTodo(id).subscribe(todo =>{
        this.todo = todo;
        this.initTodo();
      });
    }
    this.en.getAllTags().subscribe(tags =>{
      this.tags = tags;
      this.initTodo();
    });
    this.en.getAllNotes().subscribe(notes =>{
      this.notes = notes;
      this.initTodo();
    });
    this.en.getAllUsers().subscribe(users =>{
      this.users = users;
      this.initTodo();
    });
    this.initTodo();
  }

  private initTodo() {
    this.buildThumbnailsArray();
    this.todoForm = this.fb.group({
      id:this.todo.id,
      title: [this.todo.title,Validators.required],
      description: this.todo.description,
      dueDate: [this.todo.dueDate, Validators.required],
      open: [this.todo.open, Validators.required],
      images: this.images,
      tags: this.todo.tags,
      users: this.todo.users,
      note_id: [this.todo.note_id, Validators.min(1)]
    });

    this.todoForm.statusChanges.subscribe(()=> this.updateErrorMessage());
  }

  private buildThumbnailsArray(){
    if(this.todo.images){
      this.images = this.fb.array([]);
      for (let img of this.todo.images){
        let fg = this.fb.group({
          id: this.fb.control(img.id),
          url:this.fb.control(img.url, Validators.required),
          title: this.fb.control(img.title, Validators.required)
        });
        this.images.push(fg);
      }
    }
  }


  addThumbnailControl() { // auf Button klicken - wird eine neue Zeile eingefügt
    this.images.push(this.fb.group({id:0, url:null, title:null}))
  }

  submitForm() {
    this.todoForm.value.images = this.todoForm.value.images.filter((thumbnail:{url:string}) => thumbnail.url);
    const todo : Todo = TodoFactory.fromObject(this.todoForm.value);
    if(this.isUpdatingTodo){

      // n:m Beziehung
      todo.tags = [];
      if (Array.isArray(this.todoForm.value.tags)){
        for (const tag_id of this.todoForm.value.tags) {
          for (let tag of this.tags){
            if (tag.id == tag_id){
              todo.tags?.push(tag_id);
            }
          }
        }
      }

      // n:m Beziehung
      todo.users = [];
      if (Array.isArray(this.todoForm.value.users)){
        for (const user_id of this.todoForm.value.users) {
          for (let user of this.users){
            if (user.id == user_id){
              todo.users?.push(user_id);
            }
          }
        }
      }

      this.en.updateTodo(todo).subscribe(res => {
        this.router.navigate(['../../../todos',todo.id], {relativeTo:this.route});
      });
    } else {
      this.en.createTodo(todo).subscribe(res => {
        this.todo = TodoFactory.empty();
        this.todoForm.reset(TodoFactory.empty()); //Formular wieder mit leerem Todo initialisieren
        this.router.navigate(['../../todos'], {relativeTo:this.route});
      });
    }
  }


  private updateErrorMessage() {
    this.errors = {};
    for(const message of TodoFormErrorMessages){
      const control = this.todoForm.get(message.forControl)
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}
