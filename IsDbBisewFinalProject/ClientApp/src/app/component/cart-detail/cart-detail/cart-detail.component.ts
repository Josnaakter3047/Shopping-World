import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { CartDetail } from '../../../models/cart-detail/cart-detail';
import { Cart } from '../../../models/cart/cart';
import { Product } from '../../../models/product/product';
import { CartDetailService } from '../../../services/cart-detail/cart-detail.service';
import { CartService } from '../../../services/cart/cart.service';
import { NotifyService } from '../../../services/notification/notify.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  cartDetails: CartDetail[] = [];
  carts: Cart[] = [];
  products: Product[] = [];
  dataSource: MatTableDataSource<CartDetail> = new MatTableDataSource(this.cartDetails);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "cartId", "productId", "unitPrice", "quantity", "total", "actions"];

  constructor(
    private cartDetailsSvc: CartDetailService,
    private cartSvc: CartService,
    private proSvc: ProductService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: CartDetail) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.cartDetailsSvc.deleteCartDetails(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(c => c.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getCartId(id: number) {
    let z = this.carts.find(c => c.id == id);
    return z ? z.id : '';
  }

  getProductId(id: number) {
    let z = this.products.find(c => c.id == id);
    return z ? z.id : '';
  }
  ngOnInit(): void {
    this.cartDetailsSvc.getCartDetails().
      subscribe(x => {
        this.cartDetails = x;
        console.log(x);
        this.dataSource.data = this.cartDetails;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load cartDetails List", "DISMISS");
      });

    this.cartSvc.getCarts().
      subscribe(x => {
        this.carts = x;
      }, err => {
        this.notifySvc.fail("Failed to load Carts list", "DISMISS");
      });
    this.proSvc.getProducts().
      subscribe(x => {
        this.products = x;
      }, err => {
        this.notifySvc.fail("Failed to load products list", "DISMISS");
      })
  }

}
