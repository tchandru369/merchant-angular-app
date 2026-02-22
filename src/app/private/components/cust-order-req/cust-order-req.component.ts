import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { OrderRequest } from 'src/app/models/orderRequest.interface';
import { EditRequestDialogComponent } from '../edit-request-dialog/edit-request-dialog.component';

@Component({
  selector: 'app-cust-order-req',
  templateUrl: './cust-order-req.component.html',
  styleUrls: ['./cust-order-req.component.css'],
})
export class CustOrderReqComponent implements OnInit {
  custPlacedList: OrderRequest[] = [];
  isLoading: boolean = false;
  ownerRefId: string = '';
  constructor(
    private billingService: BillingService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dataPipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCustOrderPlacedList();
  }

  getCustOrderPlacedList() {
    this.isLoading = true;
    this.ownerRefId = sessionStorage.getItem('ownerRefId') || '';
    this.billingService
      .custOrderPlacedList(this.ownerRefId)
      .subscribe((data: any) => {
        this.isLoading = false;
        this.custPlacedList = data;
        console.log(data);
      });
    this.isLoading = false;
  }

  approveCustReq(customer: any) {
       
           const dialogRef = this.dialog.open(EditRequestDialogComponent, {
             width: '400px',
             data: { ...customer }  // Clone to avoid mutating directly
           });
         
           dialogRef.afterClosed().subscribe(result => {
             if (result) {
               // User confirmed deletion
               this.ownerAprroveOrderCust(customer);
               console.log('Customer deleted');
             } else {
               // User canceled
               console.log('Delete action canceled');
             }
           });
         

  }

  ownerAprroveOrderCust(customer:any){
    this.isLoading = true;
    //  this.orderRequest.orderCustEmailId = customer.orderCustEmailId;
    //  this.orderRequest.orderCustCrtdDate = customer.orderCustCrtdDate;
    //  this.orderRequest.orderCustName = customer.orderCustName;
    //  this.orderRequest.orderCustOwnerName = customer.orderCustOwnerName;
    //  this.orderRequest.orderCustPhoneNo = customer.orderCustPhoneNo;
    //  this.orderRequest.orderCustType = customer.orderCustType;
    //  this.orderRequest.orderCustTotalPrice = customer.orderCustTotalPrice;

     this.billingService.ownerApproveCustOrder(customer).subscribe((data:any) => {
        
        console.log(data);
        if(data.errorCode == "0"){
          this.isLoading = false;
          this.snackbar.open(` Status : ${data.errorMsg} `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
        }else if(data.errorCode == "1"){
          this.isLoading = false;
          this.snackbar.open(` Status : ${data.errorMsg} `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
        }
    })
     this.isLoading = false;
  }

  ownerRejectOrderCust(customer:any){
    this.isLoading = true;
    //  this.orderRequest.orderCustEmailId = customer.orderCustEmailId;
    //  this.orderRequest.orderCustCrtdDate = customer.orderCustCrtdDate;
    //  this.orderRequest.orderCustName = customer.orderCustName;
    //  this.orderRequest.orderCustOwnerName = customer.orderCustOwnerName;
    //  this.orderRequest.orderCustPhoneNo = customer.orderCustPhoneNo;
    //  this.orderRequest.orderCustType = customer.orderCustType;
    //  this.orderRequest.orderCustTotalPrice = customer.orderCustTotalPrice;

     this.billingService.ownerRejectCustOrder(customer).subscribe((data:any) => {
        
        console.log(data);
        if(data.errorCode == "0"){
          this.isLoading = false;
          this.snackbar.open(` Status : ${data.errorMsg} `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
        }else if(data.errorCode == "1"){
          this.isLoading = false;
          this.snackbar.open(` Status : ${data.errorMsg} `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
        }
    })
     this.isLoading = false;
  }
  declineCustReq(customer:any) {
    const dialogRef = this.dialog.open(EditRequestDialogComponent, {
             width: '400px',
             data: { ...customer }  // Clone to avoid mutating directly
           });
         
           dialogRef.afterClosed().subscribe(result => {
             if (result) {
               // User confirmed deletion
               this.ownerRejectOrderCust(customer);
               console.log('Customer deleted');
             } else {
               // User canceled
               console.log('Delete action canceled');
             }
           });
         
    
  }
}
