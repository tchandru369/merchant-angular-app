import { ConStDtls } from 'src/app/models/ConSt.interface';
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
import { ShopCustomer } from 'src/app/models/ShopCustomer.interface';
import { OrderRequest } from 'src/app/models/orderRequest.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditRequestDialogComponent } from '../edit-request-dialog/edit-request-dialog.component';

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
  genderList:string[]=['Male','Female','Others']
  conStDtls:ConStDtls[]=[];
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
  shopCustomer!:ShopCustomer;
  billing_add_count:number=0;
  validateCusFalse:boolean=false;
  userEmail:string="";
  searchProduct:string='';
  quantityProduct:string='';
  selectedProductQuantity:number=0;
  custValidate:boolean = false;

  prodQtyIndx:number=0;
  displayedColumns: string[] = ['productName', 'productPrice', 'productType', 'productQuantity'];
  productList1: productInterface[]=[];
  billingList:{productName?:string,productType?:string,productQuantity?:number,productOwner?:string,productShopPrice?:number,productCustPrice?:number
     productActualPrice?:number}[]=[];

     billingMilkList:{}[]=[];
  billingProducts:productInterface[]= [];
  prodQty :string='';
  prodType:string='';
  productName:string='';
  BillingPQty:number = 0;
  countryList:any[]=[];
  stateList:any[]=[];
  cityList:any[]=[];
  selectedCountry:string='';
  selectedState:string='';
  updateBrands:any[]=[];
  updateProducts:any[]=[];
  updateProductNames:any[]=[];
  orderReqList:OrderRequest[]=[];
  selectedUpdBrand:string = '';
  selectedUpdProduct:string = '';
  selectedUpdState:string='';
  orderRequest!:OrderRequest;
  
  constructor(private billingService : BillingService,private router:Router,private snackbar:MatSnackBar,private dataPipe:DatePipe,private dialog: MatDialog) { 
    
    this.orderRequest={
       orderCustName : '',
       orderCustPhoneNo:'',
       orderCustCrtdDate:'',
       orderCustOwnerName:'',
       orderCustEmailId:'',
       orderCustType:'',
       orderCustTotalPrice:0,
       orderFinalAmtPaid:0,
       orderList:[]
    };
    
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
   
    this.shopCustomer ={
      custType:'',
      custPanNo:'',
      custEmailId:'',
      custOwmerDetails:'',
      custDob:'',
      custPinCode:'',
      custState:'',
      custCity:'',
      custAddress:'',
      custPhoneNo:'',
      custName:'',
      custGender:'',
      custCountry:''
    }
  
  }

  ngOnInit(): void {
    this.viewProdList();
    this. viewConStList();
    this.getOwnerCustList();
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

  onUpdateCountryChange() {
    this.stateList = [
      ...new Set(this.conStDtls
        .filter(item => item.countryNames === this.billingCustomerCountry.value)
        .map(item => item.stateNames)),
    ];
    this.selectedUpdState = '';
    this.cityList = [];
  }

  onUpdateStateChange() {
    this.cityList = this.conStDtls
      .filter(
        item =>
          item.countryNames === this.billingCustomerCountry.value &&
          item.stateNames === this.billingCustomerState.value
      )
      .map(item => item.cityNames);
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
    billingCustomerPanNo : new FormControl(null,[Validators.required]),
    billingCustomerEmail:new FormControl(null,[Validators.required]),
    billingCustomerPhNo : new FormControl(null,[Validators.required]),
    billingCustomerPhNoToV: new FormControl(null,[Validators.required]),
    billingCustomerAddrs : new FormControl(null,[Validators.required]),
    billingCustomerType :new FormControl(null,[Validators.required]),
    billingCustomerDob : new FormControl(null,[Validators.required]),
    billingCustomerPinCode: new FormControl(null,[Validators.required]),
    billingCustomerState: new FormControl(null,[Validators.required]),
    billingCustomerCity: new FormControl(null,[Validators.required]),
    billingCustomerCountry:new FormControl(null,[Validators.required]),
    billingCustomerGender: new FormControl(null,[Validators.required]),
    billingCustomerViewGen:new FormControl(null,[Validators.required]),
    billingCustomerViewSte:new FormControl(null,[Validators.required]),
    billingCustomerViewCtry:new FormControl(null,[Validators.required]),
    billingCustomerViewCty:new FormControl(null,[Validators.required])
  });

  get billingCustomerViewGen():FormControl{
    return this.secondFormGroup.get('billingCustomerViewGen') as FormControl;
  }
  get billingCustomerViewSte():FormControl{
    return this.secondFormGroup.get('billingCustomerViewSte') as FormControl;
  }
  get billingCustomerViewCtry():FormControl{
    return this.secondFormGroup.get('billingCustomerViewCtry') as FormControl;
  }
  get billingCustomerViewCty():FormControl{
    return this.secondFormGroup.get('billingCustomerViewCty') as FormControl;
  }
  get billingCustomerName():FormControl{
    return this.secondFormGroup.get('billingCustomerName') as FormControl;
  }
  get billingCustomerGender():FormControl{
    return this.secondFormGroup.get('billingCustomerGender') as FormControl;
  }

  get billingCustomerPanNo():FormControl{
    return this.secondFormGroup.get('billingCustomerPanNo') as FormControl;
  }
  get billingCustomerDob():FormControl{
    return this.secondFormGroup.get('billingCustomerDob') as FormControl;
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
  get billingCustomerPinCode():FormControl{
    return this.secondFormGroup.get('billingCustomerPinCode') as FormControl;
  }
  get billingCustomerState():FormControl{
    return this.secondFormGroup.get('billingCustomerState') as FormControl;
  }
  get billingCustomerType():FormControl{
    return this.secondFormGroup.get('billingCustomerType') as FormControl;
  }
  get billingCustomerCity():FormControl{
    return this.secondFormGroup.get('billingCustomerCity') as FormControl;
  }
  get billingCustomerCountry():FormControl{
    return this.secondFormGroup.get('billingCustomerCountry') as FormControl;
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

  viewConStList(){
    this.billingService.viewConStDtls().subscribe((data:any) => {
        this.conStDtls = data;
        console.log(data);
        this.countryList = [...new Set(this.conStDtls.map(item => item.countryNames))];
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
            if(this.billingProductName.value == this.billingList[i].productName && this.billingProductType.value == this.billingList[i].productType && this.billingCompanyName.value == this.billingList[i].productOwner){
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
          
           //this.setSecondFormFeildsNull();
           this.secondFormGroup.reset();
           this.validateCusFalse = true;
           this.custValidate = false;
        }else{
          this.shopCustomer = data;
          this.custValidate = true;
        this.billingCustomerName.setValue(this.shopCustomer?.custName);
       this.billingCustomerEmail.setValue(this.shopCustomer?.custEmailId);
       this.billingCustomerAddrs.setValue(this.shopCustomer?.custAddress);
       this.billingCustomerPhNo.setValue(this.shopCustomer?.custPhoneNo);
       //this.billingCustomerUNo.setValue(this.customerInterface?.customerUniqueNo);
       this.billingCustomerType.setValue(this.shopCustomer?.custType);
       const [day, month, year] = this.shopCustomer?.custDob.split('-').map(Number);
  // Create date object in UTC (assume local time at midnight)
        const date = new Date(Date.UTC(year, month - 1, day));
       this.billingCustomerDob.setValue(date.toISOString());
       this.billingCustomerViewCty.setValue(this.shopCustomer?.custCity);
       this.billingCustomerViewCtry.setValue(this.shopCustomer?.custCountry);
       this.billingCustomerViewSte.setValue(this.shopCustomer?.custState);
       this.billingCustomerPanNo.setValue(this.shopCustomer?.custPanNo);
       this.billingCustomerViewGen.setValue(this.shopCustomer?.custGender);
       this.billingCustomerPinCode.setValue(this.shopCustomer?.custPinCode);


       this.validateCusFalse = false;
        }
    })

    
    }

    registerCustomer(){
       
      
        this.shopCustomer.custName = this.billingCustomerName.value;
        this.shopCustomer.custEmailId = this.billingCustomerEmail.value;
        this.shopCustomer.custAddress = this.billingCustomerAddrs.value;
        this.shopCustomer.custPhoneNo = this.billingCustomerPhNo.value;
        this.shopCustomer.custDob = this.dataPipe.transform(this.billingCustomerDob.value, 'dd-MM-yyyy')!;
        this.shopCustomer.custCity = this.billingCustomerCity.value;
        this.shopCustomer.custOwmerDetails =  sessionStorage.getItem('ownerEmail')|| '';
        this.shopCustomer.custPanNo = this.billingCustomerPanNo.value;
        this.shopCustomer.custPinCode = this.billingCustomerPinCode.value;
        this.shopCustomer.custState = this.billingCustomerState.value;
        
        this.shopCustomer.custCountry = this.billingCustomerCountry.value;
        if(this.billingCustomerGender.value == 'Male'){
          this.shopCustomer.custGender = 'M';
        }else if(this.billingCustomerGender.value == 'Female'){
          this.shopCustomer.custGender = 'F';
        }else if(this.billingCustomerGender.value == 'Others'){
          this.shopCustomer.custGender = 'O';}

          if(this.billingCustType.value === 'Shop'){
            this.shopCustomer.custType = 'S';
          }else if(this.billingCustType.value === 'Induvidual'){
            this.shopCustomer.custType = 'I';
          }

      this.billingService.registerCustomer(this.shopCustomer).subscribe((data:any) => {
        
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
      //this.billingCustomerUNo.setValue(null);
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
      
      this.totalPrice = this.billingList.reduce((total, product) => total +Number(product.productActualPrice), 0);
      const discountAmt = (this.totalPrice * this.CustomerDiscount/100);
      this.PayTotalPrice = this.totalPrice;
      this.PayTotalPriceDis = this.totalPrice - discountAmt;
      return this.totalPrice;
       
      }

      getOwnerCustList(){
        this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
        this.billingService.viewCustOrder(this.userEmail).subscribe((data:any) => {
            this.orderReqList = data;
            console.log(data);
        })
      }
      
      payForAddedProducts() {
       this.billingInterface.billingCustomerName = this.billingCustomerName.value;
       this.billingInterface.billingCustomerEmail = this.billingCustomerEmail.value;
       this.billingInterface.billingCustomerPhNo = this.billingCustomerPhNo.value;
       this.billingInterface.billingCustomerAddress = this.billingCustomerAddrs.value;
       //this.billingInterface.billingAmtPaid = this.billingFinalAmtPaid.value;
      // this.billingInterface.billingDuePrice = String(this.PayTotalPrice - Number(this.billingFinalAmtPaid.value));
       const currentDate = new Date();
      const curD = this.dataPipe.transform(new Date(), 'dd-MM-yyyy')!;
       this.billingInterface.billingDate = String(curD);
       this.billingInterface.billingTotalPrice = String(this.PayTotalPrice);
       this.billingInterface.billingTotalPriceTax = String(this.PayTotalPriceDis);

       this.billingInterface.billingTotalProductQty = String(this.getTotalProduct());
       // this.billingInterface.productDetails = this.billingList;
        console.log(this.billingInterface);
        this.billingService.payBillCustomer(this.billingInterface).subscribe((data:any) => {
        
          console.log(data);
          if(data.response == "success"){
            this.snackbar.open(` Bill Payed : ${data.errorMsg} `,'close',{
              duration: 5000,horizontalPosition:'center',verticalPosition:'top'
             })
          }
      })
      }

      registerOrder(){
        const dialogRef = this.dialog.open(EditRequestDialogComponent, {
            width: '400px',  // Clone to avoid mutating directly
          });
        
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              // User confirmed deletion
              this.registerOrderRequest();
              console.log('order Request added');
            } else {
              // User canceled
              console.log('Order Request cancelled canceled');
            }
          });
      }
      registerOrderRequest(){

        
        const curD = this.dataPipe.transform(new Date(), 'dd-MM-yyyy')!;
        this.orderRequest.orderCustCrtdDate = String(curD);
        this.orderRequest.orderCustEmailId = this.billingCustomerEmail.value;
        this.orderRequest.orderCustName = this.billingCustomerName.value;
        this.orderRequest.orderCustOwnerName = sessionStorage.getItem('ownerEmail')|| '';
        this.orderRequest.orderCustPhoneNo = this.billingCustomerPhNo.value;
        this.orderRequest.orderCustTotalPrice = this.totalPrice;
        //this.orderRequest.orderCustType = this.billingCustomerType.value;

        if(this.billingCustType.value === 'Shop'){
          this.orderRequest.orderCustType = 'S';
        }else if(this.billingCustType.value === 'Induvidual'){
          this.orderRequest.orderCustType = 'I';
        }

        for(let i=0;i<this.billingList.length;i++){
          this.orderRequest.orderList.push({orderCustProdCmp:this.billingList[i].productOwner||'',orderCustProdName:this.billingList[i].productName||'',
            orderCustProdQty:this.billingList[i].productQuantity||0,orderCustProdPrice:this.billingList[i].productActualPrice||0,orderCustProdType:this.billingList[i].productType||''});
        }
       console.log(this.orderRequest);

       this.billingService.addOrderRequest(this.orderRequest).subscribe((data:any) => {
        
        console.log(data);
        if(data.response == "success"){
          this.snackbar.open(` Request Addition : ${data.errorMsg} `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
        }else{
          this.snackbar.open(`${data.errorMsg} `,'close',{
            duration: 5000,horizontalPosition:'center',verticalPosition:'top'
           })
        }
    })
      }
   
}
