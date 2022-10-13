import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../../models/purchase/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }
  getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`http://localhost:59104/api/Purchases`);
  }
  getPurchaseById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`http://localhost:59104/api/Purchases/${id}`);
  }
  deletePurchase(id: number): Observable<any> {
    return this.http.delete<Purchase>(`http://localhost:59104/api/Purchases/${id}`)
  }
  insertPurchase(data: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(`http://localhost:59104/api/Purchases`, data);
  }
  updatePurchase(data: Purchase): Observable<any> {
    return this.http.put(`http://localhost:59104/api/Purchases/${data.id}`, data);
  }
}
