import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private _http = inject(HttpClient);
  constructor() { }

  async uploadFile(files: File[]): Promise<string> {
    const response = Array.from(files).map(async (file, index) => {
      let formData = new FormData();
      formData.append('file', file);
      const response$ = this._http.post(`${environment.API_URL}/Upload`, formData);
      const data: any = await firstValueFrom(response$);
      return data.data;
    })

    return (await Promise.all(response)).join(",");
  }

  deleteFile(nameFile: string) {
    return this._http.delete(`${environment.API_URL}/Upload/${nameFile}`);
  }
}
