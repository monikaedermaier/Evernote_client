import {publish} from "rxjs";

export class ErrorMessage{
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string){}
}

export const NoteFormErrorMessages =[
  new ErrorMessage('title','required','Ein Notiz-Titel muss angegeben werden'),
  new ErrorMessage('collection_id', 'min', 'Eine Collection muss ausgewählt werden'),
  new ErrorMessage('user_id', 'min', 'Ein Benutzer*in muss ausgewählt werden')
]
