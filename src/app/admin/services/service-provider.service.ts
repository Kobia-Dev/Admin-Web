import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  constructor(private http: HttpClient) { }

  public getAllServices(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/v1/type/of/service/get/all`);
  }

  public getExpertise(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/v1/serviceProvider/expertise/get/all`);
  }

  public registerServiceProvider(serviceProvider: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/v1/auth/register`, serviceProvider);
  }

  public updServiceProvider(userId: any, serviceUpdate: any, access_token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access_token}`);
    return this.http.put<any>(`${environment.baseUrl}/api/v1/serviceProvider/update/by/userId/${userId}`, serviceUpdate, { headers: headers });
  }

  public getAllServiceProviders(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/v1/serviceProvider/get/all`)
  }
}