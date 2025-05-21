import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../_helpers/custom-validators';
import { UserService } from '../../services/user-services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserI } from 'src/app/models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  users:UserI;
  ngOnInit(): void {
  }

  constructor(private userService : UserService, private router:Router,private snackbar:MatSnackBar) { 
     this.users={
      merchantAddress:'',
      merchantEmail :'',
      merchantPassword:'',
      merchantPhoneNumber:'',
      merchantUserName:''
     }
   
  }


  
  form:FormGroup =  new FormGroup({
    merchantUserName : new FormControl(null,[Validators.required]),
    merchantEmail : new FormControl(null,[Validators.required,Validators.email]),
    merchantPassword : new FormControl(null,[Validators.required]),
    merchantRePassword : new FormControl(null,[Validators.required]),
    merchantPhoneNumber : new FormControl(null,[Validators.required,Validators.minLength(10)]),
    merchantAddress : new FormControl(null,[Validators.required])
  },{
    validators:CustomValidators.passwordMatching
  }
);

 

  get merchantUserName():FormControl{
    return this.form.get('merchantUserName') as FormControl;
  }
  get merchantEmail():FormControl{
    return this.form.get('merchantEmail') as FormControl;
  }
  get merchantPassword():FormControl{
    return this.form.get('merchantPassword') as FormControl;
  }
  get merchantPhoneNumber():FormControl{
    return this.form.get('merchantPhoneNumber') as FormControl;
  }
  get merchantAddress():FormControl{
    return this.form.get('merchantAddress') as FormControl;
  }

  get merchantRePassword():FormControl{
    return this.form.get('merchantRePassword') as FormControl;
  }

  merchantUserRegister() {
     
    if(this.form.valid){
      this.userService.createMerchant(
        {
          
        }
      ).pipe(
        tap(() => this.router.navigate(['../user-login']))
      ).subscribe();
          this.users.merchantUserName= this.merchantUserName.value,
        this.users.merchantEmail=this.merchantEmail.value,
          this.users.merchantPassword=this.merchantPassword.value,
          this.users.merchantAddress=this.merchantAddress.value,
          this.users.merchantPhoneNumber=this.merchantPhoneNumber.value

      this.userService.createMerchant(this.users).subscribe((data:any) =>{
    console.log(data);
    if(data.response == "success"){
      this.snackbar.open(`User created Successfully`,'close',{
        duration: 2000,horizontalPosition:'right',verticalPosition:'top'
       })       
    }else{
      this.snackbar.open(`Something went wrong...!`,'close',{
        duration: 2000,horizontalPosition:'right',verticalPosition:'top'
       })
    }
   },
   (error) => {
        if (error.status === 403) {
          this.snackbar.open(`Access denied: You are not authorized.`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        } else {
          this.snackbar.open(`An error occurred: ${error.message}`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      }
  );
    }
  }
}
