import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../../models/subcategory/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http: HttpClient) { }
  getSubCategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`http://localhost:59104/api/SubCategories`);
  }
  getSubCategoryById(id: number): Observable<Subcategory> {
    return this.http.get<Subcategory>(`http://localhost:59104/api/SubCategories/${id}`);
  }
  deleteSubCategory(id: number): Observable<any> {
    return this.http.delete<Subcategory>(`http://localhost:59104/api/SubCategories/${id}`)
  }
  insertSubCategory(data: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(`http://localhost:59104/api/SubCategories`, data);
  }
  updateSubCategory(data: Subcategory): Observable<any> {
    return this.http.put(`http://localhost:59104/api/SubCategories/${data.id}`, data);
  }
}
