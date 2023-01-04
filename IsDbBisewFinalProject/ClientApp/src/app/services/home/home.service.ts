import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../models/brand/brand';
import { Home } from '../../models/home/home';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  
  getHomeData(): Observable<Home[]> {
    return this.http.get<Home[]>(`http://localhost:59104/api/Home`);
  }
  
}
