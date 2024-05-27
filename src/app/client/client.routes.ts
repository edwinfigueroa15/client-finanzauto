import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./client.component"),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/home/home.component'),
            },
            {
                path: 'detail/:id',
                loadComponent: () => import('./pages/detail/detail.component'),
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
