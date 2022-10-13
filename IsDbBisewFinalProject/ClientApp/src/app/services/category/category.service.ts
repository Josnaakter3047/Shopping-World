import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:59104/api/Categories`);
  }
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`http://localhost:59104/api/Categories/${id}`);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete<Category>(`http://localhost:59104/api/Categories/${id}`)
  }
  insertCategory(data: Category): Observable<Category> {
    return this.http.post<Category>(`http://localhost:59104/api/Categories`, data);
  }
  updateCategory(data: Category): Observable<any> {
    return this.http.put(`http://localhost:59104/api/Categories/${data.id}`, data);
  }
}
