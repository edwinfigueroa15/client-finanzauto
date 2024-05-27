import { Component, inject } from '@angular/core';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import { VehicleService } from 'app/core/services/vehicle.service';
import Modules from 'app/shared/modules';
import { Subscription } from 'rxjs';
import { CardVehiclesComponent } from './components/card-vehicles/card-vehicles.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [Modules, CardVehiclesComponent],
})
export default class HomeComponent {
  allSubs: Subscription[] = [];
  listVehicles: IVehicle[] = [];
  paginator = { currentPage: 1, pageSize: 10, totalPage: 1 }
  private _vehicleService = inject(VehicleService);

  ngOnInit() {
    this.getAllVehicles();
  }

  ngOnDestroy() {
		this.allSubs.forEach(sub => sub.unsubscribe());
	}

  getAllVehicles() {
    const queryParams = {
      search: '',
      pageIndex: this.paginator.currentPage,
      pageSize: this.paginator.pageSize,
    }

    this.allSubs[this.allSubs.length] = this._vehicleService.getAllForClients(queryParams).subscribe({
      next: (response: any) => {
        this.paginator.totalPage = Math.ceil(response.length / this.paginator.pageSize);
        this.listVehicles = response.data;
      },
      error: (error: any) => {
        console.log(error.error);
      }
    })
  }

  detailEvent(event: IVehicle) {
    console.log(event);
  }

}
