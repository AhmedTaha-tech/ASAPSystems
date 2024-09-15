import { RouterModule, Routes } from '@angular/router';
import { authinticationGuard } from './core/guards/authentication.guard';
import { DashboardComponent } from './core/pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './core/pages/login/login.component';
import { ItemComponent } from './core/pages/item/item.component';
import { TransactionComponent } from './core/pages/transaction/transaction.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate: [authinticationGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'item', component: ItemComponent, canActivate: [authinticationGuard]},
    {path: 'transaction', component: TransactionComponent, canActivate: [authinticationGuard]}
];
  @NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: false })],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }