import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cust-order-details-dialog',
  templateUrl: './cust-order-details-dialog.component.html',
  styleUrls: ['./cust-order-details-dialog.component.css']
})
export class CustOrderDetailsDialogComponent implements OnInit {
close() {
this.dialogRef.close(); 
}

  constructor(public dialogRef: MatDialogRef<CustOrderDetailsDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
