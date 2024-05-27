import { Component, inject, signal } from '@angular/core';
import { IVehicle } from 'app/core/interfaces/vehicle.interface';
import { VehicleService } from 'app/core/services/vehicle.service';
import Modules from 'app/shared/modules';
import { Subscription } from 'rxjs';
import { SliderComponent } from 'app/shared/components';
import { UtilsService } from 'app/shared/utils/utils.service';
import { Menu } from 'app/core/interfaces/components.interface';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  standalone: true,
  imports: [Modules],
})
export default class ClientComponent {
  showMenu = signal<boolean>(false);
  pages: Menu[] = [
    { title: 'Catálogo', url: '/client/home', icon: '' },
    { title: 'Administrador', url: '/admin', icon: '' },
  ]
  
  ngOnInit() {}

  eventMenu() {
    this.showMenu.update(value => !value);
  }

  closeMenu() {
    this.showMenu.update(value => false);
  }

}
