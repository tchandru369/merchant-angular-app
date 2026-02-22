import { Component, OnInit } from '@angular/core';
import { OrderRequest } from 'src/app/models/orderRequest.interface';
import { BillingService } from '../../services/billing.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditRequestDialogComponent } from '../edit-request-dialog/edit-request-dialog.component';

@Component({
  selector: 'app-cust-verify-pymnt-list',
  templateUrl: './cust-verify-pymnt-list.component.html',
  styleUrls: ['./cust-verify-pymnt-list.component.css'],
})
export class CustVerifyPymntListComponent implements OnInit {
  custPymtVerifiedReq(customer: any) {
    this.isLoading = true;
    //  this.orderRequest.orderCustEmailId = customer.orderCustEmailId;
    //  this.orderRequest.orderCustCrtdDate = customer.orderCustCrtdDate;
    //  this.orderRequest.orderCustName = customer.orderCustName;
    //  this.orderRequest.orderCustOwnerName = customer.orderCustOwnerName;
    //  this.orderRequest.orderCustPhoneNo = customer.orderCustPhoneNo;
    //  this.orderRequest.orderCustType = customer.orderCustType;
    //  this.orderRequest.orderCustTotalPrice = customer.orderCustTotalPrice;

    this.billingService
      .ownerCustVerifyPymnt(customer)
      .subscribe((data: any) => {
        console.log(data);
        if (data.response == 'success') {
          this.isLoading = false;
          this.custPlacedList = this.custPlacedList.filter(
            (c) => c !== customer
          );
          this.snackbar.open(` Bill Processing : ${data.response} `, 'close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    this.isLoading = false;
  }

  ownerVerifiedCustPymnt(customer: any) {
    const dialogRef = this.dialog.open(EditRequestDialogComponent, {
      width: '400px',
      data: { ...customer }, // Clone to avoid mutating directly
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        console.log(customer);
        this.custPymtVerifiedReq(customer);
        console.log('Customer deleted');
      } else {
        // User canceled
        console.log('Delete action canceled');
      }
    });
  }

ownerCustNotPaidConfirm(customer: any) {
    const dialogRef = this.dialog.open(EditRequestDialogComponent, {
      width: '400px',
      data: { ...customer }, // Clone to avoid mutating directly
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User confirmed deletion
        console.log(customer);
        this.custNotVerifiedReq(customer);
        console.log('Customer deleted');
      } else {
        // User canceled
        console.log('Delete action canceled');
      }
    });
  }

  custNotVerifiedReq(customer:any) {
    this.isLoading = true;
    //  this.orderRequest.orderCustEmailId = customer.orderCustEmailId;
    //  this.orderRequest.orderCustCrtdDate = customer.orderCustCrtdDate;
    //  this.orderRequest.orderCustName = customer.orderCustName;
    //  this.orderRequest.orderCustOwnerName = customer.orderCustOwnerName;
    //  this.orderRequest.orderCustPhoneNo = customer.orderCustPhoneNo;
    //  this.orderRequest.orderCustType = customer.orderCustType;
    //  this.orderRequest.orderCustTotalPrice = customer.orderCustTotalPrice;

    this.billingService
      .ownerCustNotPaidConfirm(customer)
      .subscribe((data: any) => {
        console.log(data);
        if (data.response == 'success') {
          this.isLoading = false;
          this.custPlacedList = this.custPlacedList.filter(
            (c) => c !== customer
          );
          this.snackbar.open(` Bill Processing : ${data.response} `, 'close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    this.isLoading = false;
  }

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
    this.getCustPymtVerifiedList();
  }

  getCustPymtVerifiedList() {
    this.isLoading = true;
    this.ownerRefId = sessionStorage.getItem('ownerRefId') || '';
    this.billingService
      .custVerifyPymntList(this.ownerRefId)
      .subscribe((data: any) => {
        this.isLoading = false;
        this.custPlacedList = data;
        console.log(data);
      });
    this.isLoading = false;
  }
}
