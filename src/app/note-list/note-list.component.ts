import {Component, OnInit} from '@angular/core';
import {Note} from "../shared/note";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-note-list',
  standalone: true,
  imports: [
    NoteListItemComponent,
    RouterLink,
  ],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit{
  notes: Note[] = [];

  constructor(
    private en:EvernoteService,
    public authService:AuthenticationService) {}

  ngOnInit() {
    this.en.getAllNotes().subscribe(res => this.notes = res);
  }

}
