import { Component, Input, OnInit, inject, input } from '@angular/core';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import { AuthService } from 'app/core/services/auth.service';
import { UploadService } from 'app/core/services/upload.service';
import { VehicleService } from 'app/core/services/vehicle.service';
import Modules from 'app/shared/modules';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone: true,
  imports: [Modules],
})
export class DetailComponent implements OnInit {
  @Input() infoModal: IVehicle | null = null;
  API_PUBLIC = environment.API_URL_PUBLIC;
  nameImages: string[]  = [];

  private _vehicleService = inject(VehicleService);
  private _uploadService = inject(UploadService);
  private _authService = inject(AuthService);

  ngOnInit(): void {
    this.nameImages = this.infoModal!.image.split(",");
  }

  closeModal() {
    this._vehicleService.showModalDetailVeihcles.update(() => false);
  }

}
