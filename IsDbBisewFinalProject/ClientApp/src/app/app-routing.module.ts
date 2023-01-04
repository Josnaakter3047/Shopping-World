import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrandCreateComponent } from './component/brand/brand-create/brand-create.component';
import { BrandEditComponent } from './component/brand/brand-edit/brand-edit.component';
import { BrandComponent } from './component/brand/brand.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail/cart-detail.component';
import { CartComponent } from './component/cart/cart/cart.component';
import { CategoryEditComponent } from './component/category/category-edit/category-edit.component';
import { CategoryComponent } from './component/category/category/category.component';
import { CustomerCreateComponent } from './component/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './component/customer/customer-edit/customer-edit.component';
import { CustomerComponent } from './component/customer/customer/customer.component';
import { HomeComponent } from './component/home/home.component';
import { ProductImageCreateComponent } from './component/product-image/product-image-create/product-image-create.component';
import { ProductImageEditComponent } from './component/product-image/product-image-edit/product-image-edit.component';
import { ProductImageComponent } from './component/product-image/product-image/product-image.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import { ProductEditComponent } from './component/product/product-edit/product-edit.component';
import { ProductComponent } from './component/product/product/product.component';
import { PurchaseDetailCreateComponent } from './component/purchase-detail/purchase-detail-create/purchase-detail-create.component';
import { PurchaseDetailEditComponent } from './component/purchase-detail/purchase-detail-edit/purchase-detail-edit.component';
import { PurchaseDetailComponent } from './component/purchase-detail/purchase-detail/purchase-detail.component';
import { PurchaseCreateComponent } from './component/purchase/purchase-create/purchase-create.component';
import { PurchaseEditComponent } from './component/purchase/purchase-edit/purchase-edit.component';
import { PurchaseComponent } from './component/purchase/purchase/purchase.component';
import { SaleDetailsComponent } from './component/sale-details/sale-details/sale-details.component';
import { SaleComponent } from './component/sale/sale/sale.component';
import { SubcategoryCreateComponent } from './component/subcategory/subcategory-create/subcategory-create.component';
import { SubcategoryEditComponent } from './component/subcategory/subcategory-edit/subcategory-edit.component';
import { SubcategoryComponent } from './component/subcategory/subcategory/subcategory.component';
import { SupplierCreateComponent } from './component/supplier/supplier-create/supplier-create.component';
import { SupplierEditComponent } from './component/supplier/supplier-edit/supplier-edit.component';
import { SupplierComponent } from './component/supplier/supplier/supplier.component';

const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'category', component: CategoryComponent },
  { path: 'category-edit/:id', component: CategoryEditComponent },

  { path: 'subcategory', component: SubcategoryComponent },
  { path: 'subcategory-create', component: SubcategoryCreateComponent },
  { path: 'subcategory-edit/:id', component: SubcategoryEditComponent },

  { path: 'brand', component: BrandComponent },
  { path: 'brand-create', component: BrandCreateComponent },
  { path: 'brand-edit/:id', component: BrandEditComponent },

  { path: 'customers', component: CustomerComponent },
  { path: 'customer-create', component: CustomerCreateComponent },
  { path: 'customer-edit/:id', component: CustomerEditComponent },

  { path: 'supplier', component: SupplierComponent },
  { path: 'edit-supplier/:id', component: SupplierEditComponent },
  { path: 'supplier-create', component: SupplierCreateComponent },

  { path: 'product', component: ProductComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'product-edit/:id', component: ProductEditComponent },

  { path: 'product-images', component: ProductImageComponent },
  { path: 'product-images-create', component: ProductImageCreateComponent },
  { path: 'product-images-edit/:id', component: ProductImageEditComponent },

  { path: 'purchase', component: PurchaseComponent },
  { path: 'purchase-create', component: PurchaseCreateComponent },
  { path: 'purchase-edit/:id', component: PurchaseEditComponent },

  { path: 'purchase-detials', component: PurchaseDetailComponent },
  { path: 'purchase-detial-create', component: PurchaseDetailCreateComponent },
  { path: 'purchase-detial-edit/:id', component: PurchaseDetailEditComponent },

  { path: 'sale', component: SaleComponent },
  { path: 'sale-details', component: SaleDetailsComponent },

  { path: 'cart', component: CartComponent },
  { path: 'cart-detail', component: CartDetailComponent },
  { path: 'payment-method', component: SaleComponent },

  { path: '*', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
