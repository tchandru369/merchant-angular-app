import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { productInterface } from 'src/app/models/product.interface';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MilkProductDetails } from 'src/app/models/milkProduct.interface';
import { compList } from 'src/app/models/compList.interface';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {


  count : any = 0;
  selectedProdValues: any = null;
  productList1: productInterface[]=[];
  milkProdList:MilkProductDetails[]=[];
  compList:compList[]=[];
  productInterface!: productInterface;
  milkProdDetails!:MilkProductDetails;
  displayedColumns: string[] = ['companyName', 'productType' ,'productName','productBillPrice', 'productShopPrice','productCustPrice','productQuantity'];
  displayProdList : string[] = ['productNameL','productPriceL','productCustomerPriceL','productTypeL','productQuantityL'];
  userEmail:string="";
  checkList:boolean=false;
  prodQtyIndx:number=0;
  checkListUpdate:boolean = false;
  brands: any[] = [];
  products: any[] = [];
  productNames: any[] = [];

  updateBrands:any[]=[];
  updateProducts:any[]=[];
  updateProductNames:any[]=[];

  selectedUpdBrand:string = '';
  selectedUpdProduct:string = '';

  selectedBrand: string = '';
  selectedProduct: string = '';

  productList:{companyName:string,productQuantity:number,productShopPrice:number,productCustPrice:number,productBillPrice:number
    ,productOwner:any,productType:string,productName:string }[]=[];

    constructor(private productService:ProductService,private router:Router, private snackbar:MatSnackBar) {
          this.productInterface  ={

            productName:'',
            productType:'',
            productPrice:'',
            productOwner:'',
            productCustomerPrice:'',
            productQuantity:''
          }; 

          this.milkProdDetails = {
            productBillPrice:0,
            productCreatedDate:'',
            productCustPrice:0,
            productName:'',
            productOwner:'',
            productQuantity:0,
            productShopPrice:0,
            productType:'',
            companyName:''
          }

          
    }

    removeItem(element:any) {
      this.productList.forEach((values,index) => {
        if(values == element){
          this.productList.splice(index,1);
        }
      })
    }

    onBrandChange() {
      this.products = [
        ...new Set(this.compList
          .filter(item => item.comName === this.companyName.value)
          .map(item => item.prodType)),
      ];
      this.selectedProduct = '';
      this.productNames = [];
      console.log(this.products);
      console.log(this.companyName.value);
    }
  
    onProductChange() {
      this.productNames = this.compList
        .filter(
          item =>
            item.comName === this.companyName.value &&
            item.prodType === this.productType.value
        )
        .map(item => item.prodName);
    }

    onUpdateBrandChange() {
      this.updateProducts = [
        ...new Set(this.milkProdList
          .filter(item => item.companyName === this.updateCompanyName.value)
          .map(item => item.productType)),
      ];
      this.selectedUpdProduct = '';
      this.updateProductNames = [];
      console.log(this.products);
      console.log(this.companyName.value);
    }
  
    onUpdateProductChange() {
      this.updateProductNames = this.milkProdList
        .filter(
          item =>
            item.companyName === this.updateCompanyName.value &&
            item.productType === this.updateProductType.value
        )
        .map(item => item.productName);
    }

    onUpdateQuantityChange(){
      this.selectedProdValues = this.milkProdList.find(
        p =>
          p.companyName === this.updateCompanyName.value &&
          p.productType ===this.updateProductType.value &&
          p.productName === this.updateProductName.value
      );
      
      if(this.selectedProdValues){
        this.updateProductBillPrice.setValue(this.selectedProdValues.productBillPrice);
        this.updateProductShopPrice.setValue(this.selectedProdValues.productShopPrice);
        this.updateProductCustPrice.setValue(this.selectedProdValues.productCustPrice);
        this.updateProductQuantity.setValue(this.selectedProdValues.productQuantity);
        this.checkListUpdate = true;
      }else{
        this.checkListUpdate = false;

      }
      
    }
addProductList() {
  
  const compNameList = this.companyName.value;
  const productShopPriceList = this.productShopPrice.value;
  const productCustPriceList = this.productCustPrice.value;
  const productBillPriceList = this.productBillPrice.value;
   const productNameList = this.productName.value;
   const productTypeList = this.productType.value;
   const productQuantityList = this.productQuantity.value;
   const productOwnerList = sessionStorage.getItem('ownerEmail');


   for(let i=0;i<this.productList.length;i++){
    if(productNameList == this.productList[i].productName && productTypeList == this.productList[i].productType && compNameList == this.productList[i].companyName){
      this.count = this.count+1;
    }
   }
   if(this.count == 0){
    this.productList.push({companyName:compNameList,productName:productNameList,productShopPrice:productShopPriceList
      ,productCustPrice:productCustPriceList,productBillPrice:productBillPriceList,productQuantity:productQuantityList,productType:productTypeList,productOwner:productOwnerList});
      this.checkList = true;
   }
   this.count = 0;
}
merchantAddPRoduct() {

   this.productService.addMilkProduct(this.productList).subscribe((data:any) =>{
    console.log(data);
    if(data.response == "success"){
      this.snackbar.open(`Product Added successfully`,'close',{
        duration: 2000,horizontalPosition:'right',verticalPosition:'top'
       })
       this.productList = [];
       
    }
   },
   error => console.log(error)
  );
    
}

viewProdList(){
  this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
  this.productService.viewProduct(this.userEmail).subscribe((data:any) => {
      this.productList1 = data;
      console.log(data);
  })
}

  

  ngOnInit(): void {
    this.viewProdList();
    this.getMilkProdList();
    this.getOwnerMilkProdList();
  }
  
  
  addForm:FormGroup =  new FormGroup({
    productName : new FormControl(null,[Validators.required]),
    productType : new FormControl(null,[Validators.required]),
    productBillPrice : new FormControl(null,[Validators.required]),
    productCustPrice : new FormControl(null,[Validators.required]),
    productShopPrice : new FormControl(null,[Validators.required]),
    productQuantity : new FormControl(null,[Validators.required]),
    companyName : new FormControl(null,[Validators.required])
    }
);

  updateForm:FormGroup =  new FormGroup({
  updateProductName : new FormControl(null,[Validators.required]),
  updateProductType : new FormControl(null,[Validators.required,Validators.email]),
  updateCompanyName : new FormControl(null,[Validators.required]),
  updateProductQuantity : new FormControl(null,[Validators.required]),
  updateProductBillPrice : new FormControl(null,[Validators.required]),
  updateProductCustPrice : new FormControl(null,[Validators.required]),
  updateProductShopPrice : new FormControl(null,[Validators.required]),
  updateSearchProd : new FormControl(null,[Validators.required])
}
);

get updateProductName():FormControl{
  return this.updateForm.get('updateProductName') as FormControl;
}
get updateProductType():FormControl{
  return this.updateForm.get('updateProductType') as FormControl;
}
get updateCompanyName():FormControl{
  return this.updateForm.get('updateCompanyName') as FormControl;
}
get updateProductQuantity():FormControl{
  return this.updateForm.get('updateProductQuantity') as FormControl;
}
get updateProductBillPrice():FormControl{
  return this.updateForm.get('updateProductBillPrice') as FormControl;
}
get updateProductCustPrice():FormControl{
  return this.updateForm.get('updateProductCustPrice') as FormControl;
}
get updateProductShopPrice():FormControl{
  return this.updateForm.get('updateProductShopPrice') as FormControl;
}

  get productName():FormControl{
    return this.addForm.get('productName') as FormControl;
  }
  get productType():FormControl{
    return this.addForm.get('productType') as FormControl;
  }
  get productPrice():FormControl{
    return this.addForm.get('productPrice') as FormControl;
  }
  get productQuantity():FormControl{
    return this.addForm.get('productQuantity') as FormControl;
  }
  get productBillPrice():FormControl{
    return this.addForm.get('productBillPrice') as FormControl;
  }
  get productCustPrice():FormControl{
    return this.addForm.get('productCustPrice') as FormControl;
  }
  get productShopPrice():FormControl{
    return this.addForm.get('productShopPrice') as FormControl;
  }
  get companyName():FormControl{
    return this.addForm.get('companyName') as FormControl;
  }
  get productCustomerPrice():FormControl{
    return this.addForm.get('productCustomerPrice') as FormControl;
  }
  get updateSearchProd():FormControl{
    return this.addForm.get('updateSearchProd') as FormControl;
  }
  
  // onchangeOfProductName(value : string) {
  //   // for(let i=0;i<this.productList1.length;i++){
  //   //   if(this.productName.value == this.productList1[i].productName){
  //   //    this.prodQtyIndx = i;
  //   //   }
  //   //  }

  //   console.log('Searching for value:', value);
  //   console.log('Product List:', this.productList1);
     
  //    const selectedProduct = this.productList1.find(product => product.productName === value);

  //    console.log('Selected Product:', selectedProduct);

  //    if(selectedProduct){
  //     this.productInterface.productOwner = selectedProduct.productOwner;

  //    this.updateProductName.setValue(selectedProduct?.productName);
  //    this.updateProductBillPrice.setValue(selectedProduct?.productPrice);
  //    //this.updateProductPrice.setValue(selectedProduct?.productPrice);
  //    this.updateProductQuantity.setValue(selectedProduct?.productQuantity);
  //    //this.updateProductCustomerPrice.setValue(selectedProduct.productCustomerPrice);
  //    this.updateProductType.setValue(selectedProduct?.productType);
  //    this.checkListUpdate = true;
  //    }else{
  //     this.checkListUpdate = false;
  //    }
  //    console.log(this.productInterface);
  // }

  get filteredAndSortedProducts() {
    const searchTerm = this.updateForm.get('updateSearchProd')?.value || '';// Log search term

  return this.productList1.filter(product => {
    const productName = product.productName?.toLowerCase() || ''; // Log product name
    return productName.includes(searchTerm.toLowerCase());
  });
  }

  merchantUpdateProduct() {
    // this.productInterface.productName = this.updateProductName.value;
    // // this.productInterface.productPrice = this.updateProductPrice.value;
    //  this.productInterface.productQuantity = this.updateProductQuantity.value;
    //  this.productInterface.productType = this.updateProductType.value;

    this.milkProdDetails.companyName = this.updateCompanyName.value;
    this.milkProdDetails.productBillPrice = this.updateProductBillPrice.value;
    this.milkProdDetails.productCustPrice = this.updateProductCustPrice.value;
    this.milkProdDetails.productShopPrice = this.updateProductShopPrice.value;
    this.milkProdDetails.productQuantity = this.updateProductQuantity.value;
    this.milkProdDetails.productName = this.updateProductName.value;
    this.milkProdDetails.productOwner = sessionStorage.getItem('ownerEmail')|| '';
    this.milkProdDetails.productType = this.updateProductType.value;

   
    this.productService.updateMilkProd(this.milkProdDetails).subscribe((data:any) =>{
      console.log(data);
      if(data.response == "success"){
        this.snackbar.open(`Product Updated successfully`,'close',{
          duration: 5000,horizontalPosition:'right',verticalPosition:'top'
         })
         this.setSecondFormFeildsNull();
      }
     },
     error => console.log(error)
    );
  }

  setSecondFormFeildsNull(){
    this.updateProductName.reset();
    this.updateCompanyName.reset();
    this.updateProductBillPrice.reset();
    this.updateProductCustPrice.reset();
    this.updateProductShopPrice.reset();
    this.updateProductType.reset();
    this.updateProductQuantity.reset();
    //this.updateProductCustomerPrice.setValue(null);
  }

  getMilkProdList(){
    this.productService.getMilkProduct().subscribe((data:any) => {
        this.compList = data;
        console.log(data);
        this.brands = [...new Set(this.compList.map(item => item.comName))];
        console.log(this.brands);
    })
   
  }

  getOwnerMilkProdList(){
    this.userEmail =  sessionStorage.getItem('ownerEmail')|| '';
    this.productService.viewOwnerMilkProd(this.userEmail).subscribe((data:any) => {
      this.milkProdList = data;
      console.log(data);
      this.updateBrands = [...new Set(this.milkProdList.map(item => item.companyName))];

  })
  }
}
