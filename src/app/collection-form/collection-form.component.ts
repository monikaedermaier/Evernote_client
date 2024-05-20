import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CollectionFactory} from "../shared/collection-factory";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CollectionFormErrorMessages} from "./collection-form-error-messages";
import {Collection, Note, User} from "../shared/collection";
import {Tag, Todo} from "../shared/tag";

@Component({
  selector: 'en-collection-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './collection-form.component.html',
  styles: ``
})
export class CollectionFormComponent implements OnInit{
  collectionForm : FormGroup;
  collection = CollectionFactory.empty();
  isUpdatingCollection = false; //Info: sind wir im Update oder Neuanlege-Modus?
  users: User[] = [];
  notes: Note[] = [];
  errors:{[key:string]:string} = {};

  constructor(
    private fb: FormBuilder,
    private en : EvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.collectionForm = this.fb.group({});
  }


  //Entscheidung, ob wir im Update- oder Anlege-Modus sind
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){ // we're updating an existing collection
      this.isUpdatingCollection = true;
      this.en.getSingleCollection(id).subscribe(collection =>{
        this.collection = collection;
        this.initCollection();
      });
    }
    this.en.getAllUsers().subscribe(users =>{
      this.users = users;
      this.initCollection();
    });
    this.en.getAllNotes().subscribe(notes =>{
      this.notes = notes;
      this.initCollection();
    });
    this.initCollection();
  }

  // wenn Update Collection - Collection Infos ins Formular reinladen
  initCollection() {
    //this.buildThumbnailsArray();
    this.collectionForm = this.fb.group({
      id: this.collection.id,
      name: [this.collection.name, Validators.required],
      dateOfCreation: [this.collection.dateOfCreation, Validators.required],
      open: [this.collection.open, Validators.required],
      users: this.collection.users,
      notes: this.collection.notes
    });
    this.collectionForm.statusChanges.subscribe(() => this.updateErrorMessage());
  }


  submitForm() {
    const collection : Collection = CollectionFactory.fromObject(this.collectionForm.value);
    if(this.isUpdatingCollection){

      // n:m Beziehung
      collection.users = [];
      if (Array.isArray(this.collectionForm.value.users)){
        for (const user_id of this.collectionForm.value.users) {
          for (let user of this.users){
            if (user.id == user_id){
              console.log(user_id);
              collection.users?.push(user_id);
            }
          }
        }
      }

      // 1:* Beziehung
      collection.notes = [];
      if (Array.isArray(this.collectionForm.value.notes)){
        for (const note_id of this.collectionForm.value.notes) {
          for (let note of this.notes){
            if (note.id == note_id){
              console.log(note_id);
              collection.notes?.push(note);
            }
          }
        }
      }

      this.en.updateCollection(collection).subscribe(res => {
        this.router.navigate(['../../../collections',collection.id], {relativeTo:this.route});
      });
    } else {
        this.en.createCollection(collection).subscribe(res => {
          this.collection = CollectionFactory.empty();
          this.collectionForm.reset(CollectionFactory.empty()); //Formular wieder mit leerer Collection initialisieren
          this.router.navigate(['../../collections'], {relativeTo:this.route});
        });
    }
  }


  private updateErrorMessage() {
    this.errors = {};
    for(const message of CollectionFormErrorMessages){
      const control = this.collectionForm.get(message.forControl)
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] &&
        !this.errors[message.forControl]) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

}
