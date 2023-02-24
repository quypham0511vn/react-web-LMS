export interface InfoCustomerGroup {
    id: string;
    title: string;
    child: InfoCustomer[];
}
export interface InfoCustomer {
    title: string;
    value: string;
    text_color: string;
}

export interface LoanPaymentPeriodModel {
    payment_period: string;
    date_of_maturity: string;
    number_day: number;
    number_late_payment_date: number;
    money_payable_monthly: string;
    initial_money: string;
    profit_money: string;
    management_storage: string;
    total_payment: string;
    paid: string;
    unpaid: string;
    status: string;
    forfeit: string
}

export interface LoanPaymentHistory {
    stt: string;
    code: string;
    date_created: string;
    date_of_payment: string;
    payment_amount: string;
    amount_exemption: string;
    overdue_fee: string;
    overdue_date: string;
    renewal_fee: string;
    extra_money: string;
    updater: string;
    paymentType: string;
    status: string;
    note: string;
    accounting_notes: string;
}

export interface LoanImpactHistory {
    stt: string;
    time: string;
    performer: string;
    result: string;
    payment_appointment_date: string;
    amount_payment_appointment: string;
    note: string;
}

export interface loanPayModel {
    payer_name?: string;
    relationship?: string;
    payer_phone?: string;
    reality_date?: string;
    date_payment?: string;
    number_days_difference?: string;
    deduction_fee?: DeductionFree;
    total_amount_deduction_fee?: string;
    fee_deduction?: string;
    total_amount_due?: string;
    money_pay_date?: string;
    difference?: string;
    total_amount_minus?: string;
    forfeit?: string;
    overdue_money?: string;
    method?: string;
    form?: string;
    valid_money?: string;
    money_paid_by_customer?: string;
    customer_resources?: string;
    overdue_money?: string;
    content?: string;
}

export interface loanUploadModel {
    contract_suggest?: string;
    exemption_type?: string;
    confirm_email?: string;
    application_exemption?: string;
    money_requested_reduced?: string;
    suggested_date?: string;
    date_of_application_signing?: string;
    image?: any;
    note?: string;
}
export interface loanSettlementModel {
    payer_name?: string;
    relationship?: string;
    payer_phone?: string;
    reality_date?: string;
    date_payment?: string;
    number_days_difference?: string;
    deduction_fee?: DeductionFree;
    total_amount_deduction_fee?: string;
    fee_deduction?: string;
    actual_settlement_state?: string;
    total_amount_settlement?: string;
    difference?: string;
    early_settlement_fee?: string;
    forfeit?: string;
    overdue_money?: string;
    method?: string;
    fee?: string;
    valid_money?: string;
    interest?: string;
    money_paid_by_customer?: string;
    customer_resources?: string;
    overdue_money?: string;
    content?: string;
}

export interface DeductionFree {
    value_one: string;
    value_two: string;
    value_three: string;
}
