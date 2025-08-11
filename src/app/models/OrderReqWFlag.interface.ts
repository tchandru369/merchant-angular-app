import { MilkList } from "./milkList.interface";

export interface OrderReqWFlag{
    orderCustName:string;
        orderCustPhoneNo:string;
        orderCustCrtdDate:string;
        orderCustOwnerName:string;
        orderCustEmailId:string;
        orderCustType:string;
        orderCustTotalPrice:number;
        orderFinalAmtPaid:number;
        orderFlag:boolean;
        orderList:MilkList[];
}