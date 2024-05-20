import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
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
import {NoteFormComponent} from "./note-form/note-form.component";
import {CollectionFormComponent} from "./collection-form/collection-form.component";
import {FormWrapperComponent} from "./form-wrapper/form-wrapper.component";
import {TagFormComponent} from "./tag-form/tag-form.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {LoginComponent} from "./login/login.component";
import {canNavigateToAdminGuard} from "./can-navigate-to-admin.guard";

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'}, // pathMatch-full: Pfad muss genau übereinstimmen
  {path:'home', component: HomeComponent},

  {path:'notes', component: NoteListComponent},
  {path:'notes/:id', component: NoteDetailsComponent},

  {path:'todos', component: TodoListComponent},
  {path:'todos/:id', component: TodoDetailComponent},

  {path:'tags', component: TagListComponent},
  {path:'tags/:id', component: TagDetailComponent},

  {path:'collections', component: CollectionListComponent},
  {path:'collections/:id', component: CollectionDetailComponent},

  {path:'users', component: UserListComponent},
  {path:'users/:id', component: UserDetailComponent},

  {path:'admin', component:FormWrapperComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/collection-form', component:CollectionFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/collection-form/:id', component:CollectionFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/note-form', component:NoteFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/note-form/:id', component:NoteFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/tag-form', component:TagFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/tag-form/:id', component:TagFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/todo-form', component:TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'admin/todo-form/:id', component:TodoFormComponent, canActivate:[canNavigateToAdminGuard]},

  {path:'login', component:LoginComponent}
];
