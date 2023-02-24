import { InfoCustomer } from './../pages/contract/step-custom-info/type';
import { DisbursementModel } from './contract-disbursement-model';
import { ExpertiseModel } from './contract-expertise-model';
import { LoanModel } from './loan-contract';

export interface ContractModel {
    id?: string;
    customer_info?: InfoCustomer;
    expertise_info?: ExpertiseModel;
    loan?: LoanModel;
    disbursement_info?: DisbursementModel;
}
