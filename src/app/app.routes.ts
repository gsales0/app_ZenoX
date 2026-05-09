import { Routes } from '@angular/router';
import { Login } from './session/login/login';
import { Menu } from './session/menu/menu';
import { Dashboard } from './session/dashboard/dashboard';
import { Engine } from './session/engine/engine';
import { Pessoas } from './cadastro/pessoas/pessoas';

export const routes: Routes = [
    {path: ':alias', component: Login},
    {path: ':alias', component: Menu, children: [
        {path: 'dashboard', component: Dashboard},
        {path: 'engine', component: Pessoas}
    ]}
];
