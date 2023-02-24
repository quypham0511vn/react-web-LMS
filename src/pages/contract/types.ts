export type ContractActions = {
    fillData: (dataStep?: any) => any;
    validate: (dataStep?: any) => any;
}

export type ContractProps = {
    ref: any;
    onBack?: () => any;
    onContinue?: (data?: any, key?: any, info?: any) => any;
    onSave?: () => any;
}
