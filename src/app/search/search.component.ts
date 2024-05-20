import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {Note, Tag, Todo} from "../shared/note";
import {EvernoteService} from "../shared/evernote.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'en-search',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit{
  keyup = new EventEmitter<string>();
  foundTags: Tag[] = [];
  isLoading = false;
  @Output() tagSelected = new EventEmitter<Tag>();

  constructor(private en:EvernoteService) {
  }

  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(()=> this.isLoading = true))
      .pipe(switchMap(searchTerm => this.en.getAllSearchTag(searchTerm)))
      .pipe(tap(()=> this.isLoading = false))
      .subscribe((tags) => {
        this.foundTags = tags;
        console.log(tags);
      });
  }

}
