import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Note} from "../shared/note";
import {EvernoteService} from "../shared/evernote.service";
import {User} from "../shared/user";
import {UserFactory} from "../shared/user-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'en-user-detail',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-detail.component.html',
  styles: ``
})
export class UserDetailComponent implements OnInit{
  user:User = UserFactory.empty();

  constructor(
    private en:EvernoteService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService:AuthenticationService) {
  }

  ngOnInit(){
    const params = this.route.snapshot.params;
    this.en.getSingleUser(params['id']).subscribe((u:User)=>this.user=u);
  }

  deleteUser() {
    if(confirm("User wirklich löschen?")){
      this.en.deleteUser(String(this.user.id)).subscribe(
        ()=> {
          this.router.navigate(['../'],
            {relativeTo: this.route}),
            this.toastr.success('User gelöscht!', "Evernote");
        }
      );
    }
  }
}
