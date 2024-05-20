import {publish} from "rxjs";

export class ErrorMessage{
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string){}
}

export const TodoFormErrorMessages =[
  new ErrorMessage('title','required','Ein Todo-Titel muss angegeben werden.'),
  new ErrorMessage('dueDate','required','Es muss ein Fälligkeitsdatum angegeben werden.'),
  new ErrorMessage('open','required','Geben Sie an, ob die Collection öffentlich sein soll oder nicht.'),
  new ErrorMessage('note_id', 'min', 'Eine Notiz muss ausgewählt werden')
]
