import {publish} from "rxjs";

export class ErrorMessage{
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string){}
}

export const TagFormErrorMessages =[
  new ErrorMessage('title','required','Ein Tag-Titel muss angegeben werden'),
  new ErrorMessage('user_id', 'min', 'Ein Benutzer muss ausgewählt werden')
]
