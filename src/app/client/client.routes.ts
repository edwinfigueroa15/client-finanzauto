import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component'),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },
];
