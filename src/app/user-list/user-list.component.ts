import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UserListItemComponent} from "../user-list-item/user-list-item.component";
import {EvernoteService} from "../shared/evernote.service";
import {User} from "../shared/user";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";

@Component({
  selector: 'en-user-list',
  standalone: true,
  imports: [
    RouterLink,
    UserListItemComponent,
    NoteListItemComponent
  ],
  templateUrl: './user-list.component.html',
  styles: ``
})
export class UserListComponent implements OnInit{
  users: User[] = [];

  constructor(private en:EvernoteService) {
  }

  ngOnInit() {
    this.en.getAllUsers().subscribe(res => this.users = res);
  }
}
