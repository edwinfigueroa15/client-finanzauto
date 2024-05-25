import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./admin.component"),
        children: [
            {
                path: 'vehicle',
                loadComponent: () => import('./pages/vehicle/vehicle.component'),
            },
            {
                path: '',
                redirectTo: 'vehicle',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'vehicle',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
