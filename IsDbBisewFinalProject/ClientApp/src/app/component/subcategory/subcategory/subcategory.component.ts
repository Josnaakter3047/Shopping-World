import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteComponent } from '../../../dialog/confirmation/delete/delete.component';
import { Category } from '../../../models/category/category';
import { Subcategory } from '../../../models/subcategory/subcategory';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notification/notify.service';
import { SubcategoryService } from '../../../services/subcategory/subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  categories: Category[] = [];

  subcategories: Subcategory[] = [];
  dataSource: MatTableDataSource<Subcategory> = new MatTableDataSource(this.subcategories);
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  columnList: string[] = ["id", "categoryId", "subCategoryName","actions"];

  constructor(
    private catSvc:CategoryService,
    private subCategorySvc: SubcategoryService,
    private notifySvc: NotifyService,
    private dialog: MatDialog
  ) { }
  confirmDelete(item: Subcategory) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
    }).afterClosed().subscribe(r => {
      if (r) this.subCategorySvc.deleteSubCategory(Number(item.id))
        .subscribe(x => {
          this.notifySvc.success("Data deleted Successfully", "DISMISS");
          this.dataSource.data = this.dataSource.data.filter(d => d.id != x.id);
        }, err => {
          this.notifySvc.fail("Data delete failed", "DISMISS");
        })
    });
  }
  getCategoryName(id: number) {
    let z = this.categories.find(c => c.id == id);
    return z ? z.categoryName : '';
  }
  ngOnInit(): void {
    this.subCategorySvc.getSubCategories().
      subscribe(x => {
        this.subcategories = x;
        console.log(x);
        this.dataSource.data = this.subcategories;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, err => {
        this.notifySvc.fail("Failed to load SubCategory List", "DISMISS");
      });

    this.catSvc.getCategories().
      subscribe(x => {
        this.categories = x;
      }, err => {
        this.notifySvc.fail("Failed to load category list", "DISMISS");
      })
  }

}
