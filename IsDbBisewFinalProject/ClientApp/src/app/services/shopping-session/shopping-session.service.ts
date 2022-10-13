import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingSession } from '../../models/shopping-session/shopping-session';

@Injectable({
  providedIn: 'root'
})
export class ShoppingSessionService {

  constructor(private http: HttpClient) { }
  getShoppingSessions(): Observable<ShoppingSession[]> {
    return this.http.get<ShoppingSession[]>(`http://localhost:59104/api/ShoppingSessions`);
  }
  getShoppingSessionById(id: number): Observable<ShoppingSession> {
    return this.http.get<ShoppingSession>(`http://localhost:59104/api/ShoppingSessions/${id}`);
  }
  deleteShoppingSession(id: number): Observable<any> {
    return this.http.delete<ShoppingSession>(`http://localhost:59104/api/ShoppingSessions/${id}`)
  }
  insertShoppingSession(data: ShoppingSession): Observable<ShoppingSession> {
    return this.http.post<ShoppingSession>(`http://localhost:59104/api/ShoppingSessions`, data);
  }
  updateShoppingSession(data: ShoppingSession): Observable<any> {
    return this.http.put(`http://localhost:59104/api/ShoppingSessions/${data.id}`, data);
  }
}
