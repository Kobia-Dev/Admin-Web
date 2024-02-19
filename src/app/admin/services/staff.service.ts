import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public registerStaff(staffReg: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/auth/register`, staffReg);
  }
  public updateStaff(userId: any, staffUpdate: any, accessToken: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.put<any>(`${environment.baseUrl}/api/v1/staff/update/by/userId/${userId}`, staffUpdate, { headers: headers });
  }
  public getAllStaff(): Observable<any>{
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/serviceProvider/get/all`);
  }
}
