import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ValuechainService {

  constructor(private httpClient: HttpClient) { }

  public addValueChain(valuechainData: any, access: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access}`)
    return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/value/chain/new`, valuechainData, { headers: headers });
  }
  public getValueChain(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/value/chain/get/all`);
  }
}
