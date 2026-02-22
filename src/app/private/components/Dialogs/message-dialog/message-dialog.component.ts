import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
close() {
    this.dialogRef.close();  // Return false for No
}

 constructor(public dialogRef: MatDialogRef<MessageDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) {}
  ngOnInit(): void {
  }

}
