import { Routes } from '@angular/router';
import { Login } from './session/login/login';
import { Menu } from './session/menu/menu';
import { Dashboard } from './session/dashboard/dashboard';
import { Pessoas } from './cadastro/pessoas';
import { Produtos } from './cadastro/produtos';
import { Contratos } from './cadastro/contratos';
import { Financeiro } from './movimento/financeiro';

export const routes: Routes = [
    {path: ':alias', component: Login},
    {path: ':alias', component: Menu, children: [
        {path: 'dashboard', component: Dashboard},
        {path: 'pessoas', component: Pessoas},
        {path: 'produtos', component: Produtos},
        {path: 'contratos', component: Contratos},
        {path: 'financeiro', component: Financeiro}
    ]}
];
