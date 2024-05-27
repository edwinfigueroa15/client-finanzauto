import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ISale } from 'app/core/interfaces/sale.interface';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  showModalBuy = signal(false);

  private _http = inject(HttpClient);
  constructor() { }

  create(body: ISale) {
    return this._http.post(`${environment.API_URL}/Sale`, body);
  }
}
