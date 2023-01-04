export class Createpurchase {
  id?: number;
  purchaseDate?: Date;
  supplierId: number;
  totalAmount: number;

  productId?: number;
  purchaseId?: number;
  quantity?: number;
  unitPrice?: number;
  manufacturingDate?: Date;
  expiredDate?: Date;
  isExpirable?: boolean;
  soldQuantity?: number;
  profit?: number;
  vat?: number;
  discount?: number;
}
