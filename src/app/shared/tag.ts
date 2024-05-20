import {Note} from "./note";
import {Todo} from "./todo";
import {User} from "./user";
export {Note} from "./note";
export {Todo} from "./todo";
export {User} from "./user";

export class Tag {
  constructor(
    public id:number,
    public title:string,
    public user_id:number,
    public user?:User,
    public notes?: Note[],
    public todos?: Todo[]) {}
}
