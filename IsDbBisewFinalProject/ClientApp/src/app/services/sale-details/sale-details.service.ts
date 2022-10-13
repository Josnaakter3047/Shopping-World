import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleDetails } from '../../models/sale-details/sale-details';

@Injectable({
  providedIn: 'root'
})
export class SaleDetailsService {

  constructor(private http: HttpClient) { }
  getSaleDetails(): Observable<SaleDetails[]> {
    return this.http.get<SaleDetails[]>(`http://localhost:59104/api/SalesDetails`);
  }
  getSaleDetailsById(id: number): Observable<SaleDetails> {
    return this.http.get<SaleDetails>(`http://localhost:59104/api/SalesDetails/${id}`);
  }
  deleteSaleDetails(id: number): Observable<any> {
    return this.http.delete<SaleDetails>(`http://localhost:59104/api/SalesDetails/${id}`)
  }
  insertSaleDetails(data: SaleDetails): Observable<SaleDetails> {
    return this.http.post<SaleDetails>(`http://localhost:59104/api/SalesDetails`, data);
  }
  updateSaleDetails(data: SaleDetails): Observable<any> {
    return this.http.put(`http://localhost:59104/api/SalesDetails/${data.id}`, data);
  }
}
