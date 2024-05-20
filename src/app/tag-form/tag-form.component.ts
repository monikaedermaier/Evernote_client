import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TagFactory} from "../shared/tag-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Note, Tag, Todo} from "../shared/tag";
import {TagFormErrorMessages} from "./tag-form-error-messages";

@Component({
  selector: 'en-tag-form',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './tag-form.component.html',
  styles: ``
})
export class TagFormComponent implements OnInit{
  tagForm : FormGroup;
  tag = TagFactory.empty();
  isUpdatingTag = false; //Info: sind wir im Update oder Neuanlege-Modus
  errors:{[key:string]:string} = {};
  notes: Note[] = [];
  todos: Todo[] = [];
  users: any;

  constructor(
    private fb: FormBuilder,
    private en : EvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tagForm = this.fb.group({});
  }

  //Entscheidung, ob wir im Update- oder Anlege-Modus sind
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){ // we're updating an existing tag
      this.isUpdatingTag = true;
      this.en.getSingleTag(id).subscribe(tag =>{
        this.tag = tag;
        this.initTag();
      });
    }
    this.en.getAllTodos().subscribe(todos =>{
      this.todos = todos;
      this.initTag();
    });
    this.en.getAllNotes().subscribe(notes =>{
      this.notes = notes;
      this.initTag();
    });
    this.en.getAllUsers().subscribe(users =>{
      this.users = users;
      this.initTag();
    });
    this.initTag();
  }

  initTag() {
    this.tagForm = this.fb.group({
      id: this.tag.id,
      title: [this.tag.title, Validators.required],
      notes: this.tag.notes,
      todos: this.tag.todos,
      user_id: [this.tag.user_id, Validators.min(1)]
    });
    this.tagForm.statusChanges.subscribe(() => this.updateErrorMessage());
  }


  submitForm() {
    const tag : Tag = TagFactory.fromObject(this.tagForm.value);
    if(this.isUpdatingTag){

      // n:m Beziehung
      tag.notes = [];
      if (Array.isArray(this.tagForm.value.notes)){
        for (const note_id of this.tagForm.value.notes) {
          for (let note of this.notes){
            if (note.id == note_id){
              tag.notes?.push(note_id);
            }
          }
        }
      }

      // n:m Beziehung
      tag.todos = [];
      if (Array.isArray(this.tagForm.value.todos)){
        for (const todo_id of this.tagForm.value.todos) {
          for (let todo of this.todos){
            if (todo.id == todo_id){
              tag.todos?.push(todo_id);
            }
          }
        }
      }
      this.en.updateTag(tag).subscribe(res => {
        this.router.navigate(['../../../tags',tag.id], {relativeTo:this.route});
      });
    } else {
      console.log(tag);
      this.en.createTag(tag).subscribe(res => {
        this.tag = TagFactory.empty();
        this.tagForm.reset(TagFactory.empty()); //Formular wieder mit leerem Tag initialisieren
        this.router.navigate(['../../tags'], {relativeTo:this.route});
      });
    }
  }


  private updateErrorMessage() {
    this.errors = {};
    for(const message of TagFormErrorMessages){
      const control = this.tagForm.get(message.forControl)
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}
