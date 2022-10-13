import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagePath } from '../../models/product-image/image-path';
import { ProductImage } from '../../models/product-image/product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(private http: HttpClient) { }
  getProductImages(): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>(`http://localhost:59104/api/ProductImages`);
  }
  getProductImageById(id: number): Observable<ProductImage> {
    return this.http.get<ProductImage>(`http://localhost:59104/api/ProductImages/${id}`);
  }
  deleteProductImage(id: number): Observable<any> {
    return this.http.delete<ProductImage>(`http://localhost:59104/api/ProductImages/${id}`)
  }
  insertProductImage(data: ProductImage): Observable<ProductImage> {
    return this.http.post<ProductImage>(`http://localhost:59104/api/ProductImages`, data);
  }
  updateProductImage(data: ProductImage): Observable<any> {
    return this.http.put(`http://localhost:59104/api/ProductImages/${data.id}`, data);
  }

  uploadImage(id: number, f: File): Observable<ImagePath> {
    const formData = new FormData();
    formData.append('file', f);
    return this.http.post<ImagePath>(`http://localhost:59104/api/ProductImages/Uploads/${id}`, formData);
  }
}
