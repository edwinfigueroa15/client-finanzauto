import { Component, inject, signal } from '@angular/core';
import Modules from 'app/shared/modules';
import { Menu } from 'app/core/interfaces/menu.interface';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  standalone: true,
  imports: [Modules],
})
export default class AdminComponent {
  showMenu = signal(false);
  currentPath: string = '';
  pages: Menu[] = [
    { title: 'Vehículos', url: '/admin/vehicle', icon: 'assets/icons/car.png' },
  ]

  private _authService = inject(AuthService);
  private _router = inject(Router);

  async ngOnInit() {
    this.currentPath = this._router.url;
    this._router.events.subscribe((event: any) => {
      if (event?.url) this.currentPath = event?.url;
    })
  }

  changeShowMenu() {
    this.showMenu.update(value => !value);
  }

  closeMenu() {
    this.showMenu.update(value => false);
  }

  logout() {
    this._authService.logout()
  }

}
