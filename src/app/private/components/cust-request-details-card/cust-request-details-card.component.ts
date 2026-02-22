import { Component, OnInit } from '@angular/core';
import { OrderRequest } from 'src/app/models/orderRequest.interface';
import { BillingService } from '../../services/billing.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ShopCustomer } from 'src/app/models/ShopCustomer.interface';
import { CustOrderReq } from 'src/app/models/custOrderReq.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cust-request-details-card',
  templateUrl: './cust-request-details-card.component.html',
  styleUrls: ['./cust-request-details-card.component.css']
})
export class CustRequestDetailsCardComponent implements OnInit {
custPlacedList: CustOrderReq[] = [];
shopCustomer!: ShopCustomer;
selectedDate: string='';
  isLoading: boolean = false;
  ownerRefId: string = '';
  custRefId:string='';
  date:string='';
  constructor(
    private billingService: BillingService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dataPipe: DatePipe,
    private dialog: MatDialog
  ) {

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
  }

   dateForm:FormGroup =  new FormGroup({
      selectedDate : new FormControl(null,[Validators.required])
      
      }
  );

  onSubmit(): void {
  if (this.dateForm.valid) {
    

    // Proceed with your actual logic
    this.getCustOrderRequestList();
  } else {
    // Mark all controls as touched to trigger error messages
    this.dateForm.markAllAsTouched();
  }
}

  ngOnInit(): void {
    this.getCustomerDetailsByEmailPh();
    
  }

  getCustOrderRequestListRecent() {
    this.isLoading = true;
    this.custRefId = sessionStorage.getItem('ownerRefId') || '';
    this.ownerRefId = sessionStorage.getItem('ownerRefIdValue') || '';
    this.date = "recent";
    console.log("Entered Recent List Function")
    this.billingService
      .custOrderReqList(this.ownerRefId,this.custRefId,this.date)
      .subscribe((data: any) => {
        this.isLoading = false;

        if(data.length === 0){
          this.snackbar.open(`There is no order has been placed on this date`,'close',{
        duration: 2000,horizontalPosition:'center',verticalPosition:'top'
       })
        }else{
        this.custPlacedList = data;
        console.log(data);
        }   
      });
    this.isLoading = false;
  }

   getCustOrderRequestList() {
    this.isLoading = true;
    this.custRefId = sessionStorage.getItem('ownerRefId') || '';
    this.ownerRefId = this.shopCustomer.custOwnerRefId;
    this.date = this.dataPipe.transform(this.dateForm.get('selectedDate')?.value, 'dd-MM-yyyy')!;
    this.billingService
      .custOrderReqList(this.ownerRefId,this.custRefId,this.date)
      .subscribe((data: any) => {
        this.isLoading = false;

        if(data.length === 0){
          this.snackbar.open(`There is no order has been placed on this date`,'close',{
        duration: 2000,horizontalPosition:'center',verticalPosition:'top'
       })
        }else{
        this.custPlacedList = data;
        console.log(data);
        }   
      });
    this.isLoading = false;
  }


   
  getCustomerDetailsByEmailPh() {
    const ownerRefId = sessionStorage.getItem('ownerRefId');
    this.billingService
      .getCustDtlsByPhEmail(ownerRefId)
      .subscribe((data: any) => {
        this.shopCustomer = data;
        console.log(this.shopCustomer);
        this.getCustOrderRequestListRecent();
      });
      
  }
}
