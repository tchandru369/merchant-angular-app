import { MilkList } from "./milkList.interface";

export interface OrderRequest{
    orderCustName:string;
    orderCustPhoneNo:string;
    orderCustCrtdDate:string;
    orderOwnerRefId:string;
    orderRefId:string;
    orderCustEmailId:string;
    orderCustType:string;
    orderCustTotalPrice:number;
    orderFinalAmtPaid:number;
    noteToPayer:string;
    orderCustRefId:string;
    orderPymtRefId:string;
    orderList:MilkList[];
} 