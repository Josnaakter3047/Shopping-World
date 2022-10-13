import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { Customer } from '../../../models/customer/customer';
import { Sale } from '../../../models/sale/sale';
import { CustomerService } from '../../../services/customer/customer.service';
import { NotifyService } from '../../../services/notification/notify.service';
import { SaleService } from '../../../services/sale/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  customers: Customer[] = [];
  sales: Sale[] = [];
  dataSource: MatTableDataSource<Sale> = new MatTableDataSource(this.sales);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "customerId", "otherExpense", "totalAmount", "actions"];
  constructor(
    private cusSvc: CustomerService,
    private saleSvc: SaleService,
    private notifySvc: NotifyService,
    private dialog: MatDialog

  ) { }
  confirmDelete(item: Sale) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.saleSvc.deleteSale(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getCustomerName(id: number) {
    let z = this.customers.find(c => c.id == id);
    return z ? z.customerName : '';
  }
  ngOnInit(): void {
    this.saleSvc.getSales().
      subscribe(x => {
        this.sales = x;
        console.log(x);
        this.dataSource.data = this.sales;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load supplier data", "DISMISS");
      });
    this.cusSvc.getCustomers().
      subscribe(x => {
        this.customers = x;
      }, err => {
        this.notifySvc.fail("Failed to load category list", "DISMISS");
      })

  }

}
