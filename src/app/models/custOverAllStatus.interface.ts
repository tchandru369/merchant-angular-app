import { MilkList } from "./milkList.interface";

export interface CustOverAllStatusList{
    orderCustName:string;
    orderCustPhoneNo:string;
    orderCustCrtdDate:string;
    orderCustOwnerName:string;
    orderCustEmailId:string;
    orderCustType:string;
    orderCustTotalPrice:number;
    orderFinalAmtPaid:number;
    orderReqStatus:string;
    showDetails:any;
    orderList:MilkList[];
} 