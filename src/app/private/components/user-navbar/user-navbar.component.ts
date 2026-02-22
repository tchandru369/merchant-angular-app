import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { imageHandle } from 'src/app/models/imageHandle.interface';
import { MerchantService } from '../../services/merchant.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css'],
})
export class UserNavbarComponent implements OnInit {
  userName: string = '';
  userPhoto: any;
  ownerRefId: string = '';
  userProfileImg: any;
  ownerEmail:string ='';
  isCollapsed = false;
  userType: string = '';
  custFlg: boolean = false;
  paymentRequestCount:number = 0;

  constructor(
    private router: Router,
    private settingService: MerchantService,
    private sanitizer: DomSanitizer,
    private auth: AuthService
  ) {

    this.router.events.pipe(
    filter(event => event instanceof NavigationEnd)
  ).subscribe(() => {
    this.setFocusOnContent();
  });
  }

  ngOnInit(): void {
    this.userName = String(sessionStorage.getItem('ownerName'));
    this.userPhoto = String(sessionStorage.getItem('userPhoto'));
    this.ownerRefId = String(sessionStorage.getItem('ownerRefId'));
    this.ownerEmail = String(sessionStorage.getItem('ownerEmail'))
    this.userType = this.auth.getUserRole();
    if (this.userType === 'Cust') {
      this.custFlg = true;
    }
    this.getProfileImg();
        this.onResize(new UIEvent('resize')); // Initialize the state based on current window size

  }

  ngAfterViewInit() {
    this.setFocusOnContent();
  }

  toggleCollapse() {
    // On desktop/tablet, the menu can never be fully closed
    this.isCollapsed = !this.isCollapsed;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    if (window.innerWidth <= 768) {
      this.isCollapsed = true; // Collapse on mobile
    } else {
      this.isCollapsed = false; // Expand on larger screens
    }
  }

  navigateAndCollapse(route: string) {
    this.router.navigate([route]).then(() => {
      this.isCollapsed = true; // Close the sidenav
      this.setFocusOnContent(); // Set focus on the content area
    }).catch(err => {
      console.error('Navigation error:', err); // Log any errors
    });
  }

setFocusOnContent() {
    const contentElement = document.querySelector('.content') as HTMLElement; // Ensure this selector matches your layout
    if (contentElement) {
      contentElement.setAttribute('tabindex', '-1'); // Make it focusable
      contentElement.focus(); // Focus on the content
    }
  }

  moveToCustRequestStatus() {
     this.navigateAndCollapse('private/cust-request-status');
  }

  moveToCustSettings() {
     this.navigateAndCollapse('private/cust-settings');
  }
  moveToCustHistoryPage() {
     this.navigateAndCollapse('private/cust-history');
  }
  moveToPlaceOrderPage() {
   this.navigateAndCollapse('private/cust-place-order');
   this.isCollapsed = true;
  }

  moveToBillingPage() {
    console.log('Entered MoveToBilling');
     this.navigateAndCollapse('private/billing');
  }

  moveToMyRequestPage() {
    console.log('Entered MoveToRequests');
    this.navigateAndCollapse('private/my-requests');
  }

  moveToAddProductPage() {
    console.log('Entered MoveToProducts');
    this.navigateAndCollapse('private/add-products');
  }

  moveToCustomerOverviewPage() {
    console.log('Entered MoveToCustomerOverview');
    this.navigateAndCollapse('private/user-customer-overview');
  }

  userLogout() {
    console.log('Inside logout');
    this.router.navigate(['public', 'app-user-login']);
    sessionStorage.clear();
  }

  moveToUserDashboardPage() {
    console.log('Entered UserDashboard');
   this.navigateAndCollapse('private/user-dashboard');
  }

  moveToUserSettings() {
    this.navigateAndCollapse('private/user-settings');
  }
  moveToHistoryPage() {
    this.navigateAndCollapse('private/user-history');
  }

  moveToCustMakePymtPage() {
    this.navigateAndCollapse('private/cust-make-payment');
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

    this.userProfileImg = finalFileHandle.url;
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
}
