import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../models/brand/brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }
  
  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`http://localhost:59104/api/Brands`);
  }
  getBrandById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`http://localhost:59104/api/Brands/${id}`);
  }
  deleteBrand(id: number): Observable<any> {
    return this.http.delete<Brand>(`http://localhost:59104/api/Brands/${id}`)
  }
  insertBrand(data: Brand): Observable<Brand> {
    return this.http.post<Brand>(`http://localhost:59104/api/Brands`, data);
  }
  updateBrand(data: Brand): Observable<any> {
    return this.http.put(`http://localhost:59104/api/Brands/${data.id}`, data);
  }
}
