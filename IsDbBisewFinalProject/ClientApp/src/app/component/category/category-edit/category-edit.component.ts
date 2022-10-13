import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/category/category';
import { CategoryService } from '../../../services/category/category.service';
import { NotifyService } from '../../../services/notification/notify.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  category!: Category;
  categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('', Validators.required)
  })
  constructor(
    private categorySvc: CategoryService,
    private notifysvc: NotifyService,
    private activateRoute: ActivatedRoute
  ) { }
  get f() {
    return this.categoryForm.controls;
  }
  update() {
    if (this.categoryForm.invalid) return;
    this.category.categoryName = this.f['categoryName'].value;
    
    this.categorySvc.updateCategory(this.category)
      .subscribe(r => {
        this.notifysvc.success("Data Updated successfully!!", "DISMISS");
        this.categoryForm.reset({});
      }, err => {
        this.notifysvc.fail("Fail to Update data!!", "DISMISS");
      })
  }

  ngOnInit(): void {
    let id: number = this.activateRoute.snapshot.params['id'];
    this.categorySvc.getCategoryById(id)
      .subscribe(x => {
        this.category = x;
        this.categoryForm.patchValue(this.category);
      }, err => {
        this.notifysvc.fail("Fail to load category data!!", "DISMISS");
      })
  }

}
