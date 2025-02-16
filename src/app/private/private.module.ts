import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import { PrivateRoutingModule } from './private-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { BillingComponent } from './components/billing/billing.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';


@NgModule({
  declarations: [
    UserDashboardComponent,
    AddProductsComponent,
    BillingComponent,
    UserNavbarComponent,
    LayoutComponent,
    UserSettingsComponent,
    UserHistoryComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatTableModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class PrivateModule { }
