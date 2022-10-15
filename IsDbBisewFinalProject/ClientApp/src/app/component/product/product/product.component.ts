import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  categories: Category[] = [];

  subcategories: Subcategory[] = [];
  brands: Brand[] = [];
  products: Product[] = [];

  dataSource: MatTableDataSource<Product> = new MatTableDataSource(this.products);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["categoryId", "subCategoryId", "brandId","productTitle","description","actions"];

  constructor(
    private catSvc: CategoryService,
    private subCategorySvc: SubcategoryService,
    private proSvc: ProductService,
    private brandSvc:BrandService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }

  confirmDelete(item: Product) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(x => {
      if (x) this.proSvc.deleteProduct(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        });
    });
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
    this.proSvc.getProducts().
      subscribe(x => {
        this.products = x;
        console.log(x);
        this.dataSource.data = this.products;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load product List", "DISMISS");
      });

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
