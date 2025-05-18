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
    { path: 'user-dashboard',component:UserDashboardComponent,canActivate:[AuthGuard] },
    { path: 'add-products',component:AddProductsComponent,canActivate:[AuthGuard]},
    { path: 'billing',component:BillingComponent,canActivate:[AuthGuard]},
    { path: 'user-settings',component:UserSettingsComponent,canActivate:[AuthGuard]},
    { path: 'user-history',component:UserHistoryComponent,canActivate:[AuthGuard]},
    { path: 'my-requests',component:MyRequestsComponent,canActivate:[AuthGuard]}

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
