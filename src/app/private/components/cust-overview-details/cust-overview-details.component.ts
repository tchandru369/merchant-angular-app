import { Component, Input, OnInit } from '@angular/core';
import { customerProfile } from 'src/app/models/customerProfile.interface';
import { custSummary } from 'src/app/models/custSummary.interface';

@Component({
  selector: 'app-cust-overview-details',
  templateUrl: './cust-overview-details.component.html',
  styleUrls: ['./cust-overview-details.component.css']
})
export class CustOverviewDetailsComponent implements OnInit {

  displayBalance: string[] = ['custBalDate', 'custBalActAmt' ,'custBalAmt','custBalOrderStatus'];
  displayLastTrans : string[] = ['orderPlacedDate','orderBillPayDate','orderProdTotalAmt','orderReqStatus'];


  constructor() { }

  ngOnInit(): void {
  }

    @Input() customer!: custSummary;
}
