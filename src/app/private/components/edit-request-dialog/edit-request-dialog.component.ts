import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-request-dialog',
  templateUrl: './edit-request-dialog.component.html',
  styleUrls: ['./edit-request-dialog.component.css']
})
export class EditRequestDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    
  }

  ngOnInit(): void {
  }

   onProceed() {
    this.dialogRef.close(true);  // Return true for Yes
  }

  onCancel() {
    this.dialogRef.close(false);  // Return false for No
  }

  

}
