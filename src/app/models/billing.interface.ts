import { productInterface } from "./product.interface";

export interface billingInterface {
    billingCustomerName: string ;
    billingCustomerEmail: string;
    billingCustomerPhNo: string;
    billingCustomerAddress: string;
    billingDate: string;
    billingTotalProductQty: string;
    billingTotalPrice: string;
    billingTotalPriceTax: string;
    billingDuePrice:string;
    billingAmtPaid:string;
    productDetails: productInterface[];
  }