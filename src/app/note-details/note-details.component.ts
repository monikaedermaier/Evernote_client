import {Component, OnInit} from '@angular/core';
import {Note} from "../shared/note";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteFactory} from "../shared/note-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-note-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './note-details.component.html',
  styles: ``
})
export class NoteDetailsComponent implements OnInit{
   note:Note = NoteFactory.empty();

   constructor(
     private en:EvernoteService,
     private route:ActivatedRoute,
     private router:Router,
     private toastr:ToastrService,
     public authService:AuthenticationService) {
   }

   ngOnInit(){
     const params = this.route.snapshot.params;
     this.en.getSingleNote(params['id']).subscribe((n:Note)=>this.note=n);
   }

  deleteNote() {
    if(confirm("Notiz wirklich löschen?")){
      this.en.deleteNote(String(this.note.id)).subscribe(
        ()=> {
          this.router.navigate(['../'],
            {relativeTo: this.route}),
            this.toastr.success('Notiz gelöscht!', "Evernote");
        }
      );
    }
  }
}
