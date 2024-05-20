import { Injectable } from '@angular/core';
import {Note} from "./note";
import {Todo} from "./todo";
import {Tag} from "./tag";
import {User} from "./user";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Collection} from "./collection";

@Injectable({
  providedIn: 'root'
})
export class EvernoteService {
  private api = 'http://kwm-evernote.s2110456008.student.kwmhgb.at/api'
  constructor(private http:HttpClient) {

  }
  // NOTES
  getAllNotes():Observable<Array<Note>>{
    return this.http.get<Array<Note>>(`${this.api}/notes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingleNote(id:string):Observable<Note>{
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteNote(id:string):Observable<any>{
    return this.http.delete(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createNote(note:Note):Observable<any>{
    console.log(note);
    return this.http.post(`${this.api}/notes`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateNote(note:Note):Observable<any>{
    return this.http.put(`${this.api}/notes/${note.id}`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  // TODOS
  getAllTodos():Observable<Array<Todo>>{
    return this.http.get<Array<Todo>>(`${this.api}/todos`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingleTodo(id:number):Observable<Todo>{
    return this.http.get<Todo>(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteTodo(id:string):Observable<any>{
    return this.http.delete(`${this.api}/todos/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createTodo(todo:Todo):Observable<any>{
    return this.http.post(`${this.api}/todos`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateTodo(todo:Todo):Observable<any>{
    return this.http.put(`${this.api}/todos/${todo.id}`, todo)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }



  // TAGS
  getAllTags():Observable<Array<Tag>>{
    return this.http.get<Array<Tag>>(`${this.api}/tags`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingleTag(id:number):Observable<Tag>{
    return this.http.get<Tag>(`${this.api}/tags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteTag(id:string):Observable<any>{
    return this.http.delete(`${this.api}/tags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearchTag(searchTerm:string):Observable<Array<Tag>>{
    return this.http.get<Array<Tag>>(`${this.api}/tags/search/${searchTerm}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createTag(tag:Tag):Observable<any>{
    return this.http.post(`${this.api}/tags`, tag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateTag(tag:Tag):Observable<any>{
    return this.http.put(`${this.api}/tags/${tag.id}`, tag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  // COLLECTIONS
  getAllCollections():Observable<Array<Collection>>{
    return this.http.get<Array<Collection>>(`${this.api}/collections`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingleCollection(id:number):Observable<Collection>{
    return this.http.get<Collection>(`${this.api}/collections/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteCollection(id:string):Observable<any>{
    return this.http.delete(`${this.api}/collections/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createCollection(collection:Collection):Observable<any>{
    console.log(collection);
    return this.http.post(`${this.api}/collections`, collection)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateCollection(collection:Collection):Observable<any>{
    console.log(collection);
    return this.http.put(`${this.api}/collections/${collection.id}`, collection)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  // USERS
  getAllUsers():Observable<Array<User>>{
    return this.http.get<Array<User>>(`${this.api}/users`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }
  getSingleUser(id:string):Observable<User>{
    return this.http.get<User>(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  deleteUser(id:string):Observable<any>{
    return this.http.delete(`${this.api}/users/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }


  // SONSTIGES
  private errorHandler(error:Error | any):Observable<any>{
    return throwError(error);
  }
}
