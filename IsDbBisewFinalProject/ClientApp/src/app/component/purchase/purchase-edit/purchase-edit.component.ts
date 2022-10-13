import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Purchase } from '../../../models/purchase/purchase';
import { Supplier } from '../../../models/supplier/supplier';
import { NotifyService } from '../../../services/notification/notify.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { SupplierService } from '../../../services/supplier/supplier.service';

@Component({
  selector: 'app-purchase-edit',
  templateUrl: './purchase-edit.component.html',
  styleUrls: ['./purchase-edit.component.css']
})
export class PurchaseEditComponent implements OnInit {

  suppliers: Supplier[] = [];
  purchase: Purchase = new Purchase();

  purchaseForm: FormGroup = new FormGroup({
    purchaseDate: new FormControl('', Validators.required),
    supplierId: new FormControl('', Validators.required),
    totalAmount: new FormControl('', Validators.required),

  })
  constructor(
    private supplierSvc: SupplierService,
    private purchaseSvc: PurchaseService,
    private notify: NotifyService,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) { }
  get f() {
    return this.purchaseForm.controls;
  }
  update() {
    if (this.purchaseForm.invalid) return;
    this.purchase.purchaseDate = this.f['purchaseDate'].value;
    this.purchase.supplierId = this.f['supplierId'].value;
    this.purchase.purchaseDate = new Date(<string>this.datePipe.transform(this.purchase.purchaseDate, "yyyy-MM-dd"));
    this.purchase.totalAmount = this.f['totalAmount'].value;
    console.log(this.purchase);
    this.purchaseSvc.updatePurchase(this.purchase)
      .subscribe(r => {
        this.notify.success("Data Updated successfully!!", "DISMISS");
      }, err => {
        this.notify.fail("Fail to update data!!", "DISMISS");
      })
  }
  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.purchaseSvc.getPurchaseById(id)
      .subscribe(r => {
        this.purchase = r;
        this.purchaseForm.patchValue(this.purchase);
      }, err => {
        this.notify.fail("Fail to load product data!!", "DISMISS");
      });
    this.supplierSvc.getSuppliers().
      subscribe(x => {
        this.suppliers = x;
      }, err => {
        this.notify.fail("Failed to load survice data", "DISMISS");
      })
  }

}
