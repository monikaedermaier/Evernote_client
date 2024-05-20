import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CollectionListItemComponent} from "../collection-list-item/collection-list-item.component";
import {EvernoteService} from "../shared/evernote.service";
import {Collection} from "../shared/collection";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {CollectionFactory} from "../shared/collection-factory";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-collection-list',
  standalone: true,
  imports: [
    RouterLink,
    CollectionListItemComponent,
    NoteListItemComponent
  ],
  templateUrl: './collection-list.component.html',
  styles: ``
})
export class CollectionListComponent implements OnInit{
  collections: Collection[] = [];

  constructor(
    private en:EvernoteService,
    public authService:AuthenticationService) {}

  ngOnInit() {
    this.en.getAllCollections().subscribe(res => this.collections = res);
  }
}
