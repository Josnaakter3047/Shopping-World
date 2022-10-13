import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '../../../models/brand/brand';
import { BrandService } from '../../../services/brand/brand.service';
import { NotifyService } from '../../../services/notification/notify.service';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  brand: Brand = new Brand();
  brandForm: FormGroup = new FormGroup({
    brandName: new FormControl('', Validators.required),
  });
  constructor(
    private dataSvc: BrandService,
    private notification: NotifyService,
    private activateRoute: ActivatedRoute,
  ) { }

  get f() {
    return this.brandForm.controls;
  }

  update() {
    if (this.brandForm.invalid) return;
    this.brand.brandName = this.f['brandName'].value;
    console.log(this.brand);
    this.dataSvc.updateBrand(this.brand)
      .subscribe(r => {
        this.notification.success("Data update successfully!! ", "DISMISS");
        this.brandForm.reset({});

      }, err => {
        this.notification.fail("Fail to update data!!", "DISMISS");
      })

  }
  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.dataSvc.getBrandById(id)
      .subscribe(x => {
        this.brand = x;
        this.brandForm.patchValue(this.brand);
      }, err => {

        this.notification.fail("Failed to load brand data!!", "DISMISS");
      })
  }

}
