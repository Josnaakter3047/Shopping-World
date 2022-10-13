import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../../models/supplier/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) { }
  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`http://localhost:59104/api/Suppliers`);
  }
  getSupplierById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`http://localhost:59104/api/Suppliers/${id}`);
  }
  deleteSupplier(id: number): Observable<any> {
    return this.http.delete<Supplier>(`http://localhost:59104/api/Suppliers/${id}`)
  }
  insertSupplier(data: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(`http://localhost:59104/api/Suppliers`, data);
  }
  updateSupplier(data: Supplier): Observable<any> {
    return this.http.put(`http://localhost:59104/api/Suppliers/${data.id}`, data);
  }
}
