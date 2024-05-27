import { Routes } from '@angular/router';
import { NoAuthGuard } from 'app/core/guards/no-auth.guard';
import { AuthGuard } from 'app/core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(r => r.routes),
        canActivate: [NoAuthGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes').then(r => r.routes),
        canActivate: [AuthGuard]
    },
    {
        path: 'client',
        loadChildren: () => import('./client/client.routes').then(r => r.routes),
    },
    {
        path: '',
        redirectTo: 'client',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'client',
        pathMatch: 'full'
    },
];
