import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth } from "../models/auth";
import { environment } from "src/environments/environment.prod";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: "root",
})
// /auth/signin
export class AuthService {
  constructor(private http: HttpClient) { }

  public login(user: any): Observable<Auth>{
    return this.http.post<Auth>(`${environment.baseUrl}/api/v1/auth/authenticate`, user, httpOptions);
  }

  public register(user: any): Observable<{ message: string }> {
    const registerUrl = `${environment.baseUrl}/p2p/auth/signup`;

    return this.http.post<{ message: string }>(registerUrl, user)
  }

  onboardUser(user): Observable<{ message: string }> {
    const onboardUserUrl = `${environment.baseUrl}/p2p/otherusers/signup`;

    return this.http.post<{ message: string }>(onboardUserUrl, user)
  }

  resetPassword(params: any): Observable<{ message: string }> {
    const resetPasswordUrl = `${environment.baseUrl}/p2p/reset/change-password`;

    return this.http.post<{ message: string }>(
      resetPasswordUrl,
      params
    );
  }

  forgotPassword(params: any): Observable<{ message: string }> {
    const resetPasswordUrl = `${environment.baseUrl}/p2p/reset/send-token`;

    return this.http.post<{ message: string }>(resetPasswordUrl, params);
  }
}