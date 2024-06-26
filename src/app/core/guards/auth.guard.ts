import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UtilsService } from 'app/shared/utils/utils.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	private _utilsService = inject(UtilsService)

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
		const user = localStorage.getItem('client_token');
		if (user) {
			return true;
		} else {
			this._utilsService.routerLink('/auth')
			return false;
		}
	}
}
