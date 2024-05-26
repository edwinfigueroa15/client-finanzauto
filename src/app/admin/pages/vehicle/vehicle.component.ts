import { Component, OnInit, inject } from '@angular/core';
import Modules from 'app/shared/modules';
import { BreadCrumbsComponent, TableComponent } from 'app/shared/components';
import { VehicleService } from 'app/core/services/vehicle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
  standalone: true,
  imports: [Modules, BreadCrumbsComponent, TableComponent],
})
export default class HotelComponent implements OnInit {
  allSubs: Subscription[] = [];
  
  showActionsTable = { edit: true, delete: true };
  nameHeaderColumns: string[] = ['Nombre', 'Placa', 'Estado'];
  keyBodyData: string[] = ['name', 'plate', 'status'];
  dataBodyTable: any[] = [];
  showPaginator: boolean = true;

  private _vehicleService = inject(VehicleService)

  ngOnInit(): void {
    this.getAll();
  }

  ngOnDestroy() {
		this.allSubs.forEach(sub => sub.unsubscribe());
	}

  getAll() {
    this.allSubs[this.allSubs.length] = this._vehicleService.getAll().subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error.error);
      }
    })
  }

  editEvent(evetn: any) {
    console.log(evetn);
  }

  deleteEvent(evetn: any) {
    console.log(evetn);
  }
  
}
