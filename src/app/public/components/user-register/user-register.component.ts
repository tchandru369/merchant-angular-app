import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../_helpers/custom-validators';
import { UserService } from '../../services/user-services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  
  ngOnInit(): void {
  }

  constructor(private userService : UserService, private router:Router) { 
   
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
          merchantUserName: this.merchantUserName.value,
          merchantEmail:this.merchantEmail.value,
          merchantPassword:this.merchantPassword.value,
          merchantAddress:this.merchantAddress.value,
          merchantPhoneNumber:this.merchantPhoneNumber.value
        }
      ).pipe(
        tap(() => this.router.navigate(['../user-login']))
      ).subscribe();
    }
  }
}
