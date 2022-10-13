import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../models/product/product';
import { SaleDetails } from '../../../models/sale-details/sale-details';
import { Sale } from '../../../models/sale/sale';

@Component({
  selector: 'app-sale-details',
  templateUrl: './sale-details.component.html',
  styleUrls: ['./sale-details.component.css']
})
export class SaleDetailsComponent implements OnInit {
  products: Product[] = [];
  saleDetails: SaleDetails[] = [];
  sales: Sale[] = [];
  dataSource: MatTableDataSource<Sale> = new MatTableDataSource(this.saleDetails);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "saleId", "productId", "unitPrice", "quantity", "totalAmount"];
  constructor() { }

  ngOnInit(): void {
  }

}
