import {Todo} from "./note";

export class TodoFactory {
  static empty():Todo{
    return new Todo(0, '', new Date(), false, [], [], [{id:0, url:'', title:''}], Number(''), '')
  }

  static fromObject(rawTodo:any):Todo {
    return new Todo(
      rawTodo.id, rawTodo.title, typeof(rawTodo.dueDate) === 'string' ? new Date(rawTodo.dueDate) : rawTodo.dueDate,
      rawTodo.open, rawTodo.users, rawTodo.tags, rawTodo.images, rawTodo.note_id, rawTodo.description
    );
  }
}
