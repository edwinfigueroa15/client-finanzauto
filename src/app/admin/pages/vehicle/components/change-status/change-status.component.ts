import { Component, EventEmitter, Input, OnInit, Output, inject, input, signal } from '@angular/core';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import { AuthService } from 'app/core/services/auth.service';
import { UploadService } from 'app/core/services/upload.service';
import { VehicleService } from 'app/core/services/vehicle.service';
import Modules from 'app/shared/modules';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrl: './change-status.component.scss',
  standalone: true,
  imports: [Modules],
})
export class ChangeStatusComponent implements OnInit {
  allSubs: Subscription[] = [];
  @Input() infoModal: IVehicle | null = null;
  @Output() responseEvent = new EventEmitter<any>(undefined);

  stepStatus = signal<number>(1);
  status = signal<string>('Disponible');

  private _vehicleService = inject(VehicleService);
  private _uploadService = inject(UploadService);
  private _authService = inject(AuthService);

  ngOnInit(): void {
    if(this.infoModal) {
      this.bgStatus(this.infoModal?.salesStatus)
    }
  }

  ngOnDestroy() {
		this.allSubs.forEach(sub => sub.unsubscribe());
	}

  closeModal() {
    this._vehicleService.showModalChangeStatus.update(() => false);
  }

  bgStatus(status: string) {
    switch (status) {
      case "Disponible":
        this.stepStatus.update(() => 1);
        break

      case "Reparacion":
        this.stepStatus.update(() => 2);
        break

      case "En vitrina":
        this.stepStatus.update(() => 3);
        break

      case "Vendido":
        this.stepStatus.update(() => 4);
        break
    }
  }

  selectStatus(status: string) {
    if(this.infoModal?.salesStatus == "Vendido") return;
    this.status.update(() => status);
    this.bgStatus(status)
  }

  saveStatus() {
    this.infoModal = { ...this.infoModal, salesStatus: this.status() } as IVehicle;
    
    this.allSubs[this.allSubs.length] = this._vehicleService.update(this.infoModal?.id!, this.infoModal).subscribe({
      next: (response) => {
        this.responseEvent.emit(response);
        this._vehicleService.showModalChangeStatus.update(() => false);
      },
      error: (error) => {
        this.responseEvent.emit(error.error);
      }
    })
  }

}
