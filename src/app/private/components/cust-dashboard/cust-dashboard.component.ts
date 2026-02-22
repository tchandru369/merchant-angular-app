import { custTransaction } from './../../../models/custTransaction.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { ShopCustomer } from 'src/app/models/ShopCustomer.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CustOverAllStatusList } from 'src/app/models/custOverAllStatus.interface';
import { CustOrderDetailsDialogComponent } from '../Dialogs/cust-order-details-dialog/cust-order-details-dialog.component';
import { MonthlyProdPriceCount } from 'src/app/models/monthlyProdPrice.interface';
import { MatBadge } from '@angular/material/badge';
import { Color } from 'chart.js';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-cust-dashboard',
  templateUrl: './cust-dashboard.component.html',
  styleUrls: ['./cust-dashboard.component.css']
})
export class CustDashboardComponent implements OnInit {

  shopCustomer!: ShopCustomer;
  custEmail:string='';
  selectedMonCnt:string='';
  custTransaction!:custTransaction;
  monthlyPrdPrcCnt!:MonthlyProdPriceCount;
  cusTransList:custTransaction[]=[];
  monthlyProdPriceCount:MonthlyProdPriceCount[]=[];
  custOrderReqList:CustOverAllStatusList[] = [];
  displayCustOrderList=['orderCustCrtdDate','orderCustOwnerName','orderCustTotalPrice','orderList','orderReqStatus'];
  displayTranList=['billDate','paymentDate','totalPymtAmt','custPaidAmt','pymtAmountBal','pymtOverAllStatus'];
  dataSource = new MatTableDataSource<custTransaction>(this.cusTransList);
 dataSource2 = new MatTableDataSource<CustOverAllStatusList>(this.custOrderReqList);
   @ViewChild('paginator')paginator!: MatPaginator;
  @ViewChild('secondPaginator')paginator2!: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;
  }

   toggleDetails(item: any) {
    const dialogRef = this.dialog.open(CustOrderDetailsDialogComponent, {
      width: '400px',
      data: {
        orderCustOwnerName: item.orderCustOwnerName,
        orderList: item.orderList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    }); // Toggle the visibility
  }

  updateData(month: string) {
    this.selectedMonCnt = month;
    this.monthlyPrdPrcCnt = this.monthlyProdPriceCount.find(
      item => item.monthValue === month
    )!;
  }
    constructor(private billingService : BillingService, private router:Router,private snackbar:MatSnackBar,private dataPipe:DatePipe,private dialog: MatDialog) {
  
        this.shopCustomer = {
        custType: '',
        custPanNo: '',
        custEmailId: '',
        custOwnerRefId: '',
        custDob: '',
        custPinCode: '',
        custState: '',
        custCity: '',
        custAddress: '',
        custPhoneNo: '',
        custName: '',
        custGender: '',
        custCountry: '',
        shopCustRefId:''
      };
      this.custTransaction={
        custEmail:'',
        custName:'',
        custPaidAmt:0,
        ownerEmail:'',
        billDate:'',
        paymentDate:'',
        pymtOverAllStatus:'',
        pymtAmountBal:0,
        totalPymtAmt:0,
        fullPaymentFlg:''
      }
     }

  ngOnInit(): void {
    this.getCustomerDetailsByEmailPh();
    this.getCustLastTransaction();
    this.getCustOVerAllStatus();
    this.getCustMonthlyProdPriceCount();
  }

  getCustMonthlyProdPriceCount() {
    const custEmail = sessionStorage.getItem('ownerRefId');
    this.billingService
      .getCustMonthlyProdPriceCount(custEmail)
      .subscribe((data: any) => {
        this.monthlyProdPriceCount = data;
        console.log(this.monthlyProdPriceCount);
        this.updateData(this.monthlyProdPriceCount[0].monthValue);
      });
  }

   getCustomerDetailsByEmailPh() {
    const custEmail = sessionStorage.getItem('ownerRefId');
    this.billingService
      .getCustDtlsByPhEmail(custEmail)
      .subscribe((data: any) => {
        this.shopCustomer = data;
        console.log(this.shopCustomer);
        sessionStorage.setItem('ownerRefIdValue', this.shopCustomer.custOwnerRefId);
      });
  }

  getCustLastTransaction(){
    const custRefId = sessionStorage.getItem('ownerRefId');
    const ownerRefId = sessionStorage.getItem('ownerRefIdValue');
    this.billingService
      .getCustLastTransactionList(custRefId,ownerRefId)
      .subscribe((data: any) => {
        // this.cusTransList = data.map(item => ({
        // ...item,
        // showDetails: false // Initialize showDetails to false
        this.cusTransList = data;
        console.log("Transaction Overall List : ",data);
        this.dataSource.data = this.cusTransList;
      });
  }

  getCustOVerAllStatus(){
    const custRefId = sessionStorage.getItem('ownerRefId');
    const ownerRefId = sessionStorage.getItem('ownerRefIdValue');
    this.billingService
      .getCustOverAllStatus(custRefId,ownerRefId)
      .subscribe((data: any) => {
        this.custOrderReqList = data;
        console.log(data);
        this.dataSource2.data = this.custOrderReqList;
      });
  }

  getStatusText(status: string): string {
  switch (status) {
    case 'BS':
      return 'Verified';
    case 'BSV':
      return 'Paid';
    case 'BSR':
      return 'Refunded';
    case 'OP':
      return 'Placed';
    case 'OPA':
      return 'Approved';
    case 'OPR':
      return 'Rejected';
    case 'BP':
      return 'Processed';// Assuming you want to handle BSR as well
    default:
      return 'Unknown';
  }
}

}
