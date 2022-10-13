import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { Customer } from '../../../models/customer/customer';
import { CustomerService } from '../../../services/customer/customer.service';
import { NotifyService } from '../../../services/notification/notify.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [];
  dataSource: MatTableDataSource<Customer> = new MatTableDataSource(this.customers);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id","name", "address", "contact", "email", "password", "actions"];
  constructor(
    private customersvc:CustomerService,
    private notifysvc: NotifyService,
    private dialog: MatDialog
  ) { }

  confirmDelete(item: Customer) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.customersvc.deleteCustomer(Number(item.id))
        .subscribe(x => {
          this.notifysvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);
        }, err => {
          this.notifysvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  ngOnInit(): void {
    this.customersvc.getCustomers()
      .subscribe(x => {
        this.customers = x;
        console.log(x);
        this.dataSource.data = this.customers;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifysvc.fail("Failed to load customer data", "DISMISS");
      });
  }

}
