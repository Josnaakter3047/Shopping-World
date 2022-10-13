export class Purchase {
  constructor(
    public id?: number,
    public purchaseDate?: Date,
    public supplierId?: number,
    public totalAmount?: number,

  ) { }
}
