import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { BillingComponent } from './components/billing/billing.component';
import { LayoutComponent } from './layout/layout.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { CustDashboardComponent } from './components/cust-dashboard/cust-dashboard.component';
import { OwnerGuard } from '../guards/owner.guard';
import { CustGuard } from '../guards/cust.guard';
import { CustHistoryComponent } from './components/cust-history/cust-history.component';
import { CustPlaceOrderComponent } from './components/cust-place-order/cust-place-order.component';
import { CustSettingsComponent } from './components/cust-settings/cust-settings.component';

const routes: Routes = [
  
  // {
  //   path:'user-dashboard',component:UserDashboardComponent,canActivate:[AuthGuard]
  // },
  // {
  //   path:'add-products',component:AddProductsComponent,canActivate:[AuthGuard]
  // },
  // {
  //   path:'billing',component:BillingComponent,canActivate:[AuthGuard]
  // },
  {
  path: '',
  component: LayoutComponent,  // Use LayoutComponent as a wrapper
  children: [
    { path: 'user-dashboard',component:UserDashboardComponent,canActivate:[AuthGuard,OwnerGuard]},
    { path: 'add-products',component:AddProductsComponent,canActivate:[AuthGuard,OwnerGuard]},
    { path: 'billing',component:BillingComponent,canActivate:[AuthGuard,OwnerGuard]},
    { path: 'user-settings',component:UserSettingsComponent,canActivate:[AuthGuard,OwnerGuard]},
    { path: 'user-history',component:UserHistoryComponent,canActivate:[AuthGuard,OwnerGuard]},
    { path: 'my-requests',component:MyRequestsComponent,canActivate:[AuthGuard,OwnerGuard]},
    { path: 'cust-dashboard',component:CustDashboardComponent,canActivate:[AuthGuard,CustGuard]},
    { path: 'cust-history',component:CustHistoryComponent,canActivate:[AuthGuard,CustGuard]},
    { path: 'cust-place-order',component:CustPlaceOrderComponent,canActivate:[AuthGuard,CustGuard]},
    { path: 'cust-settings',component:CustSettingsComponent,canActivate:[AuthGuard,CustGuard]}
  // Add more routes for the private module
  ]
},
  {
    path:'**',
    redirectTo:'app-layout',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
