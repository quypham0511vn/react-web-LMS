import { ItemPropsModel } from 'models/item-props-model';
export type LoanInfoModel = {
    name?: string;
    loanFormValue?: string,
    loanTypeAssetValue?: string,
    loanProductValue?: string,
    loanNameAssetValue?: string,
    loanAssetValue?: string,
    loanMaxMountValue?: string,
    loanDepreciationValue?: ItemPropsModel[],
    loanPurposeValue?: string,
    loanMountValue?: string,
    loanTimerValue?: string,
    loanFormInterestPayValue?: string,
    loanSpecialOfferValue?: string,
}
export type VehicleInfoModel = {
    vehicleOwnerFullNameValue?: string,
    vehicleBrandValue?: string,
    vehicleModelValue?: string,
    vehicleLicensePlatesValue?: string,
    vehicleChassisNumberValue?: string,
    vehicleEngineNumberValue?: string,
    vehicleSignUpAddressValue?: string,
    vehicleRegistrationNumberValue?: string,
    vehicleDateRangeValue?: string,
    vehicleKilometersTraveledValue?: string,
    vehicleSeriLocateValue?: string,
}

export type LandModel = {
    typeLand?: string,
    landPlotNo?: string,
    mapSheetNo?: string,
    landAddress?: string,
    area?: string,
    privateUsageForm?: string,
    publicUsageForm?: string,
    purposeUsage?: string,
    timeUsage?: string,
    house?: string,
    certificate?: string,
    issuedBy?: string,
    dateRange?: string,
    numbersIntoNote?: string,
}

export type AssetInfoModel = {
    vehicleOwnerFullNameValue?: string,
    vehicleBrandValue?: string,
    vehicleModelValue?: string,
    vehicleLicensePlatesValue?: string,
    vehicleChassisNumberValue?: string,
    vehicleEngineNumberValue?: string,
    vehicleSignUpAddressValue?: string,
    vehicleRegistrationNumberValue?: string,
    vehicleDateRangeValue?: string,
    vehicleKilometersTraveledValue?: string,
    vehicleSeriLocateValue?: string,
    typeLand?: string,
    landPlotNo?: string,
    mapSheetNo?: string,
    landAddress?: string,
    area?: string,
    privateUsageForm?: string,
    publicUsageForm?: string,
    purposeUsage?: string,
    timeUsage?: string,
    house?: string,
    certificateNo?: string,
    issuedBy?: string,
    dateRange?: string,
    numbersIntoNote?: string,
}

export type InsuranceInfoModel = {
    insuranceLoanValue?: string,
    insuranceLoanFeeValue?: string,
    insuranceLifeValue?: string,
    insuranceLifeFeeValue?: string,
    insuranceGICMotorValue?: string,
    insuranceGICMotorFeeValue?: string,
    insuranceMICMotorValue?: string,
    insuranceMICMotorFeeValue?: string,
    insuranceVBIValue?: string,
    insuranceVBIFeeValue?: string,
    insuranceTNDSValue?: string,
    insuranceTNDSFeeValue?: string,
    vehicleCapacityValue?: string,
    insuranceResponsibilityLevelValue?: string,
    insurancePTIValue?: string,
    insurancePTIFeeValue?: string,
    insuranceNoteValue?: string,
}

export type LoanModel = {
        loanInfo?: LoanInfoModel,
        assetInfo?:AssetInfoModel,
        insuranceInfo?: InsuranceInfoModel
}

export type ItemSearch = {
    id: string;
    name: string;
}




