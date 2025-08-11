import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { ShopCustomer } from 'src/app/models/ShopCustomer.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cust-dashboard',
  templateUrl: './cust-dashboard.component.html',
  styleUrls: ['./cust-dashboard.component.css']
})
export class CustDashboardComponent implements OnInit {

  shopCustomer!: ShopCustomer;
  custEmail:string='';
    constructor(private billingService : BillingService,private router:Router,private snackbar:MatSnackBar,private dataPipe:DatePipe,private dialog: MatDialog) {
  
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

  ngOnInit(): void {
    this.getCustomerDetailsByEmailPh();
  }

   getCustomerDetailsByEmailPh() {
    const custEmail = sessionStorage.getItem('ownerEmail');
    this.billingService
      .getCustDtlsByPhEmail(custEmail)
      .subscribe((data: any) => {
        this.shopCustomer = data;
        console.log(this.shopCustomer);
        sessionStorage.setItem('ownerEmailValue', this.shopCustomer.custOwmerDetails);
      });
  }

}
