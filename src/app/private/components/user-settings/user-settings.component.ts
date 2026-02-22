import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { merchantImg } from 'src/app/models/merchantImg.interface';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators';
import { MerchantService } from '../../services/merchant.service';
import { DomSanitizer } from '@angular/platform-browser';
import { imageHandle } from 'src/app/models/imageHandle.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
})
export class UserSettingsComponent implements OnInit {
 

  ownerRefId: any;
  isLoading: boolean = false;
  imageSelected: boolean = false;
  isUpiEdit:boolean = false;  
  defaultImageHandle: imageHandle = {
    // Assuming imageHandle has properties like `src`, `alt`, etc., set default values here
    file: new File([], ''), // default empty image source
    url: this.sanitizer.bypassSecurityTrustUrl('assets/default-image.jpg'), // a default alt text for the image
  };

  merchantImgClass: merchantImg = {
    merchantImgEmail: '',
    merchantImgModule: '',
    merchantImg: this.defaultImageHandle, // Add a default value for the required merchantName property
  };

  imageUrl: any;
  constructor(
    private settingService: MerchantService,
    private sanitizer: DomSanitizer,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getProfileImg();
    this.getMerchantDetails();
    this.getCustPymntDetailsByEmail();
    if (this.imageUrl === null) {
      this.imageUrl = 'src/assets/profile_src.jpg';
    }
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
      this.imageSelected = true;
      this.merchantImgClass.merchantImg = file;
      const blobUrl = URL.createObjectURL(file);
      // Use DomSanitizer to trust the blob URL and mark it as safe
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);
      console.log('Image URL:', this.imageUrl); // Create object URL for the image
    }
  }

  onFileChangeEvent(event: any) {
    console.log(event);
    if (event.target.files) {
      this.imageSelected = true;
      const file = event.target.files[0];
      const fileHandle: imageHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.imageUrl = fileHandle.url;
      this.merchantImgClass.merchantImg = fileHandle;
    }
  }

  settingForm: FormGroup = new FormGroup({
    merchantUserName: new FormControl(null, [Validators.required]),
    merchantEmail: new FormControl(null, [
      Validators.required,
      Validators.email,
    ]),
    merchantPhoneNumber: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
    ]),
    merchantAddress: new FormControl(null, [Validators.required]),
  });

  upiForm: FormGroup = new FormGroup({
    merchantUpi: new FormControl(null, [Validators.required]),
  });

  get merchantUpi(): FormControl {
    return this.upiForm.get('merchantUpi') as FormControl;
  }

  get merchantUserName(): FormControl {
    return this.settingForm.get('merchantUserName') as FormControl;
  }
  get merchantEmail(): FormControl {
    return this.settingForm.get('merchantEmail') as FormControl;
  }
  get merchantPhoneNumber(): FormControl {
    return this.settingForm.get('merchantPhoneNumber') as FormControl;
  }
  get merchantAddress(): FormControl {
    return this.settingForm.get('merchantAddress') as FormControl;
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
  merchantUserUpdate() {}

  onUpdateImg(): void {
    this.isLoading = true;
    if (!this.merchantImgClass.merchantImg.url) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    this.merchantImgClass.merchantImgEmail = String(
      sessionStorage.getItem('ownerRefId')
    );
    this.merchantImgClass.merchantImgModule = String(
      sessionStorage.getItem('ownerProfileImg')
    );
    formData.append(
      'imageDetails',
      new Blob([JSON.stringify(this.merchantImgClass)], {
        type: 'application/json',
      })
    );
    formData.append(
      'imageFile',
      this.merchantImgClass.merchantImg.file,
      this.merchantImgClass.merchantImg.file.name
    );
    console.log(formData);
    console.log(this.merchantImgClass);
    this.settingService.uploadImage(formData).subscribe(
      (response: any) => {
        this.isLoading = false;
        console.log('Image uploaded successfully', response);
        this.snackbar.open(` Image uploaded successfully `, 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.imageSelected = false;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error uploading image', error);
        this.snackbar.open(` Image Failed to upload `, 'close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.imageSelected = false;
      }
    );
  }

  loadImage(data: string): void {
    this.settingService.getImage(data).subscribe(
      (blob) => {
        const blobUrl = URL.createObjectURL(blob);
        // Use DomSanitizer to trust the blob URL and mark it as safe
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl); // Convert Blob to Object URL
      },
      (error) => {
        console.error('Error fetching image', error);
      }
    );
  }

  getProfileImg() {
    const ownerEmail = String(sessionStorage.getItem('ownerRefId'));
    const ownerImgModule = String(sessionStorage.getItem('ownerProfileImg'));
    this.settingService.getProfileImage(ownerEmail, ownerImgModule).subscribe(
      (data: any) => {
        console.log(data);
        this.createImage(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public createImage(image: any) {
    const merchantImage = image;

    const imageFileData = merchantImage;

    const imageBlob = this.dataURItoBlob(
      imageFileData.imageByte,
      imageFileData.imageType
    );

    const imageFile = new File([imageBlob], imageFileData.imageName, {
      type: imageFileData.imageType,
    });

    const finalFileHandle: imageHandle = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(imageFile)
      ),
    };

    this.imageUrl = finalFileHandle.url;
  }

  public dataURItoBlob(picBytes: any, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }

  getMerchantDetails() {
    this.ownerRefId = String(sessionStorage.getItem('ownerRefId'));
    this.settingService
      .getMerchantDetails(this.ownerRefId)
      .subscribe((data: any) => {
        this.setDefaultProfileValue(data);
        console.log(data);
      });
  }

   updateUPIDetailsOfOwner() {
     this.ownerRefId = String(sessionStorage.getItem('ownerRefId'));
     this.settingService.updatePaymentDetails(this.ownerRefId, this.merchantUpi.value,this.merchantPhoneNumber.value,this.merchantUserName.value).subscribe(
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

  setDefaultProfileValue(data: any) {
    this.merchantUserName.setValue(data.merchantUserName);
    this.merchantEmail.setValue(data.merchantEmail);
    this.merchantPhoneNumber.setValue(data.merchantPhoneNumber);
    this.merchantAddress.setValue(data.merchantAddress);
  }
}
