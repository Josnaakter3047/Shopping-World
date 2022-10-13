import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../../models/customer/customer';
import { CustomerService } from '../../../services/customer/customer.service';
import { NotifyService } from '../../../services/notification/notify.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customer: Customer = new Customer();
  customerForm: FormGroup = new FormGroup({
    customerName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private customersvc: CustomerService,
    private notifysvc: NotifyService
  ) { }


  get f() {
    return this.customerForm.controls;
    }


  insert() {
    if (this.customerForm.invalid) return;
    this.customer.customerName = this.f['customerName'].value;
    this.customer.address = this.f['address'].value;
    this.customer.email = this.f['email'].value;
    this.customer.contactNo = this.f['contact'].value;
    this.customer.password = this.f['password'].value;

    this.customersvc.insertCustomer(this.customer)
      .subscribe(r => {
        this.notifysvc.success("Data Inserted successfully!!", "DISMISS");
        this.customerForm.reset({});
      }, err => {
        this.notifysvc.fail("Fail to save data!!", "DISMISS");
      })

  }
  ngOnInit(): void {
  }

}
