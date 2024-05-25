import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(r => r.routes),
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(r => r.routes),
    },
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
];
