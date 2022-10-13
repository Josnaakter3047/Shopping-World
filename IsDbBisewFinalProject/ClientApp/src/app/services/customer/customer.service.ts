import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`http://localhost:59104/api/Customers`);
  }
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`http://localhost:59104/api/Customers/${id}`);
  }
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<Customer>(`http://localhost:59104/api/Customers/${id}`)
  }
  insertCustomer(data: Customer): Observable<Customer> {
    return this.http.post<Customer>(`http://localhost:59104/api/Customers`, data);
  }
  updateCustomer(data: Customer): Observable<any> {
    return this.http.put(`http://localhost:59104/api/Customers/${data.id}`, data);
  }
}
