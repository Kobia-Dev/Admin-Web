import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  
  constructor(
    private httpClient: HttpClient) { }

  public registerManufacturer(manRegister: any): Observable<any>{
    return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/auth/register`, manRegister);
  }

  public updateManufacturer(userId: any, manUpdate: any, accessToken: any): Observable<any> {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.put<any>(`${environment.baseUrl}/api/v1/manufacturers/update/by/userId/${userId}`, manUpdate, { headers: headers });
  }

  public getManufacturingCategory(): Observable<any>{
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/manufacturing/category/get/all`);
  }

  public getManufacturingSubCategory(categoryId: any): Observable<any>{
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/manufacturing/sub/category/get/by/category/id/${categoryId}`);
  }

  public getAllManufacturers(): Observable<any>{
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/manufacturers/get/all)`)
  }
}