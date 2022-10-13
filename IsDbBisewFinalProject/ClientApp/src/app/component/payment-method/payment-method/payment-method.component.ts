import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentMethod } from '../../../models/payment-method/payment-method';
import { NotifyService } from '../../../services/notification/notify.service';
import { PaymentMethodService } from '../../../services/payment-method/payment-method.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  paymentmethods: PaymentMethod[] = [];
  dataSource: MatTableDataSource<PaymentMethod> = new MatTableDataSource(this.paymentmethods);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "methodName"];
  constructor(
    private paymentSvc: PaymentMethodService,
    private notifySvc: NotifyService
  ) { }

  ngOnInit(): void {
    this.paymentSvc.getPaymentMethods().
      subscribe(x => {
        this.paymentmethods = x;
        console.log(x);
        this.dataSource.data = this.paymentmethods;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load Payment Method", "DISMISS");
      });
  }

}
