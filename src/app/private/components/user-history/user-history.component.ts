import { billingHistory } from './../../../models/billingHistory.interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../../services/billing.service';
import { billingHistFullPaid } from 'src/app/models/billingHistFullPaid.interface';
import { billingHistDueList } from 'src/app/models/billingHistDueList.interface';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {


  billHistoryList : billingHistory[]=[];
  userEmail:string='';
  billFullPaidList:billingHistFullPaid[]=[];
  billUniqueDates :billingHistory[]=[];
  filterBillsFullPaid:billingHistFullPaid[]=[];
  filterBillsDueAmt:billingHistDueList[]=[];
  billPaidHistory:{custInvoiceIdRes:string,custEmailIdRes:string,custPhnNoRes:string,custPaidAmtRes:number,custDueAmtRes:number
    ,custTotalAmtRes:number,custFullPaidFlgRes:string,custInvoiceDateRes:string }[]=[];
  billDueAmtList:billingHistDueList[]=[];
  displayFullPaid: string[] = [
    'custEmailIdRes',
    'custInvoiceIdRes',
    'custInvoiceDateRes',
    'custTotalAmtRes',
    'custDueAmtRes',
    'custPaidAmtRes'
  ];

  displayDuePaid: string[] = [
    'custEmailIdRes',
    'custInvoiceIdRes',
    'custInvoiceDateRes',
    'custTotalAmtRes',
    'custDueAmtRes',
    'custPaidAmtRes'
  ];
custInvoiceDate: any;
selectedDate: string='';

getUniqueDates(bills: billingHistory[]) {
  const uniqueDates = bills.filter((value, index, self) =>
    self.findIndex(bill => bill.custInvoiceDateRes === value.custInvoiceDateRes) === index
  );
  return uniqueDates;
}
  constructor(private router:Router,private billingService:BillingService,private cdr: ChangeDetectorRef) {


   }

  ngOnInit(): void {

    this.viewBillHistoryList();
    
   
  }

  viewBillHistoryList(){
    this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
    this.billingService.viewBillHistory(this.userEmail).subscribe((data:any) => {
        this.billHistoryList = data;
        console.log(data);
        // this.segregateListData(data);
       
        console.log("This is fullPaidList",this.billHistoryList);
        this.segregateListDatas(this.billHistoryList);
    })
  }

  // segregateListData(data:any){
  //   for(let i=0;i<data.length;i++){
      
  //     if(data[i].custFullPaidFlgRes == "0"){
  //       let myObject: billingHistFullPaid = {
  //         custAmtPaid: data[i].custPaidAmtRes,
  //         custDueAmt:data[i].custDueAmtRes,
  //         custEmailId:data[i].custEmailIdRes,
  //         custInvoiceDate:data[i].custInvoiceDateRes,
  //         custInvoiceId: data[i].custInvoiceIdRes,
  //         custTotalAmt:data[i].custTotalAmtRes
  //       };
  //       this.billFullPaidList.push(myObject);
  //     }else{
  //       let myObject1: billingHistDueList = {
  //         custAmtPaid: data[i].custPaidAmtRes,
  //         custDueAmt:data[i].custDueAmtRes,
  //         custEmailId:data[i].custEmailIdRes,
  //         custInvoiceDate:data[i].custInvoiceDateRes,
  //         custInvoiceId: data[i].custInvoiceIdRes,
  //         custTotalAmt:data[i].custTotalAmtRes
  //       };
  //       this.billDueAmtList.push(myObject1);
  //     }
  //   }
  //   console.log(this.billDueAmtList);
  //   console.log(this.billFullPaidList);


  // }

  segregateListDatas(billHistoryList : billingHistory[]){
    
    this.billFullPaidList = billHistoryList.filter(product=>product.custFullPaidFlgRes === "Y");
    this.billDueAmtList = billHistoryList.filter(product=>product.custFullPaidFlgRes === "N");
    this.billUniqueDates = this.getUniqueDates(billHistoryList);
    console.log(this.billDueAmtList);
    console.log(this.billFullPaidList);


  }

  populateSelectedList() {
    if (this.selectedDate) {
      this.filterBillsFullPaid = this.billFullPaidList.filter(
        bill => bill.custInvoiceDateRes === this.selectedDate
      );
      this.filterBillsDueAmt = this.billDueAmtList.filter(
        bill => bill.custInvoiceDateRes === this.selectedDate
      );
    console.log("Full paid list dated ",this.filterBillsFullPaid);
    console.log("Due Amt paid list ",this.filterBillsDueAmt);
    } else {
      this.filterBillsFullPaid = [];
      this.filterBillsDueAmt = [];
    }
    }



}
