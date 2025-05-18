import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { MatDatepickerModule } from  '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReqOrdersComponent } from './components/req-orders/req-orders.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { EditRequestDialogComponent } from './components/edit-request-dialog/edit-request-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProcOrdersComponent } from './components/proc-orders/proc-orders.component';

@NgModule({
  providers: [DatePipe],
  declarations: [
    UserDashboardComponent,
    AddProductsComponent,
    BillingComponent,
    UserNavbarComponent,
    LayoutComponent,
    UserSettingsComponent,
    UserHistoryComponent,
    ReqOrdersComponent,
    MyRequestsComponent,
    EditRequestDialogComponent,
    ProcOrdersComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    MatToolbarModule,
    MatExpansionModule,
    MatDialogModule
  ]
})
export class PrivateModule { }
