import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../../../models/product/product';
import { PurchaseDetail } from '../../../models/purchase-detail/purchase-detail';
import { Purchase } from '../../../models/purchase/purchase';
import { NotifyService } from '../../../services/notification/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { PurchaseDetailService } from '../../../services/purchase-detail/purchase-detail.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateService } from '../../../services/create.service';

@Component({
  selector: 'app-purchase-detail-create',
  templateUrl: './purchase-detail-create.component.html',
  styleUrls: ['./purchase-detail-create.component.css']
})
export class PurchaseDetailCreateComponent implements OnInit {

  products: Product[] = [];
  purchases: Purchase[] = [];
 
  formData: PurchaseDetail;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    public dialogRef: MatDialogRef<PurchaseDetailCreateComponent>,
    private productSvc: ProductService,
    private notifysvc: NotifyService,
    private purDetailService: PurchaseDetailService
    
  ) { }
  
  getProductTitle(id: number) {
    let p = this.products.find(c => c.id == id);
    return p ? p.productTitle : '';
  }

  onSubmit(form:NgForm) {
    this.purDetailService.purchaseDetailItem.push(form.value);
    this.dialogRef.close();
  }

  ngOnInit(): void {

    this.formData = {
      productId: 0,
      purchaseId: this.data.id,
      quantity: 0,
      unitPrice: 0,
      manufacturingDate: new Date,
      expiredDate: new Date,
      isExpirable: false,
      soldQuantity: 0,
      profit: 20,
      vat: 15,
      discount:0
    }


    this.productSvc.getProducts().
      subscribe(x => {
        this.products = x;
      }, err => {
        this.notifysvc.fail("Failed to load product list", "DISMISS");
      })
  }

}
