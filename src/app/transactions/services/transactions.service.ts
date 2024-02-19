import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient: HttpClient) { }

  public getUser(userId: any, access_token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access_token}`);
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/user/get/by/id${userId}`, { headers: headers });
  }

  public getAllTransactions(access_token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access_token}`);
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/transactions/fetch/all`, { headers: headers });
  }

  public getOrderById(orderId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/orders/get/by/orderId/${orderId}`);
  }

  public completeTransaction(orderId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/transactions/enter/transaction/${orderId}`);
  }
}