import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Purchase } from '../../../models/purchase/purchase';
import { Supplier } from '../../../models/supplier/supplier';
import { NotifyService } from '../../../services/notification/notify.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { SupplierService } from '../../../services/supplier/supplier.service';

@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {

  suppliers: Supplier[] = [];
  purchase: Purchase = new Purchase();

  purchaseForm: FormGroup = new FormGroup({
    purchaseDate: new FormControl('', Validators.required),
    supplierId: new FormControl('', Validators.required),
    totalAmount: new FormControl('', Validators.required),

  })
  constructor(
    private supplierSvc:SupplierService,
    private purchaseSvc: PurchaseService,
    private notify: NotifyService,
    private datePipe:DatePipe
  ) { }
  get f() {
    return this.purchaseForm.controls;
  }
  insert() {
    if (this.purchaseForm.invalid) return;
    this.purchase.purchaseDate = this.f['purchaseDate'].value;
    this.purchase.purchaseDate = new Date(<string>this.datePipe.transform(this.purchase.purchaseDate, "yyyy-MM-dd"));
    this.purchase.supplierId = this.f['supplierId'].value;
    this.purchase.totalAmount = this.f['totalAmount'].value;

    this.purchaseSvc.insertPurchase(this.purchase)
      .subscribe(r => {
        this.notify.success("Data Inserted successfully!!", "DISMISS");
        this.purchaseForm.reset({});
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
      })
  }


}
