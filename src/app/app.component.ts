import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteDetailsComponent} from "./note-details/note-details.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoDetailComponent} from "./todo-detail/todo-detail.component";
import {TagListComponent} from "./tag-list/tag-list.component";
import {TagDetailComponent} from "./tag-detail/tag-detail.component";
import {CollectionListComponent} from "./collection-list/collection-list.component";
import {CollectionDetailComponent} from "./collection-detail/collection-detail.component";
import {UserListComponent} from "./user-list/user-list.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {SearchComponent} from "./search/search.component";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'en-root',
  standalone: true,
    imports: [
        RouterOutlet,
        NoteListComponent,
        NoteDetailsComponent,
        TodoListComponent,
        TodoDetailComponent,
        TagListComponent,
        TagDetailComponent,
        CollectionListComponent,
        CollectionDetailComponent,
        UserListComponent,
        UserDetailComponent,
        RouterLinkActive,
        RouterLink,
        SearchComponent
    ],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    return this.isLoggedIn() ? "Logout" : "Login";
  }
}
