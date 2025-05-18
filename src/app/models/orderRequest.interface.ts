import { MilkList } from "./milkList.interface";

export interface OrderRequest{
    orderCustName:string;
    orderCustPhoneNo:string;
    orderCustCrtdDate:string;
    orderCustOwnerName:string;
    orderCustEmailId:string;
    orderCustType:string;
    orderCustTotalPrice:number;
    orderFinalAmtPaid:number;
    orderList:MilkList[];
} 