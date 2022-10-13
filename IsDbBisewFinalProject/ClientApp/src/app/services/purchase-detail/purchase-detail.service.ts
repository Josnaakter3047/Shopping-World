import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseDetail } from '../../models/purchase-detail/purchase-detail';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailService {

  constructor(private http: HttpClient) { }
  getPurchaseDetails(): Observable<PurchaseDetail[]> {
    return this.http.get<PurchaseDetail[]>(`http://localhost:59104/api/PurchaseDetails`);
  }
  getPurchaseDetailById(id: number): Observable<PurchaseDetail> {
    return this.http.get<PurchaseDetail>(`http://localhost:59104/api/PurchaseDetails/${id}`);
  }
  deletePurchaseDetail(id: number): Observable<any> {
    return this.http.delete<PurchaseDetail>(`http://localhost:59104/api/PurchaseDetails/${id}`)
  }
  insertPurchaseDetail(data: PurchaseDetail): Observable<PurchaseDetail> {
    return this.http.post<PurchaseDetail>(`http://localhost:59104/api/PurchaseDetails`, data);
  }
  updatePurchaseDetail(data: PurchaseDetail): Observable<any> {
    return this.http.put(`http://localhost:59104/api/PurchaseDetails/${data.id}`, data);
  }
}
