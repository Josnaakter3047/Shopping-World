export class CartDetail {
  constructor(
    public id?: number,
    public cartId?: string,
    public productId?: string,
    public unitPrice?: number,
    public quantity?: number,
    public total?: number,
  ) { }
}
