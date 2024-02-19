import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TransactionsDriverService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.baseUrl}/api/v1/transactions/fetch/all`;

  fetchData(
    region?: any,
    county?: any,
    year?: any,
    month?: any
  ): Observable<any> {
    // Define headers (e.g., for authorization)
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer YOUR_ACCESS_TOKEN_HERE`
    );

    let params = new HttpParams();
    if (region) {
      params = params.set('region', region);
    }
    if (county) {
      params = params.set('county', county);
    }
    if (year) {
      params = params.set('year', year);
    }
    if (month) {
      params = params.set('month', month);
    }

    // Make the HTTP GET request with headers and query parameters
    return this.http.get<any>(this.apiUrl, { headers, params });
  }
  public getAllTransactions(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/api/v1/transactions/fetch/all`)
  }

  public getLocationDetails(params: HttpParams): Observable<any>{
    return this.http.get<any>(`https://api.geocode.earth/v1/reverse`, { params:params });
  }
}
