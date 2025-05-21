import { Component, OnInit } from '@angular/core';
import { EditRequestDialogComponent } from '../edit-request-dialog/edit-request-dialog.component';
import { BillingService } from '../../services/billing.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { OrderRequest } from 'src/app/models/orderRequest.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-proc-orders',
  templateUrl: './proc-orders.component.html',
  styleUrls: ['./proc-orders.component.css']
})
export class ProcOrdersComponent implements OnInit {

  userEmail = '';  
    isLoading:boolean=false;
    procOrderList:OrderRequest[]=[];
    orderRequest:OrderRequest;

  addForm:FormGroup =  new FormGroup({
      finalAmtPaid : new FormControl(null,[Validators.required])
      }
  );

  get updateFinalAmtPaid():FormControl{
  return this.addForm.get('finalAmtPaid') as FormControl;
}

  paidOrderRequest(customer:any){
    this.isLoading = true;
      //  this.orderRequest.orderCustEmailId = customer.orderCustEmailId;
      //  this.orderRequest.orderCustCrtdDate = customer.orderCustCrtdDate;
      //  this.orderRequest.orderCustName = customer.orderCustName;
      //  this.orderRequest.orderCustOwnerName = customer.orderCustOwnerName;
      //  this.orderRequest.orderCustPhoneNo = customer.orderCustPhoneNo;
      //  this.orderRequest.orderCustType = customer.orderCustType;
      //  this.orderRequest.orderCustTotalPrice = customer.orderCustTotalPrice;
  
       this.billingService.paidOrderRequest(customer).subscribe((data:any) => {
          
          console.log(data);
          if(data.response == "success"){
            this.isLoading = false;
            this.procOrderList = this.procOrderList.filter(c => c !== customer);
            this.snackbar.open(` Bill Processing : ${data.response} `,'close',{
              duration: 5000,horizontalPosition:'center',verticalPosition:'top'
             })
          }
      })
       this.isLoading = false;
    }
  
  
    
  
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
  
      paidCustomer(customer:any){
        const dialogRef = this.dialog.open(EditRequestDialogComponent, {
      width: '400px',
      data: { ...customer }  // Clone to avoid mutating directly
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion
        customer.orderFinalAmtPaid = this.updateFinalAmtPaid.value;
        console.log(customer);
        this.paidOrderRequest(customer);
        console.log('Customer deleted');
      } else {
        // User canceled
        console.log('Delete action canceled');
      }
    });
      }
  
      deleteProcCustomer(customer: any) {
    const dialogRef = this.dialog.open(EditRequestDialogComponent, {
      width: '400px',
      data: { ...customer }  // Clone to avoid mutating directly
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed deletion
        this.deleteProcOrderRequest(customer);
        console.log('Customer deleted');
      } else {
        // User canceled
        console.log('Delete action canceled');
      }
    });
  }
  
     ngOnInit(): void {
       this.getProcOrderList();
    }
  
    getProcOrderList(){
      this.isLoading = true;
      this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
      this.billingService.processedOrder(this.userEmail).subscribe((data:any) => {
        this.isLoading = false;
          this.procOrderList = data;
          console.log(data);
      })
      this.isLoading = false;
    }
  
    deleteProcOrderRequest(customer:any){
      this.isLoading = true;
      //  this.orderRequest.orderCustEmailId = customer.orderCustEmailId;
      //  this.orderRequest.orderCustCrtdDate = customer.orderCustCrtdDate;
      //  this.orderRequest.orderCustName = customer.orderCustName;
      //  this.orderRequest.orderCustOwnerName = customer.orderCustOwnerName;
      //  this.orderRequest.orderCustPhoneNo = customer.orderCustPhoneNo;
      //  this.orderRequest.orderCustType = customer.orderCustType;
      //  this.orderRequest.orderCustTotalPrice = customer.orderCustTotalPrice;
  
       this.billingService.deleteProcOrderRequest(customer).subscribe((data:any) => {
          
          console.log(data);
          if(data.response == "success"){
            this.isLoading = false;
            this.procOrderList = this.procOrderList.filter(c => c !== customer);
            this.snackbar.open(` Customer registration : ${data.response} `,'close',{
              duration: 5000,horizontalPosition:'center',verticalPosition:'top'
             })
          }
      })
       this.isLoading = false;
    }
  

}
