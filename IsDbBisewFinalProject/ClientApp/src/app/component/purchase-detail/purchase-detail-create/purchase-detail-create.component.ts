import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/product/product';
import { PurchaseDetail } from '../../../models/purchase-detail/purchase-detail';
import { Purchase } from '../../../models/purchase/purchase';
import { NotifyService } from '../../../services/notification/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { PurchaseDetailService } from '../../../services/purchase-detail/purchase-detail.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';

@Component({
  selector: 'app-purchase-detail-create',
  templateUrl: './purchase-detail-create.component.html',
  styleUrls: ['./purchase-detail-create.component.css']
})
export class PurchaseDetailCreateComponent implements OnInit {

  products: Product[] = [];
  purchases: Purchase[] = [];
  purchaseDetail: PurchaseDetail = new PurchaseDetail();

  purchaseDetailForm: FormGroup = new FormGroup({
    productId: new FormControl('', Validators.required),
    purchaseId: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    unitPrice: new FormControl('', Validators.required),
    manufacturingDate: new FormControl('', Validators.required),

    isExpirable: new FormControl('', Validators.required),
    expiredDate: new FormControl('', Validators.required),

    soldQuantity: new FormControl({value:"0",disabled:false}, Validators.required),
    profit: new FormControl({ value: "20", disabled: false }, Validators.required),
    vat: new FormControl({ value: "15", disabled: false }, Validators.required),
    discount: new FormControl({ value: "0", disabled: false }, Validators.required)
  })

  constructor(
    private productSvc: ProductService,
    private purchaseSvc: PurchaseService,
    private purchaseDetalSvc:PurchaseDetailService,
    private notifysvc: NotifyService,
    private datePipe: DatePipe
  ) { }


  get f() {
    return this.purchaseDetailForm.controls;
  }

  insert() {

    if (this.purchaseDetailForm.invalid) return;
    this.purchaseDetail.productId = this.f['productId'].value;
    this.purchaseDetail.purchaseId = this.f['purchaseId'].value;
    this.purchaseDetail.quantity = this.f['quantity'].value;
    this.purchaseDetail.unitPrice = this.f['unitPrice'].value;
    this.purchaseDetail.manufacturingDate = this.f['manufacturingDate'].value;
    this.purchaseDetail.manufacturingDate = new Date(<string>this.datePipe.transform(this.purchaseDetail.manufacturingDate, "yyyy-MM-dd"));

    this.purchaseDetail.isExpirable = this.f['isExpirable'].value;
    this.purchaseDetail.expiredDate = this.f['expiredDate'].value;
    this.purchaseDetail.expiredDate = new Date(<string>this.datePipe.transform(this.purchaseDetail.expiredDate, "yyyy-MM-dd"));

    this.purchaseDetail.soldQuantity = this.f['soldQuantity'].value;
    this.purchaseDetail.vat = this.f['vat'].value;
    this.purchaseDetail.discount = this.f['discount'].value;
    this.purchaseDetail.profit = this.f['profit'].value;

    this.purchaseDetalSvc.insertPurchaseDetail(this.purchaseDetail)
      .subscribe(r => {
        this.notifysvc.success("Data Inserted successfully!!", "DISMISS");
        this.purchaseDetailForm.reset({});
      }, err => {
        this.notifysvc.fail("Fail to save data!!", "DISMISS");
      })

  }
  getProductTitle(id: number) {
    let p = this.products.find(c => c.id == id);
    return p ? p.productTitle : '';
  }
  getPurchaseId(id: number) {
    let p = this.purchases.find(c => c.id == id);
    return p ? p.id : '';
  }
  ngOnInit(): void {
    this.productSvc.getProducts().
      subscribe(x => {
        this.products = x;
      }, err => {
        this.notifysvc.fail("Failed to load product list", "DISMISS");
      })
    this.purchaseSvc.getPurchases().
      subscribe(x => {
        this.purchases = x;
      }, err => {
        this.notifysvc.fail("Failed to load purchase Id", "DISMISS");
      })
  }

}
