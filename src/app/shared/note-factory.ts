import {Note} from "./note";

export class NoteFactory {
  static empty():Note{
    return new Note(0, '', Number(''), Number(''),[], undefined,[{id:0, url:'', title:''}], [],'')
  }

  static fromObject(rawNote:any):Note {
    return new Note(
      rawNote.id, rawNote.title, rawNote.collection_id, rawNote.user_id, rawNote.tags, rawNote.user,
      rawNote.images, rawNote.todos, rawNote.description
    );
  }
}
