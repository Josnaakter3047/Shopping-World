import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { ProductImage } from '../../../models/product-image/product-image';
import { Product } from '../../../models/product/product';
import { NotifyService } from '../../../services/notification/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductImageService } from '../../../services/productimage/product-image.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent implements OnInit {
  
  productImages: ProductImage[] = [];
  products: Product[] = [];
  dataSource: MatTableDataSource<ProductImage> = new MatTableDataSource(this.productImages);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id","productId", "imagePath", "thumbnailImage", "detialImage","actions"];

  constructor(
    private productImageService: ProductImageService,
    private productService: ProductService,
    private notifyService: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: ProductImage) {
    this.dialog.open(DeleteComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.productImageService.deleteProductImage(Number(item.id))
        .subscribe(x => {
          this.notifyService.success("Product Image Delete Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);

        }, err => {
          this.notifyService.fail("Failed to delete from product image table", "DISMISS");
        })
    });
  }

  getProductName(id: number) {
    let z = this.products.find(c => c.id == id);
    return z ? z.productTitle : '';
  }
  ngOnInit(): void {
    this.productImageService.getProductImages().
      subscribe(x => {
        this.productImages = x;
        console.log(x);
        this.dataSource.data = this.productImages;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifyService.fail("Failed to load product image data", "DISMISS");
      });

    this.productService.getProducts().
      subscribe(x => {
        this.products = x;
      }, err => {
        this.notifyService.fail("Failed to load product image data", "DISMISS");
      })
  }

}
