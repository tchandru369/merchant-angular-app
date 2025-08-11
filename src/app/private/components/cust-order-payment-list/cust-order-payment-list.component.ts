import { customer } from './../../../models/customer.interface';
import { Component, OnInit } from '@angular/core';
import { OrderRequest } from 'src/app/models/orderRequest.interface';
import { BillingService } from '../../services/billing.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditRequestDialogComponent } from '../edit-request-dialog/edit-request-dialog.component';
import { ShopCustomer } from 'src/app/models/ShopCustomer.interface';
import { MerchantService } from '../../services/merchant.service';
import { QrDialogComponent } from '../qr-dialog/qr-dialog.component';
import { OrderReqWFlag } from 'src/app/models/OrderReqWFlag.interface';




declare var Razorpay: any;

@Component({
  selector: 'app-cust-order-payment-list',
  templateUrl: './cust-order-payment-list.component.html',
  styleUrls: ['./cust-order-payment-list.component.css']
})
export class CustOrderPaymentListComponent implements OnInit {


  userEmail = '';  
  custEmail = '';
      isLoading:boolean=false;
      procOrderList:OrderReqWFlag[]=[];
      orderRequest:OrderRequest;
      shopCustomer!: ShopCustomer;
      scanPymtFlag:boolean=false;


  constructor(private billingService : BillingService,private merchantService:MerchantService, private router:Router,private snackbar:MatSnackBar,private dataPipe:DatePipe,private dialog: MatDialog) {

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
      this.shopCustomer = {
      custType: '',
      custPanNo: '',
      custEmailId: '',
      custOwmerDetails: '',
      custDob: '',
      custPinCode: '',
      custState: '',
      custCity: '',
      custAddress: '',
      custPhoneNo: '',
      custName: '',
      custGender: '',
      custCountry: '',
    };
   }

   paidsCustomer(customer: any) {
  // your payment logic
  customer.orderFlag = true; // this will automatically toggle the buttons
}

   addForm:FormGroup =  new FormGroup({
         finalAmtPaid : new FormControl(null,[Validators.required])
         }
     );
   
     get updateFinalAmtPaid():FormControl{
     return this.addForm.get('finalAmtPaid') as FormControl;
   }

    getCustomerDetailsByEmailPh() {
    const custEmail = sessionStorage.getItem('ownerEmail');
    this.billingService
      .getCustDtlsByPhEmail(custEmail)
      .subscribe((data: any) => {
        this.shopCustomer = data;
        console.log(this.shopCustomer);
        this.custEmail = this.shopCustomer.custOwmerDetails;
      });
  }

  paymentBackToNormal(customer:any) {
   customer.orderFlag=false;
}
confirmPaymentToDealer(customer: any) {

  const dialogRef = this.dialog.open(EditRequestDialogComponent, {
         width: '400px',
         data: { ...customer }  // Clone to avoid mutating directly
       });
     
       dialogRef.afterClosed().subscribe(result => {
         if (result) {
           // User confirmed deletion
           console.log(customer);
           //this.custCreateTransaction(customer);
           console.log('Customer processed');
         } else {
           // User canceled
           console.log('Delete action canceled');
         }
       });

}
    custCreateTransaction(customer:any){
       this.custEmail = sessionStorage.getItem('ownerEmailValue')|| '';
      this.merchantService.getDealersPaymentDetails(this.custEmail)
      .subscribe((data: any) => {
        const upiQRValue = `upi://pay?pa=${data.pymtUpiId}&pn=${data.pymtOwnerName}&am=${customer.orderFinalAmtPaid}&cu=INR&tn=${encodeURIComponent('Order Payment Amount')}`;

       const dialogRef =  this.dialog.open(QrDialogComponent, {
          data: { upiQRValue }
        });

        dialogRef.afterClosed().subscribe(result => {
         if (result) {
           // User confirmed deletion
           customer.orderFlag = true;
         } else {
           // User canceled
           customer.orderFlag = false;
           console.log('Delete action canceled');
         }
       });
      })    //this.upiQRValue = `upi://pay?pa=chanper369@okaxis&pn=Dealer`;
    }
     custCreateTransactionD(customer:any){
       this.isLoading = true;
     
          this.billingService.custCreateTrans(customer).subscribe((data:any) => {
             
             console.log(data);
             if(data.response == "success"){
               this.isLoading = false;
               this.procOrderList = this.procOrderList.filter(c => c !== customer);
               this.openRazorpayTransactionModel(data,customer);
             }
         })
          this.isLoading = false;
       }

       openRazorpayTransactionModel(response:any,customer:any){
        var options={
          order_id : response.orderId,
          key : response.key,
          amount : response.amount,
          currency:response.currency,
          name : customer.custName,
          description:'Customers Payment Amount',
          handler:(response:any)=>{
            this.processResponse(response)
          },
          prefill:{
            name: customer.custName,
            email: customer.custEmailId,
            contact:customer.custPhoneNo
          },
          notes:{
            address:customer.custAddress,
          },
          theme:{
            color:'#F37254'
          },
        };

        var razorpayObject = new Razorpay(options);
        razorpayObject.open();
       }

       processResponse(res:any){
        console.log(res);
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
           this.custCreateTransaction(customer);
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
      this.custEmail = sessionStorage.getItem('ownerEmailValue')|| '';
      this.billingService.custProcessedOrder(this.custEmail,this.userEmail).subscribe((data:any) => {
        this.isLoading = false;
          this.procOrderList = data.map((customer: any) => ({
    ...customer,
    orderFlag: false
  }));
          console.log(data);
      })
      this.isLoading = false;
    }

}
