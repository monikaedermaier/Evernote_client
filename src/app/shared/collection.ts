import {User} from "./user";
import {Note} from "./note";
export {User} from "./user";
export {Note} from "./note";

export class Collection {
  constructor(
    public id:number,
    public name:string,
    public dateOfCreation:Date,
    public open:boolean,
    public users:User[],
    public notes?:Note[]) {}
}
