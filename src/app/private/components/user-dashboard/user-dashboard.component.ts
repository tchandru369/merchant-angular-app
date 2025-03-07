import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userEmail:string = '';
  demandProdList:{productName:string,productType:string,productPrice:string,productCustomerPrice:string,productQuantity:string
    ,productOwner:any }[]=[];
  displayedColumns: string[] = ['productName', 'productPrice' ,'productCustomerPrice','productType', 'productQuantity'];
  constructor(private router:Router,private productService:ProductService) { }

  ngOnInit(): void {
    this.viewDemandProdList();
  }

  viewDemandProdList(){
    this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
    this.productService.viewDemandProduct(this.userEmail).subscribe((data:any) => {
        this.demandProdList = data;
        console.log(data);
    })
  }

}
