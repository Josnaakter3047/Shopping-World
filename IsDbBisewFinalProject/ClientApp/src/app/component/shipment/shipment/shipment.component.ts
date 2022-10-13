import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { SaleDetails } from '../../../models/sale-details/sale-details';
import { Shipment } from '../../../models/shipment/shipment';
import { NotifyService } from '../../../services/notification/notify.service';
import { SaleDetailsService } from '../../../services/sale-details/sale-details.service';
import { ShipmentService } from '../../../services/shipment/shipment.service';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {
  shipments: Shipment[] = [];
  salesDetails: SaleDetails[] = [];
  dataSource: MatTableDataSource<Shipment> = new MatTableDataSource(this.shipments);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "salesDetailsId", "deliveryToAddress", "fromAddress", "trackingNo", "deliveryDate", "contactNo ", "actions"];
  constructor(
    private shipSvc: ShipmentService,
    private salesDetailsSvc: SaleDetailsService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Shipment) {
    this.dialog.open(DeleteComponent, {
      width: '450px'
    }).afterClosed().subscribe(r => {
      if (r) this.shipSvc.deleteShipment(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getSalesDetails(id: number) {
    let z = this.salesDetails.find(c => c.id == id);
    return z ? z.id : '';
  }
  ngOnInit(): void {
    this.shipSvc.getShipments().
      subscribe(x => {
        this.shipments = x;
        console.log(x);
        this.dataSource.data = this.shipments;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load Shipments data", "DISMISS");
      });
    this.salesDetailsSvc.getSaleDetails().
      subscribe(x => {
        this.salesDetails = x;
      }, err => {
        this.notifySvc.fail("Failed to load SalesDetails list", "DISMISS");
      })
  }

}
