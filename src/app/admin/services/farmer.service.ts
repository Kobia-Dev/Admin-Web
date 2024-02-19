import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  private apiServiceUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public addFarmer(farmer: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/api/v1/auth/register`, farmer);
  }
  public updFarmer(userId: any, farmer: any, access_token: any): Observable<any> {
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${access_token}`);
    return this.http.put<any>(`${environment.baseUrl}/api/v1/farmers/update/by/UserId${userId}`, farmer, { headers: headers });
  }
  public getAllFarmers(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/v1/farmers/get/all`)
  }

  public getLocationDetails(params: HttpParams): Observable<any>{
    return this.http.get<any>(`https://api.geocode.earth/v1/reverse`, { params:params });
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Ooops! ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
} 
