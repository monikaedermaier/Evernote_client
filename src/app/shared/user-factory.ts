import {User} from "./user";

export class UserFactory {
  static empty():User{
    return new User(0, '', '', '', '', [],
      [{id:0, url:'', title:''}], [], [], [], new Date())
  }

  static fromObject(rawUser:any):User {
    return new User(
      rawUser.id, rawUser.firstName, rawUser.lastName, rawUser.email, rawUser.password, rawUser.collections,
      rawUser.images, rawUser.notes, rawUser.todos, rawUser.tags,
      typeof(rawUser.email_verified_at) === 'string' ? new Date(rawUser.email_verified_at) : rawUser.email_verified_at
    );
  }
}
