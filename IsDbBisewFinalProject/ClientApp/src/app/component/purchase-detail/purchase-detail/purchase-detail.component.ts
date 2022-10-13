import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { Product } from '../../../models/product/product';
import { PurchaseDetail } from '../../../models/purchase-detail/purchase-detail';
import { Purchase } from '../../../models/purchase/purchase';
import { NotifyService } from '../../../services/notification/notify.service';
import { ProductService } from '../../../services/product/product.service';
import { PurchaseDetailService } from '../../../services/purchase-detail/purchase-detail.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';

@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {

  products: Product[] = [];
  purchases: Purchase[] = [];

  purchaseDetails: PurchaseDetail[] = [];
  dataSource: MatTableDataSource<PurchaseDetail> = new MatTableDataSource(this.purchaseDetails);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["productId", "purchaseId", "quantity", "unitPrice", "manufacturingDate", "expiredDate", "isExpirable", "soldQuantity", "profit", "vatamount", "discount","actions"];

  constructor(
    private purDetSvc: PurchaseDetailService,
    private purchaseSvc: PurchaseService,
    private productSvc:ProductService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }

  confirmDelete(item: PurchaseDetail) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.purDetSvc.deletePurchaseDetail(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }

  getProductName(id: number) {
    let p = this.products.find(c => c.id == id);
    return p ? p.productTitle : '';
  }
  getPurchasesId(id: number) {
    let p = this.purchases.find(c => c.id == id);
    return p ? p.id : '';
  }
  ngOnInit(): void {
    this.purDetSvc.getPurchaseDetails().
      subscribe(x => {
        this.purchaseDetails = x;
        console.log(x);
        this.dataSource.data = this.purchaseDetails;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load purchase detail List", "DISMISS");
      });

    this.productSvc.getProducts().
      subscribe(x => {
        this.products = x;
      }, err => {
        this.notifySvc.fail("Failed to load product list", "DISMISS");
      })

    this.purchaseSvc.getPurchases().
      subscribe(x => {
        this.purchases = x;
      }, err => {
        this.notifySvc.fail("Failed to load purchase list", "DISMISS");
      })
  }

}
