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
  userEmail: string = '';
  custEmail:string='';
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

   getCustOrderRequestList() {
    this.isLoading = true;
    this.custEmail = sessionStorage.getItem('ownerEmail') || '';
    this.userEmail = this.shopCustomer.custOwmerDetails;
    this.date = this.dataPipe.transform(this.dateForm.get('selectedDate')?.value, 'dd-MM-yyyy')!;
    this.billingService
      .custOrderReqList(this.userEmail,this.custEmail,this.date)
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
    const custEmail = sessionStorage.getItem('ownerEmail');
    this.billingService
      .getCustDtlsByPhEmail(custEmail)
      .subscribe((data: any) => {
        this.shopCustomer = data;
        console.log(this.shopCustomer);
      });
  }
}
