import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BillingService } from '../../services/billing.service';
import { Router } from '@angular/router';
import { productInterface } from 'src/app/models/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { customer } from 'src/app/models/customer.interface';
import { billingInterface } from 'src/app/models/billing.interface';
import { DatePipe } from '@angular/common';
import { MilkProductDetails } from 'src/app/models/milkProduct.interface';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
  providers: [DatePipe] 
})
export class BillingComponent implements OnInit {


  selectedProdValues: any = null;
  productInterface!: productInterface;
  milkProdList:MilkProductDetails[]=[];
  customerType: string[] = ['Shop', 'Individual'];
  listTotalPrice:number = 0;
  CustomerDiscount:number=0;
  PayTotalPrice:number=0;
  actualPriceProd:number = 0;
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
  billingList:{productName?:string,productType?:string,productQuantity?:string,productOwner?:string,productShopPrice?:number,productCustPrice?:number
     productActualPrice?:number}[]=[];

     billingMilkList:{}[]=[];
  billingProducts:productInterface[]= [];
  prodQty :string='';
  prodType:string='';
  productName:string='';
  BillingPQty:number = 0;
  updateBrands:any[]=[];
  updateProducts:any[]=[];
  updateProductNames:any[]=[];
  selectedUpdBrand:string = '';
  selectedUpdProduct:string = '';
  
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
      billingAmtPaid:'',
      billingDuePrice:'',
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

  onUpdateBrandChange() {
    this.updateProducts = [
      ...new Set(this.milkProdList
        .filter(item => item.companyName === this.billingCompanyName.value)
        .map(item => item.productType)),
    ];
    this.selectedUpdProduct = '';
    this.updateProductNames = [];
    console.log(this.updateProducts);
  }

  onUpdateProductChange() {
    this.updateProductNames = this.milkProdList
      .filter(
        item =>
          item.companyName === this.billingCompanyName.value &&
          item.productType === this.billingProductType.value
      )
      .map(item => item.productName);
  }

  onUpdateQuantityChange(){
    this.selectedProdValues = this.milkProdList.find(
      p =>
        p.companyName === this.billingCompanyName.value &&
        p.productType ===this.billingProductType.value &&
        p.productName === this.billingProductName.value
    );
    
    if(this.selectedProdValues){
      this.billingProductBillPrice.setValue(this.selectedProdValues.productBillPrice);
      this.billingProductShopPrice.setValue(this.selectedProdValues.productShopPrice);
      this.billingProductCustPrice.setValue(this.selectedProdValues.productCustPrice);
      this.billingProductQuantity.setValue(this.selectedProdValues.productQuantity);
    }
  }

  

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    billingProductName : new FormControl(null,[Validators.required]),
    billingProductType : new FormControl( null,[Validators.required]),
    billingCompanyName : new FormControl(null,[Validators.required]),
    billingProductQuantity : new FormControl(null,[Validators.required]),
    billingProductBillPrice:new FormControl(null,[Validators.required]),
    billingProductCustPrice:new FormControl(null,[Validators.required]),
    billingProductShopPrice:new FormControl(null,[Validators.required]),
    billingProductCreatedDate:new FormControl(null,[Validators.required]),
    billingProductOwner:new FormControl(null,[Validators.required]),
    billingCustType:new FormControl(null,[Validators.required]),
    billingActualProdQty:new FormControl(null,[Validators.required])
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    billingCustomerName : new FormControl(null,[Validators.required]),
    billingCustomerUNo : new FormControl(null,[Validators.required]),
    billingCustomerEmail:new FormControl(null,[Validators.required]),
    billingCustomerPhNo : new FormControl(null,[Validators.required]),
    billingCustomerPhNoToV: new FormControl(null,[Validators.required]),
    billingCustomerAddrs : new FormControl(null,[Validators.required]),
    billingCustomerType :new FormControl(null,[Validators.required]),
    billingFinalAmtPaid : new FormControl(null,[Validators.required])
  });

  get billingCustomerName():FormControl{
    return this.secondFormGroup.get('billingCustomerName') as FormControl;
  }

  get billingFinalAmtPaid():FormControl{
    return this.secondFormGroup.get('billingFinalAmtPaid') as FormControl;
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
 
  get billingActualProdQty():FormControl{
    return this.firstFormGroup.get('billingActualProdQty') as FormControl;
  }
  get billingCustType():FormControl{
    return this.firstFormGroup.get('billingCustType') as FormControl;
  }
  get billingCompanyName():FormControl{
    return this.firstFormGroup.get('billingCompanyName') as FormControl;
  }
  get billingProductQuantity():FormControl{
    return this.firstFormGroup.get('billingProductQuantity') as FormControl;
  }
  get billingProductOwner():FormControl{
    return this.firstFormGroup.get('billingProductOwner') as FormControl;
  }
  get billingProductName():FormControl{
    return this.firstFormGroup.get('billingProductName') as FormControl;
  }
  get billingProductType():FormControl{
    return this.firstFormGroup.get('billingProductType') as FormControl;
  }
  get billingProductCreatedDate():FormControl{
    return this.firstFormGroup.get('billingProductCreatedDate') as FormControl;
  }
  get billingProductBillPrice():FormControl{
    return this.firstFormGroup.get('billingProductBillPrice') as FormControl;
  }
  get billingProductCustPrice():FormControl{
    return this.firstFormGroup.get('billingProductCustPrice') as FormControl;
  }
  get billingProductShopPrice():FormControl{
    return this.firstFormGroup.get('billingProductShopPrice') as FormControl;
  }
  isLinear = false;

  viewProdList(){
    this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
    this.billingService.viewOwnerMilkProd(this.userEmail).subscribe((data:any) => {
        this.milkProdList = data;
        console.log(data);
        this.updateBrands = [...new Set(this.milkProdList.map(item => item.companyName))];
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
    
        
         this.billingCompanyName.setValue(sessionStorage.getItem(sessionStorage.getItem('ownerEmail') || ''))
          if(this.billingProductQuantity.value < this.billingActualProdQty.value){
            this.snackbar.open(`Stock available only : ${this.BillingPQty}`,'close',{
              duration: 5000,horizontalPosition:'center',verticalPosition:'top'
             })
          }else{

          const actualShopPriceForItem = this.billingProductShopPrice.value;
          const actualCustPriceForItem = this.billingProductCustPrice.value;
          if(this.billingCustType.value === 'Shop'){
            this.actualPriceProd = this.billingActualProdQty.value * actualShopPriceForItem;
          }else if(this.billingCustType.value === 'Individual'){
            this.actualPriceProd = this.billingActualProdQty.value * actualCustPriceForItem;
          }
          for(let i=0;i<this.billingList.length;i++){
            if(this.billingProductName.value == this.milkProdList[i].productName && this.billingProductType.value == this.milkProdList[i].productType && this.billingCompanyName.value == this.milkProdList[i].companyName){
              this.billing_add_count = this.billing_add_count+1;
            }
           }
           if(this.billing_add_count == 0){
            this.billingList.push({productName:this.billingProductName.value,productType:this.billingProductType.value,
              productQuantity:this.billingActualProdQty.value,productOwner:this.billingCompanyName.value,
              productShopPrice:this.billingProductShopPrice.value,productCustPrice:this.billingProductCustPrice.value,
              productActualPrice:this.actualPriceProd});
             this.setFirstFormFieldNull() 
           }else{
            this.setFirstFormFieldNull() 

           }
           this.billing_add_count == 0;
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

    setFirstFormFieldNull(){
      this.billingProductName.reset(); 
    this.billingProductType.reset(); 
    this.billingCompanyName.reset(); 
    this.billingProductQuantity.reset();  
    this.billingProductBillPrice.reset();
    this.billingProductCustPrice.reset();
    this.billingProductShopPrice.reset();
    this.billingProductCreatedDate.reset();
    this.billingProductOwner.reset();
    this.billingActualProdQty.reset();
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
      
      //this.totalPrice = this.billingList.reduce((total, product) => total +Number(product.productPrice), 0);
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
       this.billingInterface.billingAmtPaid = this.billingFinalAmtPaid.value;
       this.billingInterface.billingDuePrice = String(this.PayTotalPrice - Number(this.billingFinalAmtPaid.value));
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
