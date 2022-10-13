import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(private http: HttpClient) { }
  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`http://localhost:59104/api/Carts`);
  }
  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`http://localhost:59104/api/Carts/${id}`);
  }
  deleteCart(id: number): Observable<any> {
    return this.http.delete<Cart>(`http://localhost:59104/api/Carts/${id}`)
  }
  insertCart(data: Cart): Observable<Cart> {
    return this.http.post<Cart>(`http://localhost:59104/api/Carts`, data);
  }
  updateCart(data: Cart): Observable<any> {
    return this.http.put(`http://localhost:59104/api/Carts/${data.id}`, data);
  }
}
