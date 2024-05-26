import short from 'short-uuid';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private _http = inject(HttpClient);
  private _authService = inject(AuthService);
  constructor() { }

  getAll() {
    return this._http.get(`${environment.API_URL}/Vehicle/${this._authService.user().id}/all`);
  }

}
