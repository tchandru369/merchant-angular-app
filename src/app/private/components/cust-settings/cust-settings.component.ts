import { Component, OnInit } from '@angular/core';
import { imageHandle } from 'src/app/models/imageHandle.interface';
import { MerchantService } from '../../services/merchant.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { merchantImg } from 'src/app/models/merchantImg.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cust-settings',
  templateUrl: './cust-settings.component.html',
  styleUrls: ['./cust-settings.component.css']
})
export class CustSettingsComponent implements OnInit {

  imageSelected: boolean = false; 
  isLoading:boolean = false;
     defaultImageHandle: imageHandle = {
      // Assuming imageHandle has properties like `src`, `alt`, etc., set default values here
      file: new File([], ""), // default empty image source
      url: this.sanitizer.bypassSecurityTrustUrl('assets/default-image.jpg'), // a default alt text for the image
  };
  
    merchantImgClass: merchantImg = {
      merchantImgEmail: '',
      merchantImgModule: '',
      merchantImg: this.defaultImageHandle // Add a default value for the required merchantName property
    };
  
    imageUrl: any;
  constructor(private settingService:MerchantService,private sanitizer: DomSanitizer,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
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
      this.merchantImgClass.merchantImgEmail = String(sessionStorage.getItem('ownerEmail'));
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
        const ownerEmail = String(sessionStorage.getItem('ownerEmail'));
        const ownerImgModule = String(sessionStorage.getItem('ownerProfileImg'));
        this.settingService.getProfileImage(ownerEmail,ownerImgModule).subscribe(
          (data:any) => {
            console.log(data);
            this.createImage(data);
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

}
