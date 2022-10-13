
export class PurchaseDetail {
  constructor(
    public id?: number,
    public productId?: number,
    public purchaseId?: number,
    public quantity?: number,
    public unitPrice?: number,
    public manufacturingDate?: Date,
    public expiredDate?: Date,
    public isExpirable?: boolean,
    public soldQuantity?: number,
    public profit?: number,
    public vat?: number,
    public discount?: number,

    public vatAmount?: number,
    public discountAmount?: number,
    public sellingPrice?: number
  ) { }
}
