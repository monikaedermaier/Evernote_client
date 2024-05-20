import {Collection} from "./collection";
import {Image} from "./image";
import {Note} from "./note";
import {Todo} from "./todo";
import {Tag} from "./tag";
export {Collection} from "./collection";
export {Image} from "./image";
export {Note} from "./note";
export {Todo} from "./todo";
export {Tag} from "./tag";

export class User {
  constructor(
    public id:number,
    public firstName:string,
    public lastName:string,
    public email:string,
    public password:string,
    public collections?:Collection[],
    public images?:Image[],
    public notes?:Note[],
    public todos?:Todo[],
    public tags?:Tag[],
    public email_verified_at?:Date) {}
}
