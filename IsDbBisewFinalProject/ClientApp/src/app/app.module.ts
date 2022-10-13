import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './component/navigation/nav/nav.component';
import { HomeComponent } from './component/home/home.component';
import { CategoryComponent } from './component/category/category/category.component';
import { SubcategoryComponent } from './component/subcategory/subcategory/subcategory.component';
import { BrandComponent } from './component/brand/brand.component';
import { DeleteComponent } from './dialog/confirmation/delete/delete.component';
import { CategoryCreateComponent } from './dialog/create/category/category-create/category-create.component';
import { CustomerComponent } from './component/customer/customer/customer.component';
import { CustomerCreateComponent } from './component/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './component/customer/customer-edit/customer-edit.component';
import { SupplierComponent } from './component/supplier/supplier/supplier.component';
import { SupplierCreateComponent } from './component/supplier/supplier-create/supplier-create.component';
import { SupplierEditComponent } from './component/supplier/supplier-edit/supplier-edit.component';
import { BrandEditComponent } from './component/brand/brand-edit/brand-edit.component';
import { BrandCreateComponent } from './component/brand/brand-create/brand-create.component';
import { CategoryEditComponent } from './component/category/category-edit/category-edit.component';
import { SubcategoryCreateComponent } from './component/subcategory/subcategory-create/subcategory-create.component';
import { SubcategoryEditComponent } from './component/subcategory/subcategory-edit/subcategory-edit.component';
import { ProductComponent } from './component/product/product/product.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import { ProductEditComponent } from './component/product/product-edit/product-edit.component';
import { ProductImageComponent } from './component/product-image/product-image/product-image.component';
import { ProductImageCreateComponent } from './component/product-image/product-image-create/product-image-create.component';
import { ProductImageEditComponent } from './component/product-image/product-image-edit/product-image-edit.component';
import { PurchaseComponent } from './component/purchase/purchase/purchase.component';
import { PurchaseCreateComponent } from './component/purchase/purchase-create/purchase-create.component';
import { PurchaseEditComponent } from './component/purchase/purchase-edit/purchase-edit.component';
import { PurchaseDetailComponent } from './component/purchase-detail/purchase-detail/purchase-detail.component';
import { PurchaseDetailCreateComponent } from './component/purchase-detail/purchase-detail-create/purchase-detail-create.component';
import { PurchaseDetailEditComponent } from './component/purchase-detail/purchase-detail-edit/purchase-detail-edit.component';
import { DatePipe } from '@angular/common';
import { PurchaseService } from './services/purchase/purchase.service';
import { NotifyService } from './services/notification/notify.service';
import { PurchaseDetailService } from './services/purchase-detail/purchase-detail.service';
import { SaleDetailsComponent } from './component/sale-details/sale-details/sale-details.component';
import { SaleDetailsCreateComponent } from './component/sale-details/sale-details-create/sale-details-create.component';
import { SaleDetailsEditComponent } from './component/sale-details/sale-details-edit/sale-details-edit.component';
import { SaleComponent } from './component/sale/sale/sale.component';
import { SaleCreateComponent } from './component/sale/sale-create/sale-create.component';
import { SaleEditComponent } from './component/sale/sale-edit/sale-edit.component';
import { ShipmentComponent } from './component/shipment/shipment/shipment.component';
import { ShipmentCreateComponent } from './component/shipment/shipment-create/shipment-create.component';
import { ShipmentEditComponent } from './component/shipment/shipment-edit/shipment-edit.component';
import { CartComponent } from './component/cart/cart/cart.component';
import { CartCreateComponent } from './component/cart/cart-create/cart-create.component';
import { CartEditComponent } from './component/cart/cart-edit/cart-edit.component';
import { CartDetailComponent } from './component/cart-detail/cart-detail/cart-detail.component';
import { ShoppingSessionComponent } from './component/shopping-session/shopping-session/shopping-session.component';
import { PaymentMethodComponent } from './component/payment-method/payment-method/payment-method.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CategoryComponent,
    SubcategoryComponent,
    BrandComponent,
    DeleteComponent,
    CategoryCreateComponent,
    CustomerComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    SupplierComponent,
    SupplierCreateComponent,
    SupplierEditComponent,
    BrandEditComponent,
    BrandCreateComponent,
    CategoryEditComponent,
    SubcategoryCreateComponent,
    SubcategoryEditComponent,
    ProductComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductImageComponent,
    ProductImageCreateComponent,
    ProductImageEditComponent,
    PurchaseComponent,
    PurchaseCreateComponent,
    PurchaseEditComponent,
    PurchaseDetailComponent,
    PurchaseDetailCreateComponent,
    PurchaseDetailEditComponent,
    SaleDetailsComponent,
    SaleDetailsCreateComponent,
    SaleDetailsEditComponent,
    SaleComponent,
    SaleCreateComponent,
    SaleEditComponent,
    ShipmentComponent,
    ShipmentCreateComponent,
    ShipmentEditComponent,
    CartComponent,
    CartCreateComponent,
    CartEditComponent,
    CartDetailComponent,
    ShoppingSessionComponent,
    PaymentMethodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PurchaseService,NotifyService,PurchaseDetailService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
