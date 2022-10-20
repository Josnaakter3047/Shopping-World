import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/product/product';
import { PurchaseDetail } from '../../../models/purchase-detail/purchase-detail';
import { Purchase } from '../../../models/purchase/purchase';
import { Supplier } from '../../../models/supplier/supplier';
import { NotifyService } from '../../../services/notification/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { PurchaseDetailService } from '../../../services/purchase-detail/purchase-detail.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { SupplierService } from '../../../services/supplier/supplier.service';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {


  products: Product[] = [];
  
  suppliers: Supplier[] = [];
  purchase: Purchase = new Purchase();
  detail: PurchaseDetail = new PurchaseDetail();

  //purchaseDetails: PurchaseDetail[] = [
  //  {
  //    purchaseId:this.detail.id,
  //    productId:this.detail.productId,
  //    quantity:this.detail.quantity,
  //    unitPrice:this.detail.unitPrice,
  //    manufacturingDate: this.detail.manufacturingDate,
  //    vat: this.detail.vat,
  //    discount: this.detail.discount,
  //    soldQuantity: this.detail.soldQuantity,
  //    profit: this.detail.profit,
  //    isExpirable: this.detail.isExpirable,
  //    expiredDate:this.detail.expiredDate
  //  }
  //];


  purchaseForm: FormGroup = new FormGroup({
    purchaseDate: new FormControl('', Validators.required),
    supplierId: new FormControl('', Validators.required),
    totalAmount: new FormControl('', Validators.required),

    purchaseDetails:new FormControl( [
      {
        purchaseId: this.detail.id,
        productId: this.detail.productId,
        quantity: this.detail.quantity,
        unitPrice: this.detail.unitPrice,
        manufacturingDate: this.detail.manufacturingDate,
        vat: this.detail.vat,
        discount: this.detail.discount,
        soldQuantity: this.detail.soldQuantity,
        profit: this.detail.profit,
        isExpirable: this.detail.isExpirable,
        expiredDate: this.detail.expiredDate
      }
    ])
  })

  detailForm: FormGroup = new FormGroup({
    productId: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    unitPrice: new FormControl('', Validators.required),
    manufacturingDate: new FormControl('', Validators.required),
    isExpirable: new FormControl('', Validators.required),
    expiredDate: new FormControl('', Validators.required),
    soldQuantity: new FormControl({ value: "0", disabled: false }, Validators.required),
    profit: new FormControl({ value: "20", disabled: false }, Validators.required),
    vat: new FormControl({ value: "15", disabled: false }, Validators.required),
    discount: new FormControl({ value: "0", disabled: false }, Validators.required)
  })
  
  constructor(
    private supplierSvc: SupplierService,
    private proSvc: ProductService,
    private detailSvc:PurchaseDetailService,
    private purchaseSvc: PurchaseService,
    private notify: NotifyService,
    private datePipe:DatePipe
  ) { }
  get f() {
    return this.purchaseForm.controls;
    
  }
  get g() {
    return this.detailForm.controls;
  }
  insert() {
    if (this.purchaseForm.invalid) return;
    this.purchase.purchaseDate = this.f['purchaseDate'].value;
    this.purchase.purchaseDate = new Date(<string>this.datePipe.transform(this.purchase.purchaseDate, "yyyy-MM-dd"));
    this.purchase.supplierId = this.f['supplierId'].value;
    this.purchase.totalAmount = this.f['totalAmount'].value;
    this.purchase.purchaseDetails = this.f['purchaseDetails'].value;

    this.purchaseSvc.insertPurchase(this.purchase)
      .subscribe(r => {
        this.notify.success("Data Inserted successfully!!", "DISMISS");
        this.purchaseForm.reset({});
      }, err => {
        this.notify.fail("Fail to save data!!", "DISMISS");
      });
    ////for detail
    //if (this.detailForm.invalid) return;
    //this.detail.productId = this.g['productId'].value;
    //this.detail.quantity = this.g['quantity'].value;
    //this.detail.unitPrice = this.g['unitPrice'].value;

    //this.detail.manufacturingDate = this.g['manufacturingDate'].value;
    //this.detail.manufacturingDate = new Date(<string>this.datePipe.transform(this.detail.manufacturingDate, "yyyy-MM-dd"));

    //this.detail.isExpirable = this.g['isExpirable'].value;

    //this.detail.expiredDate = this.g['expiredDate'].value;
    //this.detail.expiredDate = new Date(<string>this.datePipe.transform(this.detail.expiredDate, "yyyy-MM-dd"));

    //this.detail.soldQuantity = this.g['soldQuantity'].value;
    //this.detail.vat = this.g['vat'].value;
    //this.detail.discount = this.g['discount'].value;
    //this.detail.profit = this.g['profit'].value;
  }

  getProductTitle(id: number) {
    let p = this.products.find(c => c.id == id);
    return p ? p.productTitle : '';
  } 
  saveDetail() {
  if (this.detailForm.invalid) return;
  this.detail.productId = this.g['productId'].value;
  this.detail.quantity = this.g['quantity'].value;
  this.detail.unitPrice = this.g['unitPrice'].value;

  this.detail.manufacturingDate = this.g['manufacturingDate'].value;
  this.detail.manufacturingDate = new Date(<string>this.datePipe.transform(this.detail.manufacturingDate, "yyyy-MM-dd"));

  this.detail.isExpirable = this.g['isExpirable'].value;

  this.detail.expiredDate = this.g['expiredDate'].value;
  this.detail.expiredDate = new Date(<string>this.datePipe.transform(this.detail.expiredDate, "yyyy-MM-dd"));

  this.detail.soldQuantity = this.g['soldQuantity'].value;
  this.detail.vat = this.g['vat'].value;
  this.detail.discount = this.g['discount'].value;
  this.detail.profit = this.g['profit'].value;

  this.detailSvc.insertPurchaseDetail(this.detail)
    .subscribe(r => {
      this.notify.success("Data Inserted successfully!!", "DISMISS");
      this.detailForm.reset({});
    }, err => {
      this.notify.fail("Fail to save data!!", "DISMISS");
    })
}

  ngOnInit(): void {

    this.supplierSvc.getSuppliers().
      subscribe(x => {
        this.suppliers = x;
      }, err => {
        this.notify.fail("Failed to load survice data", "DISMISS");
      });

    this.proSvc.getProducts()
      .subscribe(x => {
        this.products = x;
      }, err => {
        this.notify.fail("Failed to product data", "DISMISS");
      });

  
  }
}
