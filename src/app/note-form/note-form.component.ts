import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Note, Tag, Todo} from "../shared/note";
import {NoteFactory} from "../shared/note-factory";
import {NoteFormErrorMessages} from "./note-form-error-messages";

@Component({
  selector: 'en-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit {
  noteForm : FormGroup;
  note = NoteFactory.empty();
  isUpdatingNote = false; //Info: sind wir im Update oder Neuanlege-Modus
  images: FormArray;
  errors:{[key:string]:string} = {};
  tags: Tag[] = [];
  todos: Todo[] = [];
  collections: any;
  users: any;


  constructor(
    private fb: FormBuilder,
    private en : EvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noteForm = this.fb.group({});
    this.images = this.fb.array([]);
  }


  //Entscheidung, ob wir im Update- oder Anlege-Modus sind
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){ // we're updating an existing note
      this.isUpdatingNote = true;
      this.en.getSingleNote(id).subscribe(note =>{
        this.note = note;
        this.initNote();
      });
    }
    this.en.getAllTags().subscribe(tags =>{
      this.tags = tags;
      this.initNote();
    });
    this.en.getAllCollections().subscribe(collections =>{
      this.collections = collections;
      this.initNote();
    });
    this.en.getAllUsers().subscribe(users =>{
      this.users = users;
      this.initNote();
    });
    this.en.getAllTodos().subscribe(todos =>{
      this.todos = todos;
      this.initNote();
      console.log(todos);
    });
    this.initNote();
  }


  initNote() {
    this.buildThumbnailsArray();
    this.noteForm = this.fb.group({
      id: this.note.id,
      title: [this.note.title, Validators.required],
      description: this.note.description,
      images: this.images,
      tags: this.note.tags,
      todos: this.note.todos,
      collection_id: [this.note.collection_id, Validators.min(1)],
      user_id: [this.note.user_id, Validators.min(1)]
    });
    this.noteForm.statusChanges.subscribe(() => this.updateErrorMessage());
  }

  private buildThumbnailsArray(){
    if(this.note.images){
      this.images = this.fb.array([]);
      for (let img of this.note.images){
        let fg = this.fb.group({
          id: this.fb.control(img.id),
          url:this.fb.control(img.url),
          title: this.fb.control(img.title)
        });
        this.images.push(fg);
      }
    }
  }

  addThumbnailControl() { // auf Button klicken - wird eine neue Zeile eingefügt
    this.images.push(this.fb.group({id:0, url:null, title:null}))
  }

  submitForm() {
    this.noteForm.value.images = this.noteForm.value.images.filter((thumbnail:{url:string}) => thumbnail.url);
    const note : Note = NoteFactory.fromObject(this.noteForm.value);
    if(this.isUpdatingNote){

      // n:m Beziehung
      note.tags = [];
      if (Array.isArray(this.noteForm.value.tags)){
        for (const tag_id of this.noteForm.value.tags) {
          for (let tag of this.tags){
            if (tag.id == tag_id){
              note.tags?.push(tag_id);
            }
          }
        }
      }

      // 0,1:* Beziehung
      note.todos = [];
      if (Array.isArray(this.noteForm.value.todos)){
        for (const todo_id of this.noteForm.value.todos) {
          for (let todo of this.todos){
            if (todo.id == todo_id){
              note.todos?.push(todo);
            }
          }
        }
      }

      this.en.updateNote(note).subscribe(res => {
        this.router.navigate(['../../../notes',note.id], {relativeTo:this.route});
      });
    } else {
      this.en.createNote(note).subscribe(res => {
        this.note = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty()); //Formular wieder mit leerer Notiz initialisieren
        this.router.navigate(['../../notes'], {relativeTo:this.route});
      });
    }
  }


  private updateErrorMessage() {
    this.errors = {};
    for(const message of NoteFormErrorMessages){
      const control = this.noteForm.get(message.forControl)
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}


