import { Component, inject, signal } from '@angular/core';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import { VehicleService } from 'app/core/services/vehicle.service';
import Modules from 'app/shared/modules';
import { Subscription } from 'rxjs';
import { SliderComponent } from 'app/shared/components';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'app/shared/utils/utils.service';
import { SaleService } from 'app/core/services/sale.service';
import { BuyVehicleComponent } from './components/buy-vehicle/buy-vehicle.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  standalone: true,
  imports: [Modules, SliderComponent, BuyVehicleComponent],
})
export default class DetailComponent {
  isLoading = signal<boolean>(true)
  allSubs: Subscription[] = [];
  id: number = 0;
  vehicle!: IVehicle;
  
  private _vehicleService = inject(VehicleService);
  private _utilsService = inject(UtilsService);
  protected _saleService = inject(SaleService);
  private _activatedRoute = inject(ActivatedRoute);
  constructor() {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if(id) this.id = Number(id);
    else this.id = 0;
  }

  ngOnInit() {
    if(!isNaN(this.id)) {
      this.getVehicleById();
    } else {
      this._utilsService.routerLink('client/home');
    }
  }

  ngOnDestroy() {
		this.allSubs.forEach(sub => sub.unsubscribe());
	}

  getVehicleById() {
    this.allSubs[this.allSubs.length] = this._vehicleService.getByIdForClient(this.id).subscribe({
      next: (response: any) => {
        this.vehicle = response.data;
        this.isLoading.update(() => false);
      },
      error: (error: any) => {
        console.log(error.error);
        this.isLoading.update(() => false);
      }
    })
  }

  buyVehicle() {
    this._saleService.showModalBuy.update(() => true);
  }

}
