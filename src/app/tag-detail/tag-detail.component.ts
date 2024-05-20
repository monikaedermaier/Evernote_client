import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Tag} from "../shared/tag";
import {EvernoteService} from "../shared/evernote.service";
import {ToastrService} from "ngx-toastr";
import {TagFactory} from "../shared/tag-factory";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-tag-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './tag-detail.component.html',
  styles: ``
})
export class TagDetailComponent implements OnInit{
  tag:Tag = TagFactory.empty();

  constructor(
    private en:EvernoteService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService:AuthenticationService) {
  }

  ngOnInit(){
    const params = this.route.snapshot.params;
    this.en.getSingleTag(params['id']).subscribe((ta:Tag)=>this.tag=ta);
  }

  deleteTag() {
    if(confirm("Tag wirklich löschen?")){
      this.en.deleteTag(String(this.tag.id)).subscribe(
        ()=> {
          this.router.navigate(['../'],
            {relativeTo: this.route}),
            this.toastr.success('Tag gelöscht!', "Evernote");
        }
      );
    }
  }
}
