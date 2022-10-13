import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductImage } from '../../../models/product-image/product-image';
import { Product } from '../../../models/product/product';
import { NotifyService } from '../../../services/notification/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductImageService } from '../../../services/productimage/product-image.service';

@Component({
  selector: 'app-product-image-edit',
  templateUrl: './product-image-edit.component.html',
  styleUrls: ['./product-image-edit.component.css']
})
export class ProductImageEditComponent implements OnInit {
  products: Product[] = [];
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
    private notifySvc: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  get productImageControl() {
    return this.productImageForm.controls;
  }
  update():void {
    if (this.productImageForm.invalid) return;
    this.productImage.productId = this.productImageControl['productId'].value;
    this.productImage.imagePath = this.productImageControl['imagePath'].value;
    this.productImage.thumbnailImage = this.productImageControl['thumbnailImage'].value;
    this.productImage.detialImage = this.productImageControl['detialImage'].value;
  
    this.productImageService.updateProductImage(this.productImage)
      .subscribe(r => {
        if (this.picFile != null && this.productImage.id) {
          this.upload(Number(this.productImage.id));
        }
        else {
          this.notifySvc.success("Succeeded to update product image data", "DISMISS");
        }
      }, err => {
        this.notifySvc.fail("Fail to Save Product Image!!", "DISMISS");
      })

  }
  upload(id: number) {
    let reader = new FileReader();
    reader.addEventListener("load", (event: any) => {
      this.productImageService.uploadImage(id, this.picFile)
        .subscribe(r => {
          this.productImage.imagePath = r.imagePath;
          this.notifySvc.success("Product Image update Successfully", "Dismiss");
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
    let id = this.activatedRoute.snapshot.params["id"];
    this.productImageService.getProductImageById(id)
      .subscribe(r => {
        this.productImage = r;
        this.productImageForm.patchValue(this.productImage);

      });
    this.productSvc.getProducts()
      .subscribe(r => {
        this.products = r;
      }, err => {
        this.notifySvc.fail("Failed to load product data!!", "DISMISS");
      })
  }

}
