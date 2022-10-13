import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { CategoryCreateComponent } from '../../../dialog/create/category/category-create/category-create.component';
import { Category } from '../../../models/category/category';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notification/notify.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource(this.categories);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "categoryName", "actions"];

  constructor(
    private catSvc: CategoryService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Category) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.catSvc.deleteCategory(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }

  //for create category from dialog

  categoryCreate() {
    this.dialog.open(CategoryCreateComponent, {
      width:'30%'
    });
  }
  ngOnInit(): void {
    this.catSvc.getCategories().
      subscribe(x => {
        this.categories = x;
        console.log(x);
        this.dataSource.data = this.categories;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load Category List", "DISMISS");
      });
  }

}
