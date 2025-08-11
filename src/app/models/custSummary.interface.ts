import { balanceList } from './custBlnList.interface';
import { transactionList } from './transaction.interface';
export interface custSummary{
    custModifiedDate:string;
    custPincode:string;
    custState:string;
    custGender:string;
    custDob:string;
    custCreatedDate:string;
    custCountry:string;
    custCity:string;
    custAddress:string;
    transactionList:transactionList[];
    balanceList:balanceList[];
}