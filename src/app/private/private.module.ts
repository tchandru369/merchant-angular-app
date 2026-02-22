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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustDashboardComponent } from './components/cust-dashboard/cust-dashboard.component';
import { CustPlaceOrderComponent } from './components/cust-place-order/cust-place-order.component';
import { CustHistoryComponent } from './components/cust-history/cust-history.component';
import { CustSettingsComponent } from './components/cust-settings/cust-settings.component';
import { CustOrderReqComponent } from './components/cust-order-req/cust-order-req.component';
import { CustRequestStatusComponent } from './components/cust-request-status/cust-request-status.component';
import { CustRequestDetailsCardComponent } from './components/cust-request-details-card/cust-request-details-card.component';
import { UserCustomerOverviewComponent } from './components/user-customer-overview/user-customer-overview.component';
import { CustCardSliderComponent } from './components/cust-card-slider/cust-card-slider.component';
import { CustOverviewDetailsComponent } from './components/cust-overview-details/cust-overview-details.component';
import { MatSortModule } from '@angular/material/sort';
import { QRCodeModule } from 'angularx-qrcode';
import { CustMakePaymentComponent } from './components/cust-make-payment/cust-make-payment.component';
import { CustOrderPaymentListComponent } from './components/cust-order-payment-list/cust-order-payment-list.component';
import { QrDialogComponent } from './components/qr-dialog/qr-dialog.component';
import { CustVerifyPymntListComponent } from './components/cust-verify-pymnt-list/cust-verify-pymnt-list.component';
import { MessageDialogComponent } from './components/Dialogs/message-dialog/message-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CustOrderDetailsDialogComponent } from './components/Dialogs/cust-order-details-dialog/cust-order-details-dialog.component';
import { NgChartsModule } from 'ng2-charts';
import { CustGraphComponent } from './components/Graphs/cust-graph/cust-graph.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MaskUpiPipe } from './pipes/mask-upi.pipe';

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
    ProcOrdersComponent,
    CustDashboardComponent,
    CustPlaceOrderComponent,
    CustHistoryComponent,
    CustSettingsComponent,
    CustOrderReqComponent,
    CustRequestStatusComponent,
    CustRequestDetailsCardComponent,
    UserCustomerOverviewComponent,
    CustCardSliderComponent,
    CustOverviewDetailsComponent,
    CustMakePaymentComponent,
    CustOrderPaymentListComponent,
    QrDialogComponent,
    CustVerifyPymntListComponent,
    MessageDialogComponent,
    CustOrderDetailsDialogComponent,
    CustGraphComponent,
    MaskUpiPipe,
    
  ],
  imports: [
    MatBadgeModule,
    
    CommonModule,
    NgChartsModule,
    PrivateRoutingModule,
    QRCodeModule,
    MatCardModule,
    MatSortModule,
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
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ]
})
export class PrivateModule { }
