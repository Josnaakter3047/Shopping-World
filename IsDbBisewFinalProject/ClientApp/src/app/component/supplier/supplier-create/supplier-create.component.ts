import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../../../models/supplier/supplier';
import { NotifyService } from '../../../services/notification/notify.service';
import { SupplierService } from '../../../services/supplier/supplier.service';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
export class SupplierCreateComponent implements OnInit {

  supplier: Supplier = new Supplier();
  supplierFrm: FormGroup = new FormGroup({
    supplierName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required)
  })

  constructor(
    private dataSvc: SupplierService,
    private notification: NotifyService
  ) { }

  get f() {
    return this.supplierFrm.controls;
  }

  insert() {

    if (this.supplierFrm.invalid) return;
    this.supplier.supplierName = this.f['supplierName'].value;
    this.supplier.address = this.f['address'].value;
    this.supplier.email = this.f['email'].value;
    this.supplier.contactNo = this.f['contactNo'].value;
    this.dataSvc.insertSupplier(this.supplier)
      .subscribe(r => {
        this.notification.success("Data insered successfully!! ", "DISMISS");
        this.supplierFrm.reset({});

      }, err => {
        this.notification.fail("Fail to save data!!", "DISMISS");
      }

      )

  }
  ngOnInit(): void {
  }

}
