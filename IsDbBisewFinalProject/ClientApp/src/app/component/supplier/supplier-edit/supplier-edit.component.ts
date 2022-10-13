import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from '../../../models/supplier/supplier';
import { NotifyService } from '../../../services/notification/notify.service';
import { SupplierService } from '../../../services/supplier/supplier.service';

@Component({
  selector: 'app-supplier-edit',
  templateUrl: './supplier-edit.component.html',
  styleUrls: ['./supplier-edit.component.css']
})
export class SupplierEditComponent implements OnInit {

  supplier: Supplier = new Supplier();
  supplierFrm: FormGroup = new FormGroup({
    supplierName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required),
  });

  constructor(
    private dataSvc: SupplierService,
    private notification: NotifyService,
    private activateRoute: ActivatedRoute
  ) { }
  get f() {
    return this.supplierFrm.controls;
  }
  Update() {


    if (this.supplierFrm.invalid) return;
    this.supplier.supplierName = this.f['supplierName'].value;
    this.supplier.address = this.f['address'].value;
    this.supplier.email = this.f['email'].value;
    this.supplier.contactNo = this.f['contactNo'].value;
    console.log(this.supplier);
    this.dataSvc.updateSupplier(this.supplier)
      .subscribe(r => {
        this.notification.success("Data update successfully!! ", "DISMISS");
        this.supplierFrm.reset({});

      }, err => {
        this.notification.fail("Fail to update data!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.dataSvc.getSupplierById(id)
      .subscribe(x => {
        this.supplier = x;
        this.supplierFrm.patchValue(this.supplier);
      }, err => {

        this.notification.fail("Failed to load supplier data!!", "DISMISS");
      })
  }

}
