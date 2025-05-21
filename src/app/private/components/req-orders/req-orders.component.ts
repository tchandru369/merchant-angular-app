import { customer } from './../../../models/customer.interface';
import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { OrderRequest } from 'src/app/models/orderRequest.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditRequestDialogComponent } from '../edit-request-dialog/edit-request-dialog.component';

@Component({
  selector: 'app-req-orders',
  templateUrl: './req-orders.component.html',
  styleUrls: ['./req-orders.component.css']
})
export class ReqOrdersComponent implements OnInit {


  isLoading:boolean=false;
proceedOrderRequest(customer:any){
  this.isLoading = true;
    //  this.orderRequest.orderCustEmailId = customer.orderCustEmailId;
    //  this.orderRequest.orderCustCrtdDate = customer.orderCustCrtdDate;
    //  this.orderRequest.orderCustName = customer.orderCustName;
    //  this.orderRequest.orderCustOwnerName = customer.orderCustOwnerName;
    //  this.orderRequest.orderCustPhoneNo = customer.orderCustPhoneNo;
    //  this.orderRequest.orderCustType = customer.orderCustType;
    //  this.orderRequest.orderCustTotalPrice = customer.orderCustTotalPrice;

     this.billingService.processOrderRequest(customer).subscribe((data:any) => {
        
        console.log(data);
        if(data.errorCode == "0"){
          this.isLoading = false;
          this.orderReqList = this.orderReqList.filter(c => c !== customer);
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


  userEmail = '';
  orderReqList:OrderRequest[]=[];

  procOrderList:OrderRequest[]=[];
  orderRequest:OrderRequest;

  constructor(private billingService : BillingService,private router:Router,private snackbar:MatSnackBar,private dataPipe:DatePipe,private dialog: MatDialog)
   {

    this.orderRequest={
       orderCustName : '',
       orderCustPhoneNo:'',
       orderCustCrtdDate:'',
       orderCustOwnerName:'',
       orderCustEmailId:'',
       orderCustType:'',
       orderCustTotalPrice:0,
       orderFinalAmtPaid:0,
       orderList:[]
    };
    }

    processCustomer(customer:any){
      const dialogRef = this.dialog.open(EditRequestDialogComponent, {
    width: '400px',
    data: { ...customer }  // Clone to avoid mutating directly
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // User confirmed deletion
      this.proceedOrderRequest(customer);
      console.log('Order has been processed');
    } else {
      // User canceled
      console.log('order Process has been canceled');
    }
  });
    }

    deleteCustomer(customer: any) {
  const dialogRef = this.dialog.open(EditRequestDialogComponent, {
    width: '400px',
    data: { ...customer }  // Clone to avoid mutating directly
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // User confirmed deletion
      this.deleteOrderRequest(customer);
      console.log('Customer deleted');
    } else {
      // User canceled
      console.log('Delete action canceled');
    }
  });
}

   ngOnInit(): void {
     this.getOwnerCustList();
  }

  getOwnerCustList(){
    this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
    this.billingService.viewCustOrder(this.userEmail).subscribe((data:any) => {
        this.orderReqList = data;
        console.log(data);
    })
  }

  getProcOrderList(){
    this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
    this.billingService.processedOrder(this.userEmail).subscribe((data:any) => {
        this.procOrderList = data;
        console.log(data);
    })
  }

  deleteOrderRequest(customer:any){
    this.isLoading = true;
     this.orderRequest.orderCustEmailId = customer.orderCustEmailId;
     this.orderRequest.orderCustCrtdDate = customer.orderCustCrtdDate;
     this.orderRequest.orderCustName = customer.orderCustName;
     this.orderRequest.orderCustOwnerName = customer.orderCustOwnerName;
     this.orderRequest.orderCustPhoneNo = customer.orderCustPhoneNo;
     this.orderRequest.orderCustType = customer.orderCustType;
     this.orderRequest.orderCustTotalPrice = customer.orderCustTotalPrice;

     this.billingService.deleteOrderRequest(this.orderRequest).subscribe((data:any) => {
        
        console.log(data);
        if(data.response == "success"){
          this.isLoading = false;
          this.orderReqList = this.orderReqList.filter(c => c !== customer);
          this.snackbar.open(` Processing : ${data.errorMsg} `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
        }
    })
     this.isLoading = false;
  }

}
