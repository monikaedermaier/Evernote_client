import {publish} from "rxjs";

export class ErrorMessage{
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string){}
}

export const CollectionFormErrorMessages =[
  new ErrorMessage('name','required','Ein Name für die Collection muss angegeben werden.'),
  new ErrorMessage('dateOfCreation','required','Das Erstellungsdatum muss angegeben werden.'),
  new ErrorMessage('open','required','Geben Sie an, ob die Collection öffentlich sein soll oder nicht.')
]
