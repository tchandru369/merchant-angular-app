import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ShopCustomer } from 'src/app/models/ShopCustomer.interface';
import { BillingService } from '../../services/billing.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { compList } from 'src/app/models/compList.interface';
import { OrderRequest } from 'src/app/models/orderRequest.interface';

@Component({
  selector: 'app-cust-place-order',
  templateUrl: './cust-place-order.component.html',
  styleUrls: ['./cust-place-order.component.css'],
})
export class CustPlaceOrderComponent implements OnInit {
  shopCustomer!: ShopCustomer;
  checkList: boolean = false;
  orderRequest!: OrderRequest;
  brands: any[] = [];
  products: any[] = [];
  productNames: any[] = [];
  selectedBrand: string = '';
  selectedProduct: string = '';
  compList: compList[] = [];
  count: number = 0;
  isLoading:boolean=false;

  productList: {
    companyName: string;
    productQuantity: number;
    productOwner: any;
    productType: string;
    productName: string;
  }[] = [];

  constructor(
    private productService: ProductService,
    private billingService: BillingService,
    private router: Router,
    private snackbar: MatSnackBar,
    private dataPipe: DatePipe,
    private dialog: MatDialog
  ) {
    this.shopCustomer = {
      custType: '',
      custPanNo: '',
      custEmailId: '',
      custOwnerRefId: '',
      custDob: '',
      custPinCode: '',
      custState: '',
      custCity: '',
      custAddress: '',
      custPhoneNo: '',
      custName: '',
      custGender: '',
      custCountry: '',
      shopCustRefId:''
    };
    this.orderRequest = {
      orderCustName: '',
      orderRefId:'',
      orderCustPhoneNo: '',
      orderCustCrtdDate: '',
      orderOwnerRefId: '',
      orderCustEmailId: '',
      orderCustType: '',
      orderCustTotalPrice: 0,
      orderFinalAmtPaid: 0,
      noteToPayer:'',
      orderCustRefId:'',
      orderPymtRefId:'',
      orderList: [],
    };
  }

  addForm: FormGroup = new FormGroup({
    custProductName: new FormControl(null, [Validators.required]),
    custProductType: new FormControl(null, [Validators.required]),
    custProductBillPrice: new FormControl(null, [Validators.required]),
    custProductCustPrice: new FormControl(null, [Validators.required]),
    custProductShopPrice: new FormControl(null, [Validators.required]),
    custProductQuantity: new FormControl(null, [Validators.required]),
    custCompanyName: new FormControl(null, [Validators.required]),
  });

  get custProductName(): FormControl {
    return this.addForm.get('custProductName') as FormControl;
  }
  get custProductType(): FormControl {
    return this.addForm.get('custProductType') as FormControl;
  }
  get custProductBillPrice(): FormControl {
    return this.addForm.get('custProductBillPrice') as FormControl;
  }
  get custProductCustPrice(): FormControl {
    return this.addForm.get('custProductCustPrice') as FormControl;
  }
  get custProductShopPrice(): FormControl {
    return this.addForm.get('custProductShopPrice') as FormControl;
  }
  get custProductQuantity(): FormControl {
    return this.addForm.get('custProductQuantity') as FormControl;
  }
  get custCompanyName(): FormControl {
    return this.addForm.get('custCompanyName') as FormControl;
  }

  removeItem(element: any) {
    this.productList.forEach((values, index) => {
      if (values == element) {
        this.productList.splice(index, 1);
      }
    });
  }

  onBrandChange() {
    this.products = [
      ...new Set(
        this.compList
          .filter((item) => item.comName === this.custCompanyName.value)
          .map((item) => item.prodType)
      ),
    ];
    this.selectedProduct = '';
    this.productNames = [];
    console.log(this.products);
    console.log(this.custCompanyName.value);
  }

  onProductChange() {
    this.productNames = this.compList
      .filter(
        (item) =>
          item.comName === this.custCompanyName.value &&
          item.prodType === this.custProductType.value
      )
      .map((item) => item.prodName);
  }

  ngOnInit(): void {
    this.getCustomerDetailsByEmailPh();
    this.getMilkProdList();
  }
  getCustomerDetailsByEmailPh() {
    const custEmail = sessionStorage.getItem('ownerRefId');
    this.billingService
      .getCustDtlsByPhEmail(custEmail)
      .subscribe((data: any) => {
        this.shopCustomer = data;
        console.log(this.shopCustomer);
      });
  }

  merchantPlaceProduct() {
    this.isLoading = true;
    const curD = this.dataPipe.transform(new Date(), 'dd-MM-yyyy')!;
    this.orderRequest.orderCustCrtdDate = String(curD);
    this.orderRequest.orderCustEmailId = this.shopCustomer.custEmailId;
    this.orderRequest.orderCustName = this.shopCustomer.custName;
    this.orderRequest.orderOwnerRefId =this.shopCustomer.custOwnerRefId;
    this.orderRequest.orderCustPhoneNo = this.shopCustomer.custPhoneNo;
    //this.orderRequest.orderCustType = this.billingCustomerType.value;
    this.orderRequest.orderCustRefId = String(sessionStorage.getItem('ownerRefId'));

    this.orderRequest.orderCustType = this.shopCustomer.custType;

    for (let i = 0; i < this.productList.length; i++) {
      this.orderRequest.orderList.push({
        orderCustProdCmp: this.productList[i].companyName || '',
        orderCustProdName: this.productList[i].productName || '',
        orderCustProdQty: this.productList[i].productQuantity || 0,
        orderCustProdPrice: 0,
        orderCustProdType: this.productList[i].productType || '',
      });
    }
    console.log(this.orderRequest);

    this.billingService
      .custPlaceOrderRequest(this.orderRequest)
      .subscribe((data: any) => {
        console.log(data);
        if (data.response == 'success') {
          this.isLoading = false;
          this.snackbar.open(` Request Addition : ${data.errorMsg} `, 'close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        } else {
          this.isLoading = false;
          this.snackbar.open(`${data.errorMsg} `, 'close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
    this.isLoading = false;
  }
  AddProductList() {
    const compNameList = this.custCompanyName.value;
    const productNameList = this.custProductName.value;
    const productTypeList = this.custProductType.value;
    const productQuantityList = this.custProductQuantity.value;
    const productOwnerList = sessionStorage.getItem('ownerRefId');

    for (let i = 0; i < this.productList.length; i++) {
      if (
        productNameList == this.productList[i].productName &&
        productTypeList == this.productList[i].productType &&
        compNameList == this.productList[i].companyName
      ) {
        this.count = this.count + 1;
      }
    }
    if (this.count == 0) {
      this.productList.push({
        companyName: compNameList,
        productName: productNameList,
        productQuantity: productQuantityList,
        productType: productTypeList,
        productOwner: productOwnerList,
      });
      this.checkList = true;
    }
    this.count = 0;
  }

  getMilkProdList() {
    this.productService.getMilkProduct().subscribe((data: any) => {
      this.compList = data;
      console.log(data);
      this.brands = [...new Set(this.compList.map((item) => item.comName))];
      console.log(this.brands);
    });
  }
}
