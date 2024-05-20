import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {EvernoteService} from "../shared/evernote.service";
import {Tag} from "../shared/tag";

@Component({
  selector: 'en-home',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent implements OnInit{
  tags: Tag[] = [];


  constructor(private en:EvernoteService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.en.getAllTags().subscribe(res => this.tags = res);
  }

  tagSelected(tag: Tag) {
    this.router.navigate(['../tags', tag.id], {relativeTo: this.route});
  }
}
