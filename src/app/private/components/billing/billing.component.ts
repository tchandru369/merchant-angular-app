import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../../services/billing.service';
import { Router } from '@angular/router';
import { productInterface } from 'src/app/models/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { customer } from 'src/app/models/customer.interface';
import { billingInterface } from 'src/app/models/billing.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers: [DatePipe] 
})
export class BillingComponent implements OnInit {


  productInterface!: productInterface;
  CustomerDiscount:number=0;
  PayTotalPrice:number=0;
  PayTotalPriceDis:number = 0;
  customerInterface !: customer;
  BillingPPrice: number = 0;
  totalPrice:number=0;
  payTotalProductQty:number=0;
  billingInterface!: billingInterface;
  billing_add_count:number=0;
  validateCusFalse:boolean=false;
  userEmail:string="";
  searchProduct:string='';
  quantityProduct:string='';
  selectedProductQuantity:number=0;
  prodQtyIndx:number=0;
  displayedColumns: string[] = ['productName', 'productPrice', 'productType', 'productQuantity'];
  productList1: productInterface[]=[];
  billingList:{productName?:string,productType?:string,productCustomerPrice?:string,productPrice?:string,productQuantity?:string,productOwner?:string
     }[]=[];
  billingProducts:productInterface[]= [];
  prodQty :string='';
  prodType:string='';
  productName:string='';
  BillingPQty:number = 0;
  
  constructor(private billingService : BillingService,private router:Router,private snackbar:MatSnackBar,private dataPipe:DatePipe) { 
    this.billingInterface = {
      billingCustomerName: '',
      billingCustomerEmail: '',
      billingCustomerPhNo: '',
      billingCustomerAddress: '',
      billingDate: '',
      billingTotalProductQty: '',
      billingTotalPrice: '',
      billingTotalPriceTax: '',
      productDetails: []
    };

    this.customerInterface = {
      customerAddress :'',
      customerName:'',
      customerEmail:'',
      customerPhoneNo:'',
      customerType:'',
      customerUniqueNo:''
    }
  }

  ngOnInit(): void {
    this.viewProdList();
    // this.firstFormGroup
    //   .get('billingProductName') 
    //   ?.valueChanges.subscribe((selectedProduct:productInterface | null) => {
    //     if (selectedProduct) {
    //       // Set the product type based on the selected product
    //       for(let i=0;i<this.productList1.length;i++){
    //         if(this.billingProductName.value == this.productList1[i].productName){
    //          this.prodQtyIndx = i;
    //         }
    //        }
    //        const selectedProductIndex = this.productList1.findIndex(product => product.productName === selectedProduct.productName);
    //       if (selectedProductIndex !== -1) {
    //         const selectedProduct = this.productList1[selectedProductIndex];
    //         // Ensure billingProductType gets assigned `null` if it's not a valid type

    //         this.billingProductType.setValue(selectedProduct.productType);
    //         this.firstFormGroup.patchValue({
    //           billingProductType: selectedProduct.productType ? undefined : null,
    //         });
    //       } else {
    //         // If product is not found, set billingProductType to null
    //         this.firstFormGroup.patchValue({
    //           billingProductType: null,
    //         });
    //       }
    //     }
    //   });
  }

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    billingProductName : new FormControl(null,[Validators.required]),
    billingProductType : new FormControl( [null as string | null],[Validators.required,Validators.email]),
    billingProductPrice : new FormControl(null,[Validators.required]),
    billingProductQuantity : new FormControl(null,[Validators.required]),
    billingsearchProduct:new FormControl(null,[Validators.required])
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    billingCustomerName : new FormControl(null,[Validators.required]),
    billingCustomerUNo : new FormControl(null,[Validators.required]),
    billingCustomerEmail:new FormControl(null,[Validators.required]),
    billingCustomerPhNo : new FormControl(null,[Validators.required]),
    billingCustomerPhNoToV: new FormControl(null,[Validators.required]),
    billingCustomerAddrs : new FormControl(null,[Validators.required]),
    billingCustomerType :new FormControl(null,[Validators.required])
  });

  get billingCustomerName():FormControl{
    return this.secondFormGroup.get('billingCustomerName') as FormControl;
  }
  get billingCustomerUNo():FormControl{
    return this.secondFormGroup.get('billingCustomerUNo') as FormControl;
  }
  get billingCustomerEmail():FormControl{
    return this.secondFormGroup.get('billingCustomerEmail') as FormControl;
  }
  get billingCustomerPhNo():FormControl{
    return this.secondFormGroup.get('billingCustomerPhNo') as FormControl;
  }
  get billingCustomerPhNoToV():FormControl{
    return this.secondFormGroup.get('billingCustomerPhNoToV') as FormControl;
  }
  get billingCustomerAddrs():FormControl{
    return this.secondFormGroup.get('billingCustomerAddrs') as FormControl;
  }
  get billingCustomerType():FormControl{
    return this.secondFormGroup.get('billingCustomerType') as FormControl;
  }


  get billingsearchProduct():FormControl{
    return this.firstFormGroup.get('billingsearchProduct') as FormControl;
  }
  get billingProductName():FormControl{
    return this.firstFormGroup.get('billingProductName') as FormControl;
  }
  get billingProductType():FormControl{
    return this.firstFormGroup.get('billingProductType') as FormControl;
  }
  get billingProductPrice():FormControl{
    return this.firstFormGroup.get('billingProductPrice') as FormControl;
  }
  get billingProductQuantity():FormControl{
    return this.firstFormGroup.get('billingProductQuantity') as FormControl;
  }
  isLinear = false;

  viewProdList(){
    this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
    this.billingService.viewProduct(this.userEmail).subscribe((data:any) => {
        this.productList1 = data;
        console.log(data);
    })
  }

  get filteredAndSortedProducts() {
    const searchTerm = this.firstFormGroup.get('billingsearchProduct')?.value || '';// Log search term

  return this.productList1.filter(product => {
    const productName = product.productName?.toLowerCase() || ''; // Log product name
    return productName.includes(searchTerm.toLowerCase());
  });
  }
   
  getProductType(): any {
    for(let i=0;i<this.productList1.length;i++){
      if(this.billingProductName.value == this.productList1[i].productName){
       this.prodQtyIndx = i;
      }
     }
     this.prodQty = this.productList1[this.prodQtyIndx].productQuantity?.toString() || '';
    this.prodType = this.productList1[this.prodQtyIndx].productType?.toString() || '';

     return this.prodType;
  }

  onSelectionChange() {
    console.log("Inside the selection Range")
    for(let i=0;i<this.productList1.length;i++){
      if(this.billingProductName.value == this.productList1[i].productName){
       this.prodQtyIndx = i;
      }
     }
     this.prodQty = this.productList1[this.prodQtyIndx].productQuantity?.toString() || '';
     console.log(this.prodQty);
  }
  
  onchangeOfProductName(value : string) {
    for(let i=0;i<this.productList1.length;i++){
      if(this.billingProductName.value == this.productList1[i].productName){
       this.prodQtyIndx = i;
      }
     }
  
     this.productInterface.productName = this.productList1[this.prodQtyIndx].productName;
     this.productInterface.productOwner = this.productList1[this.prodQtyIndx].productOwner;
     this.productInterface.productPrice = this.productList1[this.prodQtyIndx].productPrice;
     this.productInterface.productQuantity = this.productList1[this.prodQtyIndx].productQuantity;
     this.productInterface.productType = this.productList1[this.prodQtyIndx].productType;
  
     console.log(this.productInterface);
  }

  addProductForBilling() {
        this.productName = this.billingProductName.value.productName;
        this.selectedProductQuantity = this.billingProductQuantity.value;
        


        console.log(this.productName);

           for(let i=0;i<this.productList1.length;i++){
            if(this.productName == this.productList1[i].productName){
             this.prodQtyIndx = i;
            }
           }
            console.log(this.prodQtyIndx);

         const BillingProductName = this.productList1[this.prodQtyIndx].productName;
         this.BillingPPrice = Number(this.productList1[this.prodQtyIndx].productCustomerPrice);
          this.BillingPQty = Number(this.productList1[this.prodQtyIndx].productQuantity);
          const BillingProductType = this.productList1[this.prodQtyIndx].productType;
          const BillingProductOwner = this.productList1[this.prodQtyIndx].productOwner;
          if(this.BillingPQty < this.selectedProductQuantity ){
            this.snackbar.open(`Stock available only : ${this.BillingPQty}`,'close',{
              duration: 5000,horizontalPosition:'center',verticalPosition:'top'
             })
          }else{
          const actualPriceForItem = String(this.BillingPPrice);
          const actualPrice = String(this.selectedProductQuantity * this.BillingPPrice);
          const actualQuantity = String(this.selectedProductQuantity);
          for(let i=0;i<this.billingList.length;i++){
            if(BillingProductName == this.billingList[i].productName){
              this.billing_add_count = this.billing_add_count+1;
            }
           }
           if(this.billing_add_count == 0){
            this.billingList.push({productName:BillingProductName,productType:BillingProductType
              ,productCustomerPrice:actualPriceForItem, productPrice:actualPrice,productQuantity:actualQuantity,productOwner:BillingProductOwner});
             this.firstFormGroup.reset(); 
           }else{
            this.firstFormGroup.reset(); 

           }
           this.billing_add_count = 0;
           console.log(this.billingList);
           
          }

    }

    removeItem(element:any) {
      this.billingList.forEach((values,index) => {
        if(values == element){
          this.billingList.splice(index,1);
        }
      })
    }
  
    validateCustomerByPhNo(){
      const customerPhToV = this.billingCustomerPhNoToV.value;
      this.billingService.validateCustomerByPhNo(customerPhToV).subscribe((data:any) => {
        
        console.log(data);
        if(data.response == "failure"){
          const errorMessage = data.errorMsg;
          const errorCodes = data.errorCode;
          this.snackbar.open(` ${errorMessage} : ${errorCodes} `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
          
           this.setSecondFormFeildsNull();
           this.validateCusFalse = true;
        }else{
          this.customerInterface = data;
        this.billingCustomerName.setValue(this.customerInterface?.customerName);
       this.billingCustomerEmail.setValue(this.customerInterface?.customerEmail);
       this.billingCustomerAddrs.setValue(this.customerInterface?.customerAddress);
       this.billingCustomerPhNo.setValue(this.customerInterface?.customerPhoneNo);
       this.billingCustomerUNo.setValue(this.customerInterface?.customerUniqueNo);
       this.billingCustomerType.setValue(this.customerInterface?.customerType);
       this.validateCusFalse = false;
        }
    })

    
    }

    registerCustomer(){
       
      
        this.customerInterface.customerName = this.billingCustomerName.value;
        this.customerInterface.customerEmail = this.billingCustomerEmail.value;
        this.customerInterface.customerAddress = this.billingCustomerAddrs.value;
        this.customerInterface.customerPhoneNo = this.billingCustomerPhNo.value;
      
      

      this.billingService.registerCustomer(this.customerInterface).subscribe((data:any) => {
        
        console.log(data);
        if(data.response == "success"){
          this.snackbar.open(` Customer registration : ${data.response} `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
        }
    })
    }

    setSecondFormFeildsNull(){
      this.billingCustomerName.setValue(null);
      this.billingCustomerEmail.setValue(null);
      this.billingCustomerAddrs.setValue(null);
      this.billingCustomerPhNo.setValue(null);
      this.billingCustomerUNo.setValue(null);
      this.billingCustomerType.setValue(null);
    }

    getTotalProduct() :number{

     return this.payTotalProductQty = this.billingList.reduce((total, product) => total +Number(product.productQuantity), 0);
      
    }

    getTotalPrice() : number{
      const customerType = this.billingCustomerType.value;
      if(customerType === 'B'){
         this.CustomerDiscount = 5;
      }else if(customerType === 'S'){
        this.CustomerDiscount = 8;
      }else if(customerType === 'E'){
        this.CustomerDiscount = 10;
      }
      else{
        this.CustomerDiscount = 0;
      }
      
      this.totalPrice = this.billingList.reduce((total, product) => total +Number(product.productPrice), 0);
      const discountAmt = (this.totalPrice * this.CustomerDiscount/100);
      this.PayTotalPrice = this.totalPrice;
      this.PayTotalPriceDis = this.totalPrice - discountAmt;
      return this.totalPrice - discountAmt;
       
      }
      
      payForAddedProducts() {
       this.billingInterface.billingCustomerName = this.billingCustomerName.value;
       this.billingInterface.billingCustomerEmail = this.billingCustomerEmail.value;
       this.billingInterface.billingCustomerPhNo = this.billingCustomerPhNo.value;
       this.billingInterface.billingCustomerAddress = this.billingCustomerAddrs.value;
       const currentDate = new Date();
      const curD = this.dataPipe.transform(new Date(), 'dd-MM-yyyy')!;
       this.billingInterface.billingDate = String(curD);
       this.billingInterface.billingTotalPrice = String(this.PayTotalPrice);
       this.billingInterface.billingTotalPriceTax = String(this.PayTotalPriceDis);
       this.billingInterface.billingTotalProductQty = String(this.getTotalProduct());
        this.billingInterface.productDetails = this.billingList;
        console.log(this.billingInterface);
        this.billingService.payBillCustomer(this.billingInterface).subscribe((data:any) => {
        
          console.log(data);
          if(data.response == "success"){
            this.snackbar.open(` Bill Payed : ${data.response} `,'close',{
              duration: 5000,horizontalPosition:'center',verticalPosition:'top'
             })
          }
      })
      }
   
}
