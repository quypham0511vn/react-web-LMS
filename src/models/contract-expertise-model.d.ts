export interface ExpertiseModel {
    name?: string;
    file_appraisal?: string;
    field_appraisal?: string;
    credit_relationship_info?: CreditRelationship[];
    exception?: Exception[];
}

export interface CreditRelationship {
    loan_organization_name: string;
    remaining_balance: string;
    completed: string;
    installment_payment: string;
    out_of_date: string;
}

export interface Exception {
    id: string;
    name: string;
    child: ExceptionChild[];
}
export interface ExceptionChild {
    id: string;
    id_parent: string;
    name: string;
    is_select?: boolean;
}
