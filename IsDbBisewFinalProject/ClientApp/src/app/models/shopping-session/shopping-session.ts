export class ShoppingSession {
  constructor(
    public id?: number,
    public userId?: number,
    public total?: number,
    public createdDate?: Date,
    public modifiedDate?: Date,
    public deletedDate?: Date

  ) { }
}
