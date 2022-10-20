import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { Supplier } from '../../../models/supplier/supplier';
import { NotifyService } from '../../../services/notification/notify.service';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { PurchaseDetail } from '../../../models/purchase-detail/purchase-detail';
import { Purchase } from '../../../models/purchase/purchase';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class PurchaseComponent {

  
  purchaseAndPurchaseDetailsData: Purchase[] = [];
  suppliers: Supplier[] = [];
  expandedElement!: Purchase|null ;



  dataSource!: MatTableDataSource<Purchase>;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  @ViewChildren('innerTables') innerTables!: QueryList<MatTable<PurchaseDetail>>;

  /*@ViewChildren('innerSort') innerSort!: QueryList<MatSort>;*/

  //@ViewChild('outerSort', { static: true }) sort: MatSort;


  purchaseColumnList: string[] = ["id", "purchaseDate", "supplierId", "totalAmount", "actions"];

  /*supplierColumnList: string[] = ["id", "name", "address", "email", "contactNo", "actions"];*/

  purchaseDetailsColumnList: string[] = ["productId", "quantity", "unitPrice", "manufacturingDate", "expiredDate", "isExpirable", "soldQuantity", "profit", "vat", "discount", "actions"];

  constructor(
    private purchaseSvc: PurchaseService,
    private notifySvc: NotifyService,
    private dataService: SupplierService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef

  ) { }

  getSupplierName(id: number) {
    let z = this.suppliers.find(c => c.id == id);
    return z ? z.supplierName : '';
  }



  // delete purchase data
  confirmDelete(item: Purchase) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.purchaseSvc.deletePurchase(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }

  //toogle row when clicked

  toggleRow(element: Purchase) {
    element.purchaseDetails && (element.purchaseDetails as MatTableDataSource<Purchase>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    /*this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<PurchaseDetail>).sort = this.innerSort.toArray()[index]);*/
  }

  //applyFilter(filterValue: string) {
  //  this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<PurchaseDetail>).filter = filterValue.trim().toLowerCase());
  //}

  ngOnInit(): void {

    // load purchase data and iterate through purchase details column
    this.purchaseSvc.getPurchases().
      subscribe(purchase => {
        purchase.forEach(p => {
          if (p.purchaseDetails && Array.isArray(p.purchaseDetails) && p.purchaseDetails.length) {
            this.purchaseAndPurchaseDetailsData = [...this.purchaseAndPurchaseDetailsData, { ...p, purchaseDetails: new MatTableDataSource(p.purchaseDetails) }];
            console.log(p);
          }
          
        });

        // initailize mat table with data

        this.dataSource = new MatTableDataSource(this.purchaseAndPurchaseDetailsData);
        this.dataSource.sort = this.sort;
        console.log(this.purchaseAndPurchaseDetailsData);
        console.log(this.dataSource);
      }, err => {
        this.notifySvc.fail("failed to load purchase data", "Dismiss");
      });

    //load supplier data
    this.dataService.getSuppliers().
      subscribe(x => {
        this.suppliers = x;
      }, err => {
        this.notifySvc.fail("Failed to load supplier data", "DISMISS");
      })

  }
}


//export interface Purchase {
//  purchaseDate: Date;
//  totalAmount: number;
//  supplierId: number;
//  suppliers?: Supplier[] | MatTableDataSource<Supplier>;
//  purchaseDetails?: PurchaseDetail[] | MatTableDataSource<PurchaseDetail>;
//}
//export interface Supplier {
//  supplierName: string;
//  address: string;
//  email: string;
//  contactNo: string;
//}
//export interface PurchaseDetail {
//  id: number;
//  productId: number;
//  purchaseId: number;
//  quantity: number;
//  unitPrice: number;
//  manufacturingDate: Date;
//  expiredDate: Date;
//  isExpirable: boolean;
//  soldQuantity: number;
//  profit: number;
//  vat: number;
//  discount: number;
//  vatAmount: number;
//  discountAmount: number;
//  sellingPrice: number;
//}
//export interface PurchaseDataSource {
//  purchaseDate: Date;
//  totalAmount: number;
//  supplierId: number;
//  suppliers?: MatTableDataSource<Supplier>;
//  purchaseDetails?:  MatTableDataSource<PurchaseDetail>;
//}

//const PURCHASE: Purchase[] = [
//  {
    
//    //purchaseDate?:,
//    //totalAmount?: number,
//    //supplierId?: number,
//    //suppliers: [
//    //  {
//    //    supplierName: string;
//    //    address: string;
//    //    email: string;
//    //    contactNo: string;
//    //  }
//    //],
//    //purchaseDetails: [
//    //  {
//    //    productId: number;
//    //    purchaseId: number;
//    //    quantity: number;
//    //    unitPrice: number;
//    //    manufacturingDate: Date;
//    //    expiredDate: Date;
//    //    isExpirable: boolean;
//    //    soldQuantity: number;
//    //    profit: number;
//    //    vat: number;
//    //    discount: number;
//    //    vatAmount: number;
//    //    discountAmount: number;
//    //    sellingPrice: number;
//    //  }
//    //]
//  },
//];
