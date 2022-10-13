import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductImage } from '../../../models/product-image/product-image';
import { Product } from '../../../models/product/product';
import { NotifyService } from '../../../services/notification/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductImageService } from '../../../services/productimage/product-image.service';

@Component({
  selector: 'app-product-image-create',
  templateUrl: './product-image-create.component.html',
  styleUrls: ['./product-image-create.component.css']
})
export class ProductImageCreateComponent implements OnInit {

  products: Product[]=[];
  productImage: ProductImage = new ProductImage();
  picFile!: File;

 
  productImageForm: FormGroup = new FormGroup({
    productId: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required),
    thumbnailImage: new FormControl(false),
    detialImage: new FormControl(false)
    
  });

  constructor(
    private productImageService: ProductImageService,
    private productSvc: ProductService,
    private notifySvc: NotifyService
  ) { }

  get productImageControl() {
    return this.productImageForm.controls;
  }
  insert() {
    if (this.productImageForm.invalid) return;
    Object.assign(this.productImage, this.productImageForm.value);
    this.productImage.imagePath = "no-picture.png";

    this.productImageService.insertProductImage(this.productImage).
      subscribe(r => {
        console.log(r)
        this.upload(Number(r.id))
      }, err => {
        this.notifySvc.fail("Fail to Save Product Image", "Dismiss");
      });
  }
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.productImageService.uploadImage(id, this.picFile)
        .subscribe(r => {
          this.productImage.imagePath = r.imagePath;
          this.notifySvc.success("Product Image Created Successfully", "Dismiss");
          this.productImageForm.reset({});
        }, err => {
          this.notifySvc.fail("Failed to upload image", "Dismiss");
        });
    });
    reader.readAsDataURL(this.picFile);
  }
  onChange(event: any) {
    this.picFile = event.target.files[0];
  }
  ngOnInit(): void {
    this.productSvc.getProducts()
      .subscribe(r => {
        this.products = r;
      }, err => {
        this.notifySvc.fail("Failed to load product data!!", "DISMISS");
      })
  }

}
