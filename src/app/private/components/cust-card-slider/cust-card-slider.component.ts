import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { customerProfile } from 'src/app/models/customerProfile.interface';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'app-cust-card-slider',
  templateUrl: './cust-card-slider.component.html',
  styleUrls: ['./cust-card-slider.component.css']
})
export class CustCardSliderComponent implements OnInit {

  isLoading:boolean = false;
  userEmail:string = '';
  
  constructor(private billingService:BillingService) {

   }

  ngOnInit(): void {
    this.getCustomerListByOwnerE();
  }
  
  @Input() customers: customerProfile[] = [];
  @Output() customerSelected = new EventEmitter<customerProfile>();

  @ViewChild('cardContainer', { static: true }) cardContainer!: ElementRef;

  select(customer: customerProfile) {
    this.customerSelected.emit(customer);
  }

 scrollLeft() {
  this.cardContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
}

scrollRight() {
  this.cardContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
}

getCustomerListByOwnerE(){
      this.isLoading = true;
      this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
      this.billingService.customerListByOwner(this.userEmail).subscribe((data:any) => {
        this.isLoading = false;
          this.customers = data;
          console.log(data);
      })
      this.isLoading = false;
    }
}
