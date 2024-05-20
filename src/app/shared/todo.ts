import {Tag} from "./tag";
import {Image} from "./image";
import {User} from "./user";
export {Tag} from "./tag";
export {User} from "./user";
export {Image} from "./image";

export class Todo {
  constructor(
    public id:number,
    public title:string,
    public dueDate:Date,
    public open:boolean,
    public users:User[],
    public tags:Tag[],
    public images?:Image[],
    public note_id?:number,
    public description?:string) {}
}
