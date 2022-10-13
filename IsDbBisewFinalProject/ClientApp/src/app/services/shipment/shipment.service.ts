import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shipment } from '../../models/shipment/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {
  constructor(private http: HttpClient) { }
  getShipments(): Observable<Shipment[]> {
    return this.http.get<Shipment[]>(`http://localhost:59104/api/Shipments`);
  }
  getShipmentById(id: number): Observable<Shipment> {
    return this.http.get<Shipment>(`http://localhost:59104/api/Shipments/${id}`);
  }
  deleteShipment(id: number): Observable<any> {
    return this.http.delete<Shipment>(`http://localhost:59104/api/Shipments/${id}`)
  }
  insertShipment(data: Shipment): Observable<Shipment> {
    return this.http.post<Shipment>(`http://localhost:59104/api/Shipments`, data);
  }
  updateShipment(data: Shipment): Observable<any> {
    return this.http.put(`http://localhost:59104/api/Shipments/${data.id}`, data);
  }
}
