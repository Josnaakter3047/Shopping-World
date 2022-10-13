import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Brand } from '../../../models/brand/brand';
import { BrandService } from '../../../services/brand/brand.service';
import { NotifyService } from '../../../services/notification/notify.service';

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.css']
})
export class BrandCreateComponent implements OnInit {

  brand: Brand = new Brand();
  brandForm: FormGroup = new FormGroup({
    brandName: new FormControl('', Validators.required),
  })

  constructor(
    private brandSvc: BrandService,
    private notifysvc: NotifyService
  ) { }
  get f() {
    return this.brandForm.controls;
  }

  insert() {
    if (this.brandForm.invalid) return;
    this.brand.brandName = this.f['brandName'].value;

    this.brandSvc.insertBrand(this.brand)
      .subscribe(r => {
        this.notifysvc.success("Data Inserted successfully!!", "DISMISS");
        this.brandForm.reset({});
      }, err => {
        this.notifysvc.fail("Fail to save data!!", "DISMISS");
      })

  }
  ngOnInit(): void {
  }

}
