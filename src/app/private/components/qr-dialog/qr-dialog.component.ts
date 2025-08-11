import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.css']
})
export class QrDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QrDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: { upiQRValue: string }) {}

  ngOnInit(): void {
  }

  onProceed() {
    this.dialogRef.close(true);  // Return true for Yes
  }

}
