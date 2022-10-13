import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { Purchase } from '../../../models/purchase/purchase';
import { Supplier } from '../../../models/supplier/supplier';
import { NotifyService } from '../../../services/notification/notify.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { SupplierService } from '../../../services/supplier/supplier.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  purchases: Purchase[] = [];
  suppliers: Supplier[] = [];
  dataSource: MatTableDataSource<Purchase> = new MatTableDataSource(this.purchases);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  columnList: string[] = ["id", "purchaseDate", "supplierId", "totalAmount", "actions"];

  constructor(
    private dataSvc: PurchaseService,
    private notifySvc: NotifyService,
    private dataService: SupplierService,
    private dialog:MatDialog

  ) { }

  getSupplierName(id: number) {
    let z = this.suppliers.find(c => c.id == id);
    return z ? z.supplierName : '';
  }

  confirmDelete(item: Purchase) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.dataSvc.deletePurchase(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }

  ngOnInit(): void {
    this.dataSvc.getPurchases().
      subscribe(x => {
        this.purchases = x;
        console.log(x);
        this.dataSource.data = this.purchases;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load Purchase data", "DISMISS");
      });

    this.dataService.getSuppliers().
      subscribe(x => {
        this.suppliers = x;
      }, err => {
        this.notifySvc.fail("Failed to load supplier data", "DISMISS");
      })

  
  }

}
