import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { MilkProductDetails } from 'src/app/models/milkProduct.interface';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  userEmail:string = '';
  isLoading:boolean = false;
  isDataPresent:boolean=false;
    milkProdList:MilkProductDetails[]=[];

  demandProdList:{productName:string,productType:string,productPrice:string,productCustomerPrice:string,productQuantity:string
    ,productOwner:any }[]=[];
  displayedColumns: string[] = ['companyName', 'productType' ,'productName','productBillPrice', 'productShopPrice','productCustPrice','productQuantity'];
  constructor(private router:Router,private productService:ProductService,private snackbar:MatSnackBar,private dataPipe:DatePipe) { }

  ngOnInit(): void {
    this.viewDemandProdList();
    if(this.viewDemandProdList.length>0){
      this.isDataPresent = true;
    }else{
      this.isDataPresent = false;
    }
  }

  viewDemandProdList(){
        this.isLoading = true;
    this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
    this.productService.viewDemandProduct(this.userEmail).subscribe((data:any) => {
        this.milkProdList = data;
        console.log(data);
    })
    this.isLoading = false;
  }

}
