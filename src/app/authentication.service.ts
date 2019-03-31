import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

export interface ForgotTokenPayload {
email:string
}

interface TokenResponse {
  token: string;
}
export interface RegisterTokenPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}
export interface LoginTokenPayload {
  email: string;
  password: string;
  
}
export interface ResetTokenPayload {
  newPassword: string;
  confirmPassword: string;
  email:string;
  
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  public register(user: RegisterTokenPayload): Observable<any> {

    let base;
    base = this.http.post(`/api/register`, user);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;

  }

  public forgotPassword(data: ForgotTokenPayload): Observable<any> {

   
   return this.http.post(`/api/forgot_password`, data);
  
  

  }


  public getTokenData(user: ForgotTokenPayload): Observable<any> {

    let base;
    base = this.http.post(`/api/getToken`, user);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;

  }

  public resetPassword(data: ResetTokenPayload): Observable<any> {
    let base;
    base = this.http.post(`/api/reset_password`, data);
    const request = base.pipe(
      map((output: TokenResponse) => {
        if (output.token) {
          this.saveToken(output.token);
        }
        return data;
      })
    );

    return request;
 

   }
  public login(user: LoginTokenPayload): Observable<any> {
    let base;
    base = this.http.post(`/api/login`, user);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public profile(): Observable<any> {
    let base;
    base = this.http.get(`/api/profile`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}