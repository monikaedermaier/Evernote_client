import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TagListItemComponent} from "../tag-list-item/tag-list-item.component";
import {Note, Tag, Todo} from "../shared/tag";
import {EvernoteService} from "../shared/evernote.service";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {SearchComponent} from "../search/search.component";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-tag-list',
  standalone: true,
  imports: [
    RouterLink,
    TagListItemComponent,
    TodoListItemComponent,
    SearchComponent,
  ],
  templateUrl: './tag-list.component.html',
  styles: ``
})
export class TagListComponent implements OnInit{
  tags: Tag[] = [];

  constructor(
    private en:EvernoteService,
    private router: Router,
    private route: ActivatedRoute,
    public authService:AuthenticationService) {
  }

  ngOnInit() {
    this.en.getAllTags().subscribe(res => this.tags = res);
  }

  tagSelected(tag: Tag) {
    this.router.navigate(['../tags', tag.id], {relativeTo: this.route});
  }
}
