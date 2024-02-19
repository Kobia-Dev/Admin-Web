import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MarketPlaceService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}`)
  }

  public getProductCategories(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/productCategories/get/all`);
  }

  public getTypeOfProducts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/typeOfProducts/get/all`);
  }

  public addProductCategory(data: any, access_token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access_token}`);
    return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/productCategories/add`, data, { headers: headers });
  }

  public addProductType(data: any, access_token: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${access_token}`);
    return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/typeOfProducts/add`, data, { headers: headers })
  }

  public getFarmerPoducts(params?: HttpParams): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/farmProducts/get/all`, { params:params });
  }

  public getFarmProduct(param: any): Observable<any>{
    let API_URL = `${environment.baseUrl}/api/v1/farmProducts/get/all`;

    return this.httpClient.get(API_URL,{params: param}).pipe(map(
      (res: any)=>{
        return res || {}
      }
    ))
  }

  public deleteProductCategory(productCategoryId: any, accessToken: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.delete<any>(`${environment.baseUrl}/api/v1/productCategories/delete/${productCategoryId}`, { headers: headers })
  }

  public deleteProductType(typeOfProductId: any, accessToken: any): Observable<any>{
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.delete<any>(`${environment.baseUrl}/api/v1/typeOfProducts/delete/${typeOfProductId}`, { headers: headers })
  }
}
