import { Injectable } from '@angular/core';
import { Createpurchase } from '../models/createpurchase';
import { PurchaseDetail } from '../models/purchase-detail/purchase-detail';


@Injectable({
  providedIn: 'root'
})
export class CreateService {
  formData?: Createpurchase;
  purchaseDetails: PurchaseDetail[];
  constructor() { }
}
