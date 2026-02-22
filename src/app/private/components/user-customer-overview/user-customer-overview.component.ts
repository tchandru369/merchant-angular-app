import { Component, Input, OnInit } from '@angular/core';
import { customerProfile } from 'src/app/models/customerProfile.interface';
import { BillingService } from '../../services/billing.service';
import { custSummary } from 'src/app/models/custSummary.interface';

@Component({
  selector: 'app-user-customer-overview',
  templateUrl: './user-customer-overview.component.html',
  styleUrls: ['./user-customer-overview.component.css']
})
export class UserCustomerOverviewComponent implements OnInit {

  

  ngOnInit(): void {
  }
  selectedCustomer: custSummary | null = null;
isDetailLoading: boolean = false;
userEmail:string='';

constructor(private billingService: BillingService) {}

onCustomerSelected(customer: customerProfile) {
  this.isDetailLoading = true;
  this.userEmail = sessionStorage.getItem('ownerRefId')|| '';
  this.billingService.customerDetailSummary(customer.custRefId,this.userEmail).subscribe({
    next: (data: custSummary) => {
      this.selectedCustomer = data;
      this.isDetailLoading = false;
    },
    error: (err) => {
      console.error('Error loading customer details:', err);
      this.isDetailLoading = false;
    }
  });
}
  

}
