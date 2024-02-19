import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProcessorsService {

  constructor(
    private http: HttpClient) { }

    public getAllProcesors(): Observable<any>{
      return this.http.get<any>(`${environment.baseUrl}`);
    }
}
