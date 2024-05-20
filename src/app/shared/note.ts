import {Tag} from "./tag";
import {User} from "./user";
import {Image} from "./image";
import {Todo} from "./todo";
export {Tag} from "./tag";
export {Todo} from "./todo";
export {Image} from "./image";
export {User} from "./user";

export class Note {
  constructor(
    public id:number,
    public title:string,
    public collection_id:number,
    public user_id:number,
    public tags:Tag[],
    public user?:User,
    public images?:Image[],
    public todos?:Todo[],
    public description?:string) {}
}
