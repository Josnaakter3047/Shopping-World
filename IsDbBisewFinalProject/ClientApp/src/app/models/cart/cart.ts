export class Cart {
  constructor(
    public id?: number,
    public customerId?: string,
    public sessionId?: string,
    public cartDate?: Date
  ) { }
}
