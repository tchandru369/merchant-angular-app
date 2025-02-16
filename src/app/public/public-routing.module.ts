import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

const routes: Routes = [
  {
    path:'app-user-login',
    component:UserLoginComponent
  },
  {
    path:'app-user-register',
    component:UserRegisterComponent
  },
  {
    path:'**',
    redirectTo:'app-user-login',
    pathMatch:'full'  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
