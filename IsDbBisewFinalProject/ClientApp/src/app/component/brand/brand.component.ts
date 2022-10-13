import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../dialog/confirmation/delete/delete.component';
import { Brand } from '../../models/brand/brand';
import { BrandService } from '../../services/brand/brand.service';
import { NotifyService } from '../../services/notification/notify.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  brands: Brand[] = [];
  dataSource: MatTableDataSource<Brand> = new MatTableDataSource(this.brands);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "brandName", "actions"];

  constructor(
    private brandSvc: BrandService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Brand) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.brandSvc.deleteBrand(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  ngOnInit(): void {
    this.brandSvc.getBrands().
      subscribe(x => {
        this.brands = x;
        console.log(x);
        this.dataSource.data = this.brands;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load Brand List", "DISMISS");
      });
  }

}
