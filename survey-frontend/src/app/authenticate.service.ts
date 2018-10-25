import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/* import { Observable } from '../../node_modules/rxjs';
import { map } from '../../node_modules/rxjs/operators'; */
import { Router } from '@angular/router';

export interface UserDetails {
  _id: string;
  adhaar: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  password: string;
  userName?: string;
}

@Injectable()
export class AuthenticateService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
    //alert("Entered in saveToken(); Token : "+this.token)
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    //alert("Entered in getToken(); Token : "+this.token)
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
   // alert("Entered in getUserDetails(); Token : "+token)
   
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

  

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
