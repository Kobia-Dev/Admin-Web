import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) {
   }

  public registerDriver(driverDetails: any): Observable<any>{
    return this.http.post<any>(`${environment.baseUrl}/api/v1/auth/register`, driverDetails);
  }
  public getAllDrivers() : Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/v1/drivers/get/all`);
    const apiUrl = `${environment.baseUrl}/api/v1/drivers/get/all`;
    console.log('API URL:',apiUrl);
  return this.http.get<any>(apiUrl);
   }
   public getLineChartData(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/api/v1/drivers/get/all`);
    const apiUrl = `${environment.baseUrl}/api/v1/drivers/get/all`;
    console.log('API URL:',apiUrl);
  return this.http.get<any>(apiUrl);
  }

  // public updDriver(userId: any, driverData: any, access: any){
  //   return this.http.post<any>(`${environment.baseUrl}`)
  // }

  public getAlldrivers(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/v1/drivers/get/all`)
  }
  public deleteDriver(driverId: any, accessToken: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<any>(`${environment.baseUrl}/api/v1/drivers/delete/${driverId}`, { headers: headers })
  }
  public getLocationDetails(params: HttpParams): Observable<any>{
    return this.http.get<any>(`https://api.geocode.earth/v1/reverse`, { params:params });
  }

}