import { MatTableDataSource } from "@angular/material/table";
import { empty } from "rxjs";
import { PurchaseDetail } from "../purchase-detail/purchase-detail";


export class Purchase {

  constructor(
    // purchase
    public id?: number,
    public purchaseDate?: Date,
    public supplierId?: number,
    public purchaseId?:number,
    public totalAmount?: number,
    public purchaseDetails?: PurchaseDetail[] | MatTableDataSource<PurchaseDetail>
   
  ) { }
}
