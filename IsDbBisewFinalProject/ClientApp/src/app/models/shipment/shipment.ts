export class Shipment {
  constructor(
    public id?: number,
    public salesDetailsId?: number,
    public deliveryToAddress?: string,
    public fromAddress?: string,
    public trackingNo?: string,
    public deliveryDate?: Date,
    public contactNo?: string
  ) { }
}
