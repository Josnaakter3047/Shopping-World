import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../models/customer/customer';
import { CustomerService } from '../../../services/customer/customer.service';
import { NotifyService } from '../../../services/notification/notify.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer!: Customer;
  customerForm: FormGroup = new FormGroup({
    customerName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contactNo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(
    private customersvc: CustomerService,
    private notifysvc: NotifyService,
    private activateRoute: ActivatedRoute
  ) { }
   get f() {
      return this.customerForm.controls;
   }
  update() {
    if (this.customerForm.invalid) return;
    this.customer.customerName = this.f['customerName'].value;
    this.customer.address = this.f['address'].value;
    this.customer.email = this.f['email'].value;
    this.customer.contactNo = this.f['contactNo'].value;
    this.customer.password = this.f['password'].value;
    this.customersvc.updateCustomer(this.customer)
      .subscribe(r => {
        this.notifysvc.success("Data Updated successfully!!", "DISMISS");
        this.customerForm.reset({});
      }, err => {
        this.notifysvc.fail("Fail to Update data!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.customersvc.getCustomerById(id)
      .subscribe(x => {
        this.customer = x;
        this.customerForm.patchValue(this.customer);
      }, err => {
        this.notifysvc.fail("Fail to load customer data!!", "DISMISS");
      })
  }

}
