import { ProductImage } from "../product-image/product-image";
import { PurchaseDetail } from "../purchase-detail/purchase-detail";

export class Home {
  constructor(
    public id?: number,
    public category?: string,
    public subCategory?: string,
    public brand?: string,
    public productTitle?: string,
    public description?: string,
    public imagePath?: string,

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
    public sellPrice?: number,

    public purchaseDetails?: PurchaseDetail[],
    public productImages?: ProductImage[]

  ) { }
}
