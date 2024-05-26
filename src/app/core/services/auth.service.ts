import { Injectable, inject, signal } from '@angular/core';
import { UtilsService } from 'app/shared/utils/utils.service';
import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

interface ILogin {
  email: string;
  password: string;
}

interface ISignUp {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = signal<any>(null);
  client_token = signal<string | null>(null);

  private _utilsService = inject(UtilsService);
  private _http = inject(HttpClient);
  constructor() {
    const token = localStorage.getItem('client_token') || null;
    if(token) this.decodeJwt(token);
  }

  login(data: ILogin) {
    return this._http.post(`${environment.API_URL}/Client/login`, data);
  }

  signUp(data: ISignUp) {
    return this._http.post(`${environment.API_URL}/Client/sign-up`, data)
  }

  decodeJwt(token: string) {
    const decode: any = jwtDecode(token);
    this.client_token.update(() => token);
    this.user.update(() => ({ id: decode.id, email: decode.email }));
  }

  logout() {
    localStorage.removeItem('client_token');
    this._utilsService.routerLink('/auth/login');
  }

}
