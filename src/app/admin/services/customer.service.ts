import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private httpClient: HttpClient) { }

  public addCustomer(customerReg: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/auth/register`, customerReg);
  }

  public updCustomer(userId: any, customerData: any, access_token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access_token}`);
    return this.httpClient.put<any>(`${environment.baseUrl}/api/v1/customer/update/${userId}`, customerData, { headers: headers });
  }

  public getAllCustomers(): Observable<any>{
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/customer/get/all`)
  }
}