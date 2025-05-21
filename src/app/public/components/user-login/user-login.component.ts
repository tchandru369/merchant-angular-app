import { UserI } from 'src/app/models/user.interface';
import { UserService } from './../../services/user-services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isCustomerLoggedIn : boolean = false;


  constructor(private router:Router, private userService:UserService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }
   
  loginForm : FormGroup = new FormGroup(
    {
      merchantEmail : new FormControl(null,[Validators.required,Validators.email]),
      merchantPassword : new FormControl(null,[Validators.required])
    }
  );

  get merchantEmail():FormControl{
    return this.loginForm.get('merchantEmail') as FormControl;
  }
  get merchantPassword():FormControl{
    return this.loginForm.get('merchantPassword') as FormControl;
  }


  navigateToSignUp() {
     this.router.navigate(['../app-user-register']);
    }
    merchantUserLogin() {
      if (this.loginForm.valid) {
    this.userService.loginMerchantServices({
      merchantEmail: this.merchantEmail.value,
      merchantPassword: this.merchantPassword.value,
    }).subscribe({
      next: (response: any) => {
        console.log('login successful', response);
        if (response.response === "success") {
          sessionStorage.setItem('jwtToken', response.token);
          sessionStorage.setItem('ownerEmail', this.merchantEmail.value);
          sessionStorage.setItem('ownerName', response.userName);
          sessionStorage.setItem('ownerPhoto', response.userPhoto);
          sessionStorage.setItem('ownerProfileImg', "merchant-profile-img");
          this.isCustomerLoggedIn = true;
          this.router.navigate(['../../private/user-dashboard']);
        } else if (response.response === "failure") {
          this.snackBar.open(`User does not exist!`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      },
      error: (error) => {
        if (error.status === 403) {
          this.snackBar.open(`Access denied: You are not authorized.`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        } else {
          this.snackBar.open(`An error occurred: ${error.message}`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      }
    });
  }
    }

}
