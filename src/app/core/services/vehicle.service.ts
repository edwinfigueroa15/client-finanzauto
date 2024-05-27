import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthService } from 'app/core/services/auth.service';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  showModalAddUpdateVeihcles = signal(false);
  showModalDetailVeihcles = signal(false);

  private _http = inject(HttpClient);
  private _authService = inject(AuthService);
  constructor() { }

  getAll(queryParams?: any) {
    return this._http.get(`${environment.API_URL}/Vehicle/${this._authService.user().id}/all?search=${queryParams?.search || ''}&pageIndex=${queryParams?.pageIndex || 0}&pageSize=${queryParams?.pageSize || 0}`);
  }

  create(body: IVehicle) {
    return this._http.post(`${environment.API_URL}/Vehicle`, body);
  }

  update(id: number, body: IVehicle) {
    return this._http.put(`${environment.API_URL}/Vehicle/${this._authService.user().id}/${id}`, body);
  }

  delete(id: number) {
    return this._http.delete(`${environment.API_URL}/Vehicle/${this._authService.user().id}/${id}`);
  }

}
