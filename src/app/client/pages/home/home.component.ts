import { Component, inject, signal } from '@angular/core';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import { VehicleService } from 'app/core/services/vehicle.service';
import Modules from 'app/shared/modules';
import { Subscription } from 'rxjs';
import { SliderComponent } from 'app/shared/components';
import { UtilsService } from 'app/shared/utils/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [Modules, SliderComponent],
})
export default class HomeComponent {
  allSubs: Subscription[] = [];
  listVehicles: IVehicle[] = [];
  paginator = { currentPage: 0, pageSize: 0, totalPage: 1 }
  search: string = "";
  
  private _vehicleService = inject(VehicleService);
  private _utilsService = inject(UtilsService);

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

  showDetail(vehicle: IVehicle) {
    console.log(vehicle);
    this._utilsService.routerLink(`client/detail/${vehicle.id}`)
  }

  searchChange() {
    if(this.search == '') {
      this.getAllVehicles();

    } else {
      const queryParams = {
        search: this.search,
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
  }

}
