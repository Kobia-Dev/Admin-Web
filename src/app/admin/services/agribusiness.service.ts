import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AgribusinessService {
  deactivateAgribusiness(id: any, accessToken: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  public getBusiness(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/v1/type/of/business/get/all`);
  }

  public registerAgribusiness(data: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/v1/auth/register`, data);
  }

  public updateAgribusiness(userId: any, updAgri: any, access: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access}`);
    return this.http.put<any>(`${environment.baseUrl}/api/v1/agriBusiness/update/by/userId/${userId}`, updAgri, { headers: headers })
  }

  public getAllAgribusiness(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/v1/agriBusiness/get/all`)
  }

  public deleteAgribusiness(agriBusinessId: any, accessToken: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<any>(`${environment.baseUrl}/api/v1/agriBusiness/delete/${agriBusinessId}`, { headers: headers })
  }
  public getLocationDetails(params: HttpParams): Observable<any>{
    return this.http.get<any>(`https://api.geocode.earth/v1/reverse`, { params:params });
  }
}
