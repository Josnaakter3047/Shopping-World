import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale } from '../../models/sale/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) { }
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`http://localhost:59104/api/Sales`);
  }
  getSalesById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`http://localhost:59104/api/Sales/${id}`);
  }
  deleteSale(id: number): Observable<any> {
    return this.http.delete<Sale>(`http://localhost:59104/api/Sales/${id}`)
  }
  insertSale(data: Sale): Observable<Sale> {
    return this.http.post<Sale>(`http://localhost:59104/api/Sales`, data);
  }
  updateSale(data: Sale): Observable<any> {
    return this.http.put(`http://localhost:59104/api/Sales/${data.id}`, data);
  }
}
