import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import Modules from 'app/shared/modules';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [Modules],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input({ required: true }) images: string[] | string = [];
  paths = signal<string[]>([]);
  position = signal<number>(0);

  ngOnInit(): void {
    if(this.images instanceof Array) {
      const paths: string[] = this.images.map((image: string) => `${environment.API_URL_PUBLIC}/${image}`);
      this.paths.update(() => paths);

    } else {
      const paths: string[] = this.images.split(',').map((image: string) => `${environment.API_URL_PUBLIC}/${image}`);
      this.paths.update(() => paths);
    }
  }

  previous() {
    this.position.update(value => value-1);
  }

  forward() {
    this.position.update(value => value+1);
  }
}
