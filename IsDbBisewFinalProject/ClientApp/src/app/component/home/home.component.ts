import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { Home } from '../../models/home/home';
import { ImagePath } from '../../models/product-image/image-path';
import { ProductImage } from '../../models/product-image/product-image';
import { Product } from '../../models/product/product';
import { PurchaseDetail } from '../../models/purchase-detail/purchase-detail';
import { HomeService } from '../../services/home/home.service';
import { NotifyService } from '../../services/notification/notify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeDetails: Home[] = [];
  productImages: ProductImage = new ProductImage();
  products: Product[] = [];
  purchaseDetails: PurchaseDetail[] = [];

  

  constructor(
    private homeService: HomeService,
    private notifySvc:NotifyService
  ) { }
 
  ngOnInit(): void {
    this.homeService.getHomeData().subscribe(x =>
    {
      this.homeDetails = x;
      console.log(x);
    })
  }

}
