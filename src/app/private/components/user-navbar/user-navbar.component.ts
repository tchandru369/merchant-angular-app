import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { imageHandle } from 'src/app/models/imageHandle.interface';
import { MerchantService } from '../../services/merchant.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

 

  userName :string="";
  userPhoto:any;
  userEmail:string="";
  userProfileImg:any;
  isCollapsed = false;


  constructor(private router:Router,private settingService : MerchantService,private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.userName = String(sessionStorage.getItem('ownerName'));
    this.userPhoto = String(sessionStorage.getItem('userPhoto'));
    this.userEmail = String(sessionStorage.getItem('ownerEmail'));

    this.getProfileImg();
  }

  toggleCollapse() {
  // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
  }
  

  moveToBillingPage(){
    console.log("Entered MoveToBilling")
    this.router.navigate(['private', 'billing']);
  }

  moveToAddProductPage(){
    console.log("Entered MoveToProducts")
    this.router.navigate(['private', 'add-products']);
  }

  userLogout() {
    console.log("Inside logout")
    this.router.navigate(['public', 'app-user-login']);
    sessionStorage.clear();
    }

    moveToUserDashboardPage() {
      console.log("Entered UserDashboard")
      this.router.navigate(['private', 'user-dashboard']);
    }

    moveToUserSettings() {
      this.router.navigate(['private', 'user-settings']);
      }
      moveToHistoryPage() {
        this.router.navigate(['private', 'user-history']);
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
      
            this.userProfileImg = finalFileHandle.url;
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
