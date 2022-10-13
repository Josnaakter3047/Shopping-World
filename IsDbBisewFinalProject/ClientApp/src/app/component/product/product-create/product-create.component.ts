import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Brand } from '../../../models/brand/brand';
import { Category } from '../../../models/category/category';
import { Product } from '../../../models/product/product';
import { Subcategory } from '../../../models/subcategory/subcategory';
import { BrandService } from '../../../services/brand/brand.service';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notification/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { SubcategoryService } from '../../../services/subcategory/subcategory.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = new Product();

  products: Product[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  brands: Brand[] = [];

  productForm: FormGroup = new FormGroup({
    productTitle: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    subCategoryId: new FormControl('', Validators.required),
    brandId: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private catSvc: CategoryService,
    private subCategorySvc: SubcategoryService,
    private proSvc: ProductService,
    private brandSvc: BrandService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }

  get f() {
    return this.productForm.controls;
  }

  insert() {

    if (this.productForm.invalid) return;
    this.product.productTitle = this.f['productTitle'].value;
    this.product.categoryId = this.f['categoryId'].value;
    this.product.subCategoryId = this.f['subCategoryId'].value;
    this.product.brandId = this.f['brandId'].value;
    this.product.description = this.f['description'].value;

    this.proSvc.insertProduct(this.product)
      .subscribe(r => {
        this.notifySvc.success("Data Inserted successfully!!", "DISMISS");
        this.productForm.reset({});
      }, err => {
        this.notifySvc.fail("Fail to save data!!", "DISMISS");
      })
  }
  getCategoryName(id: number) {
    let z = this.categories.find(c => c.id == id);
    return z ? z.categoryName : '';
  }
  getSubCategoryName(id: number) {
    let z = this.subcategories.find(c => c.id == id);
    return z ? z.subCategoryName : '';
  }
  getBrandName(id: number) {
    let z = this.brands.find(c => c.id == id);
    return z ? z.brandName : '';
  }
  ngOnInit(): void {
    this.catSvc.getCategories().
      subscribe(x => {
        this.categories = x;
      }, err => {
        this.notifySvc.fail("Failed to load category list", "DISMISS");
      })
    this.subCategorySvc.getSubCategories().
      subscribe(x => {
        this.subcategories = x;
      }, err => {
        this.notifySvc.fail("Failed to load subCategories list", "DISMISS");
      })

    this.brandSvc.getBrands().
      subscribe(x => {
        this.brands = x;
      }, err => {
        this.notifySvc.fail("Failed to load brand list", "DISMISS");
      })
  }

}
