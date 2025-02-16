import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { productInterface } from 'src/app/models/product.interface';
import { CustomValidators } from 'src/app/public/_helpers/custom-validators';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {


  count : any = 0;
  productList1: productInterface[]=[];
  productInterface!: productInterface;
  displayedColumns: string[] = ['productName', 'productPrice' ,'productCustomerPrice','productType', 'productQuantity'];
  displayProdList : string[] = ['productNameL','productPriceL','productCustomerPriceL','productTypeL','productQuantityL'];
  userEmail:string="";
  checkList:boolean=false;
  prodQtyIndx:number=0;
  checkListUpdate:boolean = false;

  productList:{productName:string,productType:string,productPrice:string,productCustomerPrice:string,productQuantity:string
    ,productOwner:any }[]=[];

    constructor(private productService:ProductService,private router:Router, private snackbar:MatSnackBar) {
          this.productInterface  ={

            productName:'',
            productType:'',
            productPrice:'',
            productOwner:'',
            productCustomerPrice:'',
            productQuantity:''
          }; 
    }
addProductList() {
  
   const productNameList = this.productName.value;
   const productTypeList = this.productType.value;
   const productPriceList = this.productPrice.value;
   const productQuantityList = this.productQuantity.value;
   const productOwnerList = sessionStorage.getItem('ownerEmail');
   const productCustomerPriceList = this.productCustomerPrice.value;


   for(let i=0;i<this.productList.length;i++){
    if(productNameList == this.productList[i].productName){
      this.count = this.count+1;
    }
   }
   if(this.count == 0){
    this.productList.push({productName:productNameList,productType:productTypeList
      ,productPrice:productPriceList,productCustomerPrice:productCustomerPriceList,productQuantity:productQuantityList,productOwner:productOwnerList});
      this.checkList = true;
   }
   this.count = 0;
}
merchantAddPRoduct() {

   this.productService.addProduct(this.productList).subscribe((data:any) =>{
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
  }
  
  
  addForm:FormGroup =  new FormGroup({
    productName : new FormControl(null,[Validators.required]),
    productType : new FormControl(null,[Validators.required,Validators.email]),
    productPrice : new FormControl(null,[Validators.required]),
    productQuantity : new FormControl(null,[Validators.required]),
    productCustomerPrice : new FormControl(null,[Validators.required])
    }
);

updateForm:FormGroup =  new FormGroup({
  updateProductName : new FormControl(null,[Validators.required]),
  updateProductType : new FormControl(null,[Validators.required,Validators.email]),
  updateProductPrice : new FormControl(null,[Validators.required]),
  updateProductQuantity : new FormControl(null,[Validators.required]),
  updateProductCustomerPrice : new FormControl(null,[Validators.required]),
  updateSearchProd : new FormControl(null,[Validators.required])
}
);

get updateProductName():FormControl{
  return this.updateForm.get('updateProductName') as FormControl;
}
get updateProductType():FormControl{
  return this.updateForm.get('updateProductType') as FormControl;
}
get updateProductPrice():FormControl{
  return this.updateForm.get('updateProductPrice') as FormControl;
}
get updateProductQuantity():FormControl{
  return this.updateForm.get('updateProductQuantity') as FormControl;
}
get updateProductCustomerPrice():FormControl{
  return this.updateForm.get('updateProductCustomerPrice') as FormControl;
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
  get productCustomerPrice():FormControl{
    return this.addForm.get('productCustomerPrice') as FormControl;
  }
  get updateSearchProd():FormControl{
    return this.addForm.get('updateSearchProd') as FormControl;
  }
  
  onchangeOfProductName(value : string) {
    // for(let i=0;i<this.productList1.length;i++){
    //   if(this.productName.value == this.productList1[i].productName){
    //    this.prodQtyIndx = i;
    //   }
    //  }

    console.log('Searching for value:', value);
    console.log('Product List:', this.productList1);
     
     const selectedProduct = this.productList1.find(product => product.productName === value);

     console.log('Selected Product:', selectedProduct);

     if(selectedProduct){
      this.productInterface.productOwner = selectedProduct.productOwner;

     this.updateProductName.setValue(selectedProduct?.productName);
     this.updateProductPrice.setValue(selectedProduct?.productPrice);
     this.updateProductQuantity.setValue(selectedProduct?.productQuantity);
     this.updateProductCustomerPrice.setValue(selectedProduct.productCustomerPrice);
     this.updateProductType.setValue(selectedProduct?.productType);
     this.checkListUpdate = true;
     }else{
      this.checkListUpdate = false;
     }
     console.log(this.productInterface);
  }

  get filteredAndSortedProducts() {
    const searchTerm = this.updateForm.get('updateSearchProd')?.value || '';// Log search term

  return this.productList1.filter(product => {
    const productName = product.productName?.toLowerCase() || ''; // Log product name
    return productName.includes(searchTerm.toLowerCase());
  });
  }

  merchantUpdateProduct() {
    this.productInterface.productName = this.updateProductName.value;
     this.productInterface.productPrice = this.updateProductPrice.value;
     this.productInterface.productQuantity = this.updateProductQuantity.value;
     this.productInterface.productType = this.updateProductType.value;


    this.productService.updateProduct(this.productInterface).subscribe((data:any) =>{
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
    this.updateProductName.setValue(null);
    this.updateProductPrice.setValue(null);
    this.updateProductQuantity.setValue(null);
    this.updateProductType.setValue(null);
    this.updateProductCustomerPrice.setValue(null);
  }

}
