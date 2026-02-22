import { Component, OnInit } from '@angular/core';
import { CustGraph } from 'src/app/models/custGraph.interface';
import { BillingService } from 'src/app/private/services/billing.service';

@Component({
  selector: 'app-cust-graph',
  templateUrl: './cust-graph.component.html',
  styleUrls: ['./cust-graph.component.css']
})
export class CustGraphComponent implements OnInit {

  labels: string[] = [];
  totalAmtData: number[] = [];
  balanceAmtData: number[] = [];
  prodQtyData: number[] = [];
  custGraphData:CustGraph[]=[];

  constructor(private customerService:BillingService) {
    this.prepareGraphData();
  }

  prepareGraphData() {
    this.labels = this.custGraphData.map(item => item.custFnlDate);
    console.log("labels :",this.labels);
    this.totalAmtData = this.custGraphData.map(item => item.custTotalAmt);
    console.log("totalAmtData :",this.totalAmtData);
    this.balanceAmtData = this.custGraphData.map(item => item.custBlnAmt);
    console.log("balanceAmtData :",this.balanceAmtData);
    this.prodQtyData = this.custGraphData.map(item => item.custProdQty);
    console.log("prodQtyData :",this.prodQtyData);
  }

  chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
 };

  chartData = {
    labels: this.labels,
    datasets: [
      {
        label: 'Total Amount',
        data: this.totalAmtData,
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.2)',
        fill: true
      },
      {
        label: 'Balance Amount',
        data: this.balanceAmtData,
        borderColor: 'orange',
        backgroundColor: 'rgba(255,165,0,0.2)',
        fill: true
      },
      {
        label: 'Product Qty',
        data: this.prodQtyData,
        borderColor: 'green',
        backgroundColor: 'rgba(0,255,0,0.2)',
        fill: true
      }
    ]
  };

  ngOnInit(): void {
    this.getCustGraphDetails();
  }
  getCustGraphDetails(){
    const ownerRefId = sessionStorage.getItem('ownerRefId');
    this.customerService
      .getCustGraphDetails(ownerRefId)
      .subscribe((data: any) => {
        this.custGraphData = data;
        console.log(data);
        this.prepareGraphData();

         this.chartData = {
        labels: this.labels,
        datasets: [
          { label: 'Total Amount', data: this.totalAmtData, borderColor: 'blue', backgroundColor: 'rgba(0,0,255,0.2)', fill: true },
          { label: 'Balance Amount', data: this.balanceAmtData, borderColor: 'orange', backgroundColor: 'rgba(255,165,0,0.2)', fill: true },
          { label: 'Product Qty', data: this.prodQtyData, borderColor: 'green', backgroundColor: 'rgba(0,255,0,0.2)', fill: true }
        ]
      };
      });
  }

}
