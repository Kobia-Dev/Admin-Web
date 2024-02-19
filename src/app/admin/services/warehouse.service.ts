import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(
    private httpClient: HttpClient) { }

  public addWarehouse(warehouseReg: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/auth/register`, warehouseReg);
  }

  public updWarehouse(userId: any, warehouseData: any, access_token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access_token}`);
    return this.httpClient.put<any>(`${environment.baseUrl}/api/v1/warehouses/update/by/userId/${userId}`, warehouseData, { headers: headers });
  }
  public getAllWarehouses(): Observable<any>{
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/warehouses/get/all`);
  }
}
