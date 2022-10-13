import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartDetail } from '../../models/cart-detail/cart-detail';

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  constructor(private http: HttpClient) { }
  getCartDetails(): Observable<CartDetail[]> {
    return this.http.get<CartDetail[]>(`http://localhost:59104/api/CartDetails`);
  }
  getCartDetailsById(id: number): Observable<CartDetail> {
    return this.http.get<CartDetail>(`http://localhost:59104/api/CartDetails/${id}`);
  }
  deleteCartDetails(id: number): Observable<any> {
    return this.http.delete<CartDetail>(`http://localhost:59104/api/CartDetails/${id}`)
  }
  insertCartDetails(data: CartDetail): Observable<CartDetail> {
    return this.http.post<CartDetail>(`http://localhost:59104/api/CartDetails`, data);
  }
  updateCartDetails(data: CartDetail): Observable<any> {
    return this.http.put(`http://localhost:59104/api/CartDetails/${data.id}`, data);
  }
}
