import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../models/category/category';
import { CategoryService } from '../../../../services/category/category.service';
import { NotifyService } from '../../../../services/notification/notify.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})

export class CategoryCreateComponent implements OnInit {
  categoryList: Category[] = [];
  categories: Category = new Category();
  categoryForm !: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private dataSvc: CategoryService,
    private notifySvc: NotifyService

  ) { }
  getList() {
    this.dataSvc.getCategories().
      subscribe(x => {
        this.categoryList = x;
        console.log(x);
      });
  }

  insert() {
    console.log(this.categoryForm.value);
    if (this.categoryForm.valid) {
      this.dataSvc.insertCategory(this.categoryForm.value)
        .subscribe(r => {
          this.notifySvc.success("Data Inserted successfully!!", "DISMISS");
          this.categoryForm.reset({});
          this.getList();
         
        }, err => {
          this.notifySvc.fail("Fail to save data!!", "DISMISS");
        })
    }
  };

  ngOnInit(): void {
    
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required]
    });
    
  }

}

//, err => {
//  this.notifySvc.fail("Fail to save data!!", "DISMISS");
//}
