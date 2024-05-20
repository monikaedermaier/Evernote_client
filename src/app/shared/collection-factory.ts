import {Collection, Note} from "./collection";

export class CollectionFactory {
  static empty():Collection{
    return new Collection(0, '', new Date(), false, [], [])
  }

  static fromObject(rawCollection:any):Collection {
    return new Collection(
      rawCollection.id, rawCollection.name,
      typeof(rawCollection.dateOfCreation) === 'string' ? new Date(rawCollection.dateOfCreation) : rawCollection.dateOfCreation,
      rawCollection.open, rawCollection.users, rawCollection.notes
    );
  }
}
