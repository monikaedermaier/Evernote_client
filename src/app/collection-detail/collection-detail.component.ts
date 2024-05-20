import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {EvernoteService} from "../shared/evernote.service";
import {Collection} from "../shared/collection";
import {CollectionFactory} from "../shared/collection-factory";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-collection-detail',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './collection-detail.component.html',
  styles: ``
})
export class CollectionDetailComponent implements OnInit{
  collection:Collection = CollectionFactory.empty();

  constructor(
    private en:EvernoteService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService:AuthenticationService) {}

  ngOnInit(){
    const params = this.route.snapshot.params;
    this.en.getSingleCollection(params['id']).subscribe((c:Collection)=>this.collection=c);
  }

  deleteCollection() {
    if(confirm("Collection wirklich löschen?")){
      this.en.deleteCollection(String(this.collection.id)).subscribe(
        ()=> {
          this.router.navigate(['../'],
            {relativeTo: this.route}),
            this.toastr.success('Collection gelöscht!', "Evernote");
        }
      );
    }
  }
}
