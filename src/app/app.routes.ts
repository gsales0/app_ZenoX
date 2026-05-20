import { Routes } from '@angular/router';
import { Login } from './session/login/login';
import { Menu } from './session/menu/menu';
import { Dashboard } from './session/dashboard/dashboard';
import { menuEngine } from './session/menu/menu.config';

const dinamicRoutes: Routes = []

menuEngine.forEach(f => {
    f.itens.forEach(i => {
        dinamicRoutes.push({ path: f.route + '/' + i.route, component: i.component })
    })
})

export const routes: Routes = [
    {path: ':alias', component: Login},
    {path: ':alias', component: Menu, children: [
        {path: 'dashboard', component: Dashboard},
        ...dinamicRoutes
    ]}
];
