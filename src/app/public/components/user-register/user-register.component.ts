import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../_helpers/custom-validators';
import { UserService } from '../../services/user-services/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { UserI } from 'src/app/models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConStDtls } from 'src/app/models/ConSt.interface';
import { BillingService } from 'src/app/private/services/billing.service';
import { MerchantReg } from 'src/app/models/merchantReg.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  providers: [DatePipe]
})
export class UserRegisterComponent implements OnInit {

  
  merchantReg:MerchantReg;
  isLoading:boolean=false;
  genderList:string[]=['Male','Female','Others']
    conStDtls:ConStDtls[]=[];
    countryList:any[]=[];
    stateList:any[]=[];
  cityList:any[]=[];
  selectedCountry:string='';
  selectedState:string='';
  selectedUpdState:string='';
  ngOnInit(): void {
  this.viewConStList();
  }

  constructor(private userService : UserService, private router:Router,private snackbar:MatSnackBar,private dataPipe:DatePipe) { 
     this.merchantReg={
       regMerchantName:'',
    regMerchantEmail:'',
    regMerchantPhNo:'',
    regMerchantPass:'',
    regMerchantAddrs:'',
    regMerchantDob:'',
    regMerchantGen:'',
    regMerchantState:'',
    regMerchantCtry:'',
    regMerchantCty:'',
    regMerchantPan:'',
    regMerchantPin:0
     }
   
  }


  
  form:FormGroup =  new FormGroup({
    merchantUserName : new FormControl(null,[Validators.required]),
    merchantEmail : new FormControl(null,[Validators.required,Validators.email]),
    merchantPassword : new FormControl(null,[Validators.required]),
    merchantRePassword : new FormControl(null,[Validators.required]),
    merchantPhoneNumber : new FormControl(null,[Validators.required,Validators.minLength(10)]),
    merchantAddress : new FormControl(null,[Validators.required]),
    merchantDob : new FormControl(null,[Validators.required]),
    merchantPinCode: new FormControl(null,[Validators.required]),
    merchantState: new FormControl(null,[Validators.required]),
    merchantCity: new FormControl(null,[Validators.required]),
    merchantCountry:new FormControl(null,[Validators.required]),
    merchantGender: new FormControl(null,[Validators.required]),
    merchantPanNo:new FormControl(null,[Validators.required])
  },{
    validators:CustomValidators.passwordMatching
  }
);

get merchantCountry():FormControl{
    return this.form.get('merchantCountry') as FormControl;
  }

  get merchantState():FormControl{
    return this.form.get('merchantState') as FormControl;
  }

get merchantPinCode():FormControl{
    return this.form.get('merchantPinCode') as FormControl;
  }
 get merchantViewGen():FormControl{
    return this.form.get('merchantViewGen') as FormControl;
  }
  get merchantViewSte():FormControl{
    return this.form.get('merchantViewSte') as FormControl;
  }
  get merchantViewCtry():FormControl{
    return this.form.get('merchantViewCtry') as FormControl;
  }
  get merchantCity():FormControl{
    return this.form.get('merchantCity') as FormControl;
  }
  get merchantName():FormControl{
    return this.form.get('merchantName') as FormControl;
  }
  get merchantGender():FormControl{
    return this.form.get('merchantGender') as FormControl;
  }

  get merchantPanNo():FormControl{
    return this.form.get('merchantPanNo') as FormControl;
  }
  get merchantDob():FormControl{
    return this.form.get('merchantDob') as FormControl;
  }

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

  onUpdateCountryChange() {
    this.stateList = [
      ...new Set(this.conStDtls
        .filter(item => item.countryNames === this.merchantCountry.value)
        .map(item => item.stateNames)),
    ];
    this.selectedUpdState = '';
    this.cityList = [];
  }

  onUpdateStateChange() {
    this.cityList = this.conStDtls
      .filter(
        item =>
          item.countryNames === this.merchantCountry.value &&
          item.stateNames === this.merchantState.value
      )
      .map(item => item.cityNames);
  }

  merchantUserRegister() {
     this.isLoading = true;
    if(this.form.valid){
          this.merchantReg.regMerchantName= this.merchantUserName.value,
        this.merchantReg.regMerchantEmail=this.merchantEmail.value,
          this.merchantReg.regMerchantPass=this.merchantPassword.value,
          this.merchantReg.regMerchantAddrs=this.merchantAddress.value,
          this.merchantReg.regMerchantPhNo=this.merchantPhoneNumber.value,
          this.merchantReg.regMerchantCty=this.merchantCity.value;
          this.merchantReg.regMerchantCtry=this.merchantCountry.value;
          this.merchantReg.regMerchantDob = this.dataPipe.transform(this.merchantDob.value, 'dd-MM-yyyy')!;
          //this.merchantReg.regMerchantDob=this.merchantDob.value;
          if(this.merchantGender.value == 'Male'){
          this.merchantReg.regMerchantGen = 'M';
        }else if(this.merchantGender.value == 'Female'){
          this.merchantReg.regMerchantGen = 'F'
        }else if(this.merchantGender.value == 'Others'){
          this.merchantReg.regMerchantGen = 'O'}
          //this.merchantReg.regMerchantGen=this.merchantGender.value;
          this.merchantReg.regMerchantPan=this.merchantPanNo.value;
          this.merchantReg.regMerchantPin=this.merchantPinCode.value;
          this.merchantReg.regMerchantState=this.merchantState.value;
         console.log("Output Message : ",this.merchantReg);
      this.userService.createMerchant(this.merchantReg).subscribe((data:any) =>{
    console.log(data);
    if(data.response == "success"){
      this.isLoading = false;
      this.snackbar.open(`${data.errorMsg}`,'close',{
        duration: 2000,horizontalPosition:'right',verticalPosition:'top'
       })       
    }else{
      this.isLoading = false;
      this.snackbar.open(`Something went wrong...!`,'close',{
        duration: 2000,horizontalPosition:'right',verticalPosition:'top'
       })
    }
   },
   (error) => {
        if (error.status === 403) {
          this.isLoading = false;
          this.snackbar.open(`Access denied: You are not authorized.`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        } else {
          this.isLoading = false;
          this.snackbar.open(`An error occurred: ${error.message}`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      }
  );
    }else{
      this.snackbar.open(`Please enter the necessary fields`, 'close', {
            duration: 20000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
    }
  }
   viewConStList(){
    this.userService.viewConStDtls().subscribe((data:any) => {
        this.conStDtls = data;
        console.log(data);
        this.countryList = [...new Set(this.conStDtls.map(item => item.countryNames))];
    })
  }
}
