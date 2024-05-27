import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import Modules from 'app/shared/modules';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-card-vehicles',
  templateUrl: './card-vehicles.component.html',
  styleUrl: './card-vehicles.component.scss',
  standalone: true,
  imports: [Modules],
})
export class CardVehiclesComponent implements OnInit {
  @Input({ required: true }) vehicle!: IVehicle;
  paths: string[] = [];
  position: number = 0;

  @Output() detailEvent = new EventEmitter<IVehicle>(undefined);

  ngOnInit(): void {
    console.log("this.vehicle", this.vehicle);
    this.paths = this.vehicle.image.split(',').map((image: string) => `${environment.API_URL_PUBLIC}/${image}`);
  }

  previous() {
    this.position -= 1;
  }

  forward() {
    this.position += 1;
  }

  Ondetail() {
    this.detailEvent.emit(this.vehicle);
  }
}
