import { Component, OnInit } from '@angular/core';
import { imageHandle } from 'src/app/models/imageHandle.interface';
import { MerchantService } from '../../services/merchant.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merchantImg } from 'src/app/models/merchantImg.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../../services/billing.service';
import { ShopCustomer } from 'src/app/models/ShopCustomer.interface';

@Component({
  selector: 'app-cust-settings',
  templateUrl: './cust-settings.component.html',
  styleUrls: ['./cust-settings.component.css']
})
export class CustSettingsComponent implements OnInit {
applyMask() {
const ctrl = this.upiForm.get('merchantUpi');
  ctrl?.setValue(maskUpi(ctrl.value), { emitEvent: false });
}



  imageSelected: boolean = false; 
  shopCust!:ShopCustomer;
  ownerRefId:string='';
  upiRefId:string='';
  isLoading:boolean = false;
  isEditable:boolean = false;
  isUpiEdit:boolean = false;
     defaultImageHandle: imageHandle = {
      // Assuming imageHandle has properties like `src`, `alt`, etc., set default values here
      file: new File([], ""), // default empty image source
      url: this.sanitizer.bypassSecurityTrustUrl('assets/default-image.jpg'), // a default alt text for the image
  };


  settingForm: FormGroup = new FormGroup({
      custName: new FormControl(null, [Validators.required]),
      custEmail: new FormControl(null, [Validators.required,Validators.email]),
      custPhoneNo: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
      custOwnerDetails: new FormControl(null, [Validators.required]),
      custPanNo: new FormControl(null, [Validators.required]),
      custDob: new FormControl(null, [Validators.required]),
      custAddress: new FormControl(null, [Validators.required]),
      custState: new FormControl(null, [Validators.required]),
      custCountry: new FormControl(null, [Validators.required]),
      custCity: new FormControl(null, [Validators.required]),
      custPinCode: new FormControl(null, [Validators.required]),
    });
  
    upiForm: FormGroup = new FormGroup({
      merchantUpi: new FormControl(null, [Validators.required]),
    });
  
    get merchantUpi(): FormControl {
      return this.upiForm.get('merchantUpi') as FormControl;
    }
  
    get custName(): FormControl {
      return this.settingForm.get('custName') as FormControl;
    }
    get custEmail(): FormControl {
      return this.settingForm.get('custEmail') as FormControl;
    }
    get custPhoneNo(): FormControl {
      return this.settingForm.get('custPhoneNo') as FormControl;
    }
    get custPanNo(): FormControl {
      return this.settingForm.get('custPanNo') as FormControl;
    }
    get custDob(): FormControl {
      return this.settingForm.get('custDob') as FormControl;
    }
    get custOwnerDetails(): FormControl {
      return this.settingForm.get('custOwnerDetails') as FormControl;
    }
    get custAddress(): FormControl {
      return this.settingForm.get('custAddress') as FormControl;
    }
    get custState(): FormControl {
      return this.settingForm.get('custState') as FormControl;
    }
    get custCountry(): FormControl {
      return this.settingForm.get('custCountry') as FormControl;
    }
    get custCity(): FormControl {
      return this.settingForm.get('custCity') as FormControl;
    }
    get custPinCode(): FormControl {
      return this.settingForm.get('custPinCode') as FormControl;
    }
  
    merchantImgClass: merchantImg = {
      merchantImgEmail: '',
      merchantImgModule: '',
      merchantImg: this.defaultImageHandle // Add a default value for the required merchantName property
    };
  
    imageUrl: any;
  constructor(private settingService:MerchantService,private billingService:BillingService,private sanitizer: DomSanitizer,private snackbar:MatSnackBar) {

    this.shopCust = {
      custType: '',
      custPanNo: '',
      custEmailId: '',
      custOwnerRefId: '',
      custDob: '',
      custPinCode: '',
      custState: '',
      custCity: '',
      custAddress: '',
      custPhoneNo: '',
      custName: '',
      custGender: '',
      custCountry: '',
      shopCustRefId:''
    };
   }

  ngOnInit(): void {
    this.getProfileImg();
    this.getCustDetailsByEmail();
    this.getCustPymntDetailsByEmail();
    if (this.imageUrl === null) {
      this.imageUrl = 'src/assets/profile_src.jpg';
    }
  }

  cancelEditOption() {
    this.isEditable = false;
    this.custName.setValue(this.shopCust.custName);
            this.custEmail.setValue(this.shopCust.custEmailId);
            this.custPhoneNo.setValue(this.shopCust.custPhoneNo);
            this.custPanNo.setValue(this.shopCust.custPanNo);
            this.custDob.setValue(this.shopCust.custDob);
            this.custOwnerDetails.setValue(this.shopCust.custOwnerRefId);
            this.custAddress.setValue(this.shopCust.custAddress);
            this.custState.setValue(this.shopCust.custState);
            this.custCountry.setValue(this.shopCust.custCountry);
            this.custCity.setValue(this.shopCust.custCity);
            this.custPinCode.setValue(this.shopCust.custPinCode);

}
custInfoupdate() {
throw new Error('Method not implemented.');
}
custInfoEdit() {
  this.isEditable = true;
   this.snackbar.open(` Please Edit the required Details `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           });
}

custUserUpdate() {
}

cancelUpiDetailEditCust() {
  this.isUpiEdit = false;
  this.merchantUpi.reset;
}
editUpiDetailsCust() {
this.isUpiEdit = true;
this.snackbar.open(` Please Edit the Payments Details `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           });
}

  ngOnDestroy(): void {
    // Clean up the blob URL when the component is destroyed
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageSelected =true;
      this.merchantImgClass.merchantImg = file;
      const blobUrl = URL.createObjectURL(file);
      // Use DomSanitizer to trust the blob URL and mark it as safe
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
      console.log('Image URL:', this.imageUrl); // Create object URL for the image

    }
  }

  onFileChangeEvent(event : any) {
    console.log(event);
    if(event.target.files){
      this.imageSelected =true;
      const file = event.target.files[0];
      const fileHandle : imageHandle={
        file : file,
        url : this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.imageUrl = fileHandle.url;
      this.merchantImgClass.merchantImg = fileHandle;
    }
    }

    onUpdateImg(): void {
      this.isLoading = true;
      if (!this.merchantImgClass.merchantImg.url) {
        alert('Please select an image.');
        return;
      }
  
      const formData = new FormData();
      this.merchantImgClass.merchantImgEmail = String(sessionStorage.getItem('ownerRefId'));
      this.merchantImgClass.merchantImgModule = String(sessionStorage.getItem('ownerProfileImg'));
      formData.append('imageDetails', new Blob([JSON.stringify(this.merchantImgClass)],{type:"application/json"}));
      formData.append('imageFile', this.merchantImgClass.merchantImg.file, this.merchantImgClass.merchantImg.file.name);
      console.log(formData);
      console.log(this.merchantImgClass);
      this.settingService.uploadImage(formData).subscribe(
        (response:any) => {
          this.isLoading = false;
          console.log('Image uploaded successfully', response);
          this.snackbar.open(` Image uploaded successfully `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
           this.imageSelected = false;
        },
        (error) => {
          this.isLoading = false;
          console.error('Error uploading image', error);
          this.snackbar.open(` Image Failed to upload `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
           this.imageSelected = false;
        }
      );
    }

    loadImage(data:string): void {
      this.settingService.getImage(data).subscribe(
        (blob) => {
          const blobUrl = URL.createObjectURL(blob);
          // Use DomSanitizer to trust the blob URL and mark it as safe
          this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);  // Convert Blob to Object URL
        },
        (error) => {
          console.error('Error fetching image', error);
        }
      );
    }
  getProfileImg(){
        const ownerEmail = String(sessionStorage.getItem('ownerRefId'));
        const ownerImgModule = String(sessionStorage.getItem('ownerProfileImg'));
        this.settingService.getProfileImage(ownerEmail,ownerImgModule).subscribe(
          (data:any) => {
            console.log('these is the response : ',data);
            this.createImage(data);

          },(error:HttpErrorResponse)=>{
            console.log(error);
          }
        )
      }

      getCustPymntDetailsByEmail(){
         this.ownerRefId = String(sessionStorage.getItem('ownerRefId'));
        this.settingService.getDealersPaymentDetails(this.ownerRefId).subscribe(
          (data:any) => {
            console.log(data);
            this.merchantUpi.setValue(data.pymtUpiId);
          },(error:HttpErrorResponse)=>{
            console.log(error);
          }
        )
      }

      getCustDetailsByEmail(){
         this.ownerRefId = String(sessionStorage.getItem('ownerRefId'));
        this.billingService.getCustDtlsByPhEmail(this.ownerRefId).subscribe(
          (data:any) => {
            console.log(data);
            this.shopCust = data;
            this.custName.setValue(this.shopCust.custName);
            this.custEmail.setValue(this.shopCust.custEmailId);
            this.custPhoneNo.setValue(this.shopCust.custPhoneNo);
            this.custPanNo.setValue(this.shopCust.custPanNo);
            this.custDob.setValue(this.shopCust.custDob);
            this.custOwnerDetails.setValue(this.shopCust.custOwnerRefId);
            this.custAddress.setValue(this.shopCust.custAddress);
            this.custState.setValue(this.shopCust.custState);
            this.custCountry.setValue(this.shopCust.custCountry);
            this.custCity.setValue(this.shopCust.custCity);
            this.custPinCode.setValue(this.shopCust.custPinCode);
          },(error:HttpErrorResponse)=>{
            console.log(error);
          }
        )
      }
    
      public createImage(image:any){
        const merchantImage = image;
  
        const imageFileData = merchantImage;
  
        const imageBlob = this.dataURItoBlob(imageFileData.imageByte,imageFileData.imageType);
  
        const imageFile = new File([imageBlob],imageFileData.imageName,{type:imageFileData.imageType});
  
        const finalFileHandle:imageHandle = {
          file:imageFile,
          url : this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
        };
        
        this.imageUrl = finalFileHandle.url;
        console.log('these is the Image URL: ', this.imageUrl);
      }
  
      public dataURItoBlob(picBytes:any,imageType:any){
           const byteString = window.atob(picBytes);
           const arrayBuffer = new ArrayBuffer(byteString.length);
           const int8Array = new Uint8Array(arrayBuffer);
  
           for(let i=0;i<byteString.length;i++){
            int8Array[i] = byteString.charCodeAt(i);
           }
  
           const blob = new Blob([int8Array],{type:imageType});
           return blob;
      }

      
   updateUPIDetailsForCustomer() {
     this.ownerRefId = String(sessionStorage.getItem('ownerRefId'));
     //this.upiRefId = String(this.upiForm.get('merchantUpi'));
     this.upiRefId = String(this.merchantUpi.value);
     this.settingService.updatePaymentDetails(this.ownerRefId,this.upiRefId,this.custPhoneNo.value,this.custName.value).subscribe(
      (data: any) => {
        console.log(data);
        this.snackbar.open(` Status : ${data.response} `, 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.snackbar.open(` Something went wrong!!!! `, 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    );
  }

}
function maskUpi(value: any): any {
  throw new Error('Function not implemented.');
}

