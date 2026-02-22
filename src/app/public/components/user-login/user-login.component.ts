import { UserI } from 'src/app/models/user.interface';
import { UserService } from './../../services/user-services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/private/services/auth.service';
import { EncryptionService } from 'src/app/private/services/encryption.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  isCustomerLoggedIn : boolean = false;
  isLoading: boolean = false;



  constructor(private router:Router, private userService:UserService, private snackBar : MatSnackBar,private auth:AuthService
    ,private encryptionService: EncryptionService
  ) { }

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
      this.isLoading = true;
      if (this.loginForm.valid) {
    this.userService.loginMerchantServices({
      merchantEmail: this.merchantEmail.value,
      merchantPassword: this.merchantPassword.value,
    }).subscribe({
      next: (response: any) => {
        console.log('login successful', response);
        if (response.response === "success") {
          const encryptedJwt = this.encryptionService.encrypt(response.token);
          const encUserType = this.encryptionService.encrypt(response.userType);
          sessionStorage.setItem('jwtToken',encryptedJwt);
          sessionStorage.setItem('ownerEmail', this.merchantEmail.value);
          sessionStorage.setItem('ownerName', response.userName);
          sessionStorage.setItem('ownerProfileImg', "merchant-profile-img");
          sessionStorage.setItem('ownerRefId', response.custRefId);
          this.isCustomerLoggedIn = true;
          if(response.userType === 'User'){
            this.auth.setUserRole(response.userType);
            this.router.navigate(['../../private/user-dashboard']);
             this.isLoading = false;
          }else if(response.userType === 'Cust'){
            this.auth.setUserRole(response.userType);
             console.log("Entered Customer DashBoard")
             this.router.navigate(['private', 'cust-dashboard']);
             this.isLoading = false;
          }
          this.isLoading = false;
        } else if (response.response === "failure") {
          this.isLoading = false;
          this.snackBar.open(`User does not exist!`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      },
      error: (error) => {
        if (error.status === 403) {
          this.isLoading = false;
          this.snackBar.open(`Access denied: You are not authorized.`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }else if(error.status === 401){
           this.isLoading = false;
          this.snackBar.open(`Access denied: You are not authorized.`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        } 
        else {
          this.isLoading = false;
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
