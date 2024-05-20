import {Component, Input} from '@angular/core';
import {User} from "../shared/user";

@Component({
  selector: 'a.en-user-list-item',
  standalone: true,
  imports: [],
  templateUrl: './user-list-item.component.html',
  styles: ``
})
export class UserListItemComponent {
  @Input() user:User | undefined;
}
