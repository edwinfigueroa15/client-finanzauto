import { Component } from '@angular/core';
import Modules from 'app/shared/modules';
import { BreadCrumbsComponent, TableComponent } from 'app/shared/components';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss',
  standalone: true,
  imports: [Modules, BreadCrumbsComponent, TableComponent],
})
export default class HotelComponent {

  showActionsTable = { edit: true, delete: true };
  nameHeaderColumns: string[] = ['Nombre', 'Placa', 'Estado'];
  keyBodyData: string[] = ['name', 'plate', 'status'];
  dataBodyTable: any[] = [
    {id: 1, name: "Logan", plate: "SDF435", status: true },
    {id: 2, name: "Aveo", plate: "BHJ765", status: false },
    {id: 3, name: "Mazda", plate: "GHY678m", status: true },
  ];
  showPaginator: boolean = true;

  editEvent(evetn: any) {
    console.log(evetn);
  }

  deleteEvent(evetn: any) {
    console.log(evetn);
  }
  
}
