import {Component, Input} from '@angular/core';
import {Collection} from "../shared/collection";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'a.en-collection-list-item',
  standalone: true,
    imports: [
        DatePipe
    ],
  templateUrl: './collection-list-item.component.html',
  styles: ``
})
export class CollectionListItemComponent {
  @Input() collection:Collection | undefined;
}
