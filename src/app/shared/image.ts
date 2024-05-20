export class Image {
  constructor(
    public id:number,
    public url:string,
    public title:string,
    public node_id?:number,
    public todo_id?:number,
    public user_id?:number) {}
}
