import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../models/category/category';
import { Subcategory } from '../../../models/subcategory/subcategory';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notification/notify.service';
import { SubcategoryService } from '../../../services/subcategory/subcategory.service';

@Component({
  selector: 'app-subcategory-create',
  templateUrl: './subcategory-create.component.html',
  styleUrls: ['./subcategory-create.component.css']
})
export class SubcategoryCreateComponent implements OnInit {

  categories: Category[] = [];
  subCategory: Subcategory = new Subcategory();
  subCategoryForm: FormGroup = new FormGroup({
    categoryId: new FormControl('', Validators.required),
    subCategoryName: new FormControl('', Validators.required)
  })

  constructor(
    private catSvc: CategoryService,
    private subCatSvc: SubcategoryService,
    private notifysvc: NotifyService
  ) { }


  get f() {
    return this.subCategoryForm.controls;
  }


  insert() {
    if (this.subCategoryForm.invalid) return;
    this.subCategory.categoryId = this.f['categoryId'].value;
    this.subCategory.subCategoryName = this.f['subCategoryName'].value;

    this.subCatSvc.insertSubCategory(this.subCategory)
      .subscribe(r => {
        this.notifysvc.success("Data Inserted successfully!!", "DISMISS");
        this.subCategoryForm.reset({});
      }, err => {
        this.notifysvc.fail("Fail to save data!!", "DISMISS");
      })

  }
  getCategoryName(id: number) {
    let z = this.categories.find(c => c.id == id);
    return z ? z.categoryName : '';
  }
  ngOnInit(): void {
    this.catSvc.getCategories().
      subscribe(x => {
        this.categories = x;
      }, err => {
        this.notifysvc.fail("Failed to load category list", "DISMISS");
      })
  }

}
