
import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { Supplier } from '../../../models/supplier/supplier';
import { CreateService } from '../../../services/create.service';
import { NotifyService } from '../../../services/notification/notify.service';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { PurchaseDetailCreateComponent } from '../../purchase-detail/purchase-detail-create/purchase-detail-create.component';




@Component({
  selector: 'app-purchase-create',
  templateUrl: './purchase-create.component.html',
  styleUrls: ['./purchase-create.component.css']
})
export class PurchaseCreateComponent implements OnInit {
  suppliers: Supplier[]=[];

  constructor(
    public service: CreateService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private suplierSvc: SupplierService,
    private notifysvc:NotifyService
  ) { }

  ngOnInit(): void {
    this.resetForm();
    this.suplierSvc.getSuppliers().
      subscribe(x => {
        this.suppliers = x;
      }, err => {
        this.notifysvc.fail("Failed to load product list", "DISMISS");
      })
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();

    this.service.formData = {
      purchaseDate:new Date,
      supplierId:0,
      totalAmount: 0,
    }

    this.service.purchaseDetails = [];
    
  }
  AddOrEditPurchaseDetails(purchaseDetailIndex: any, purchaseId: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { purchaseDetailIndex, purchaseId };
    this.dialog.open(PurchaseDetailCreateComponent,dialogConfig)
  }

}
