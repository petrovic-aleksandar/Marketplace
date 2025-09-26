import { Routes } from '@angular/router';
import { Admin } from './components/admin/admin';
import { UserItems } from './components/user-items/user-items'; 
import { UserSettings } from './components/user-settings/user-settings';
import { ItemTypes } from './components/item-types/item-types';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Homepage } from './components/homepage/homepage';
import { ItemsByType } from './components/items-by-type/items-by-type';

export const routes: Routes = [
    {
        path: 'homepage',
        component: Homepage
    },
    {
        path: 'admin',
        component: Admin
    },
    {
        path: 'user-items',
        component: UserItems
    },
    {
        path: 'user-settings',
        component: UserSettings
    },
    {
        path: 'item-types',
        component: ItemTypes
    },
    {
        path: 'items-by-type',
        component: ItemsByType
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    }];
