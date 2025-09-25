import { Routes } from '@angular/router';
import { Admin } from './components/admin/admin';
import { UserItems } from './components/user-items/user-items'; 

export const routes: Routes = [
    {
        path: 'admin',
        component: Admin
    },
    {
        path: 'user-items',
        component: UserItems
    }];
