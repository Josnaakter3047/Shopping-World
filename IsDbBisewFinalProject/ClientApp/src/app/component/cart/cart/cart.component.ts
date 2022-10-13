import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { Cart } from '../../../models/cart/cart';
import { Customer } from '../../../models/customer/customer';
import { ShoppingSession } from '../../../models/shopping-session/shopping-session';
import { CartService } from '../../../services/cart/cart.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { NotifyService } from '../../../services/notification/notify.service';
import { ShoppingSessionService } from '../../../services/shopping-session/shopping-session.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts: Cart[] = [];
  customers: Customer[] = [];
  shoppingSessions: ShoppingSession[] = [];

  dataSource: MatTableDataSource<Cart> = new MatTableDataSource(this.carts);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "customerId", "sessionId", "cartDate", "actions"];

  constructor(
    private cartSvc: CartService,
    private customerSvc: CustomerService,
    private shoppingSessionSvc: ShoppingSessionService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Cart) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.cartSvc.deleteCart(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(c => c.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getCustomerName(id: number) {
    let z = this.customers.find(c => c.id == id);
    return z ? z.customerName : '';
  }

  getShoppingSessionId(id: number) {
    let z = this.shoppingSessions.find(c => c.id == id);
    return z ? z.id : '';
  }
  ngOnInit(): void {
    this.cartSvc.getCarts().
      subscribe(x => {
        this.carts = x;
        console.log(x);
        this.dataSource.data = this.carts;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load carts List", "DISMISS");
      });

    this.customerSvc.getCustomers().
      subscribe(x => {
        this.customers = x;
      }, err => {
        this.notifySvc.fail("Failed to load Customers list", "DISMISS");
      });
    this.shoppingSessionSvc.getShoppingSessions().
      subscribe(x => {
        this.shoppingSessions = x;
      }, err => {
        this.notifySvc.fail("Failed to load shoppingSession list", "DISMISS");
      })
  }

}
