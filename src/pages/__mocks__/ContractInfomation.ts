import { ImageGroupModel } from 'models/common-model';
import { InfoCustomerGroup } from 'models/contract-detail.model';
import { ItemPropsModel } from 'models/item-props-model';
import { ItemSearch } from 'models/loan-contract';
import { InfoChild, InfoSteps } from 'pages/contract';
export const LoanInfomation = [
    {
        id: 1,
        text: 'Xe may',
        value: 'Xe may',
    },
    {
        id: 2,
        text: 'Xe dap',
        value: 'Xe dap',
    },
    {
        id: 3,
        text: 'O to',
        value: 'O to',
    },
    {
        id: 4,
        text: 'May bay',
        value: 'May bay',
    },
    {
        id: 5,
        text: 'Xe khach',
        value: 'Xe khach',
    },
    {
        id: 6,
        text: 'Tau hoa',
        value: 'Tau hoa',
    },

] as ItemPropsModel[]

export const TypeAssetInfomation = [
    {
        id: 1,
        text: 'Xe máy',
        value: 'Xe máy',
    },
    {
        id: 2,
        text: 'Ô tô',
        value: 'Ô tô',
    },
    {
        id: 3,
        text: 'Nhà đất',
        value: 'Nhà đất',
    },

] as ItemPropsModel[]

export const CustomerResource = [
    {
        id: 1,
        text: 'Khách hàng 1',
        value: 'Khách hàng 1'
    },
    {
        id: 2,
        text: 'Khách hàng 2',
        value: 'Khách hàng 2'
    },
    {
        id: 3,
        text: 'Khách hàng 3',
        value: 'Khách hàng 3'
    }
] as ItemPropsModel[]

export const City = [
    {
        id: 1,
        text: 'Hà Nội',
        value: 'Hà Nội'
    },
    {
        id: 2,
        text: 'Đà Nẵng',
        value: 'Đà Nẵng'
    },
    {
        id: 3,
        text: 'Huế',
        value: 'Huế'
    },
] as ItemPropsModel[]

// export const City1 = [
//     {
//         id: 1,
//         text: 'Hà Nội',
//         value: 'Hà Nội'
//     },
//     {
//         id: 2,
//         text: 'Đà Nẵng',
//         value: 'Đà Nẵng'
//     },
//     {
//         id: 3,
//         text: 'Huế',
//         value: 'Huế'
//     },
// ] as ItemPropsModel[]

export const District = [
    {
        id: 1,
        text: 'Quận Hai Bà Trưng',
        value: 'Quận Hai Bà Trưng'
    },
    {
        id: 2,
        text: 'Cầu Giấy',
        value: 'Cầu Giấy'
    },
    {
        id: 3,
        text: 'Hoàn Kiếm',
        value: 'Hoàn Kiếm'
    },
] as ItemPropsModel[]

export const Ward = [
    {
        id: 1,
        text: 'Quỳnh Lôi',
        value: 'Quỳnh Lôi'
    },
    {
        id: 2,
        text: 'Bạch Mai',
        value: 'Bạch Mai'
    },
    {
        id: 3,
        text: 'Hồng Mai',
        value: 'Hồng Mai'
    }
] as ItemPropsModel[]

export const Resident = [
    {
        id: 1,
        text: 'Thường Trú',
        value: 'Thường Trú'
    },
    {
        id: 2,
        text: 'Tạm Trú',
        value: 'Tạm Trú'
    }
] as ItemPropsModel[]

export const Location = [
    {
        id: 1,
        text: 'giao dịch viên ',
        value: 'giao dịch viên'
    },
    {
        id: 2,
        text: 'cộng tác viên',
        value: 'cộng tác viên'
    }
] as ItemPropsModel[]

export const job = [
    {
        id: 1,
        text: 'kế toán',
        value: 'kế toán'
    },
    {
        id: 2,
        text: 'It',
        value: 'It'
    }
] as ItemPropsModel[]

export const relationship = [
    {
        id: 1,
        text: 'Bố',
        value: 'Bố'
    },
    {
        id: 2,
        text: 'Mẹ',
        value: 'Mẹ'
    },
    {
        id: 3,
        text: 'Ông',
        value: 'Ông'
    },
    {
        id: 4,
        text: 'Bà',
        value: 'Bà'
    },
] as ItemPropsModel[]
export const fromTakeWage = [
    {
        id: 1,
        text: 'Thẻ ATM',
        value: 'Thẻ ATM'
    },
    {
        id: 2,
        text: 'Trả tiền mặt',
        value: 'Trả tiền mặt'
    }
] as ItemPropsModel[]

export const formLoan = [
    {
        id: 1,
        text: 'Cho vay',
        value: 'Cho vay'
    },
    {
        id: 2,
        text: 'Cho vay nặng lãi',
        value: 'Cho vay nặng lãi'
    }
] as ItemPropsModel[]

export const loanProduct = [
    {
        id: 1,
        text: 'Vay theo đăng ký - cà vẹt xe chính chủ',
        value: 'Vay theo đăng ký - cà vẹt xe chính chủ'
    },
    {
        id: 2,
        text: 'Vay theo đăng ký',
        value: 'Vay theo đăng ký'
    }
] as ItemPropsModel[]

export const loanNameAsset = [
    {
        id: 1,
        text: 'Honda',
        value: 'Honda'
    },
    {
        id: 2,
        text: 'Yamaha',
        value: 'Yamaha'
    }
] as ItemPropsModel[]

export const loanTimer = [
    {
        id: 1,
        text: '6 tháng',
        value: '6 tháng'
    },
    {
        id: 2,
        text: '1 năm',
        value: '1 năm'
    }
] as ItemPropsModel[]

export const formInterest = [
    {
        id: 1,
        text: 'Dư nợ giảm dần',
        value: 'Dư nợ giảm dần'
    },
] as ItemPropsModel[]

export const programSpecial = [
    {
        id: 1,
        text: 'Giảm 20%',
        value: 'Giảm 20%'
    },
] as ItemPropsModel[]

export const LoanInfoData = {
    obj1: formLoan,
    obj2: TypeAssetInfomation,
    obj3: loanProduct,
    obj4: loanNameAsset,
    obj5: loanTimer,
    obj6: loanTimer,
    obj7: formInterest,
    obj8: programSpecial,
    // obj9: LoanInfomation,
    // obj10: LoanInfomation,
    // obj11: LoanInfomation,
    // obj12: LoanInfomation,
}

export const InsuranceInfoData = {
    obj1: LoanInfomation,
    obj2: LoanInfomation,
    obj3: LoanInfomation,
    obj4: LoanInfomation,
    obj5: LoanInfomation,
    obj6: LoanInfomation,
    obj7: LoanInfomation,
    obj8: LoanInfomation,
    obj9: LoanInfomation,
    obj10: LoanInfomation,
    obj11: LoanInfomation,
    obj12: LoanInfomation,
    obj13: LoanInfomation,
    obj14: LoanInfomation,
    obj15: LoanInfomation,
    obj16: LoanInfomation,
    obj17: LoanInfomation,
    obj18: LoanInfomation,
}

export const VehicleInfoData = {
    obj1: TypeAssetInfomation,
}



export const ItemLoanInfomation = [
    {
        id: 1,
        text: 'Hình thức vay',
        value: 'Xe may',
        keyValue: 'loanFormValue'
    },
    {
        id: 2,
        text: 'Loại tài sản',
        value: 'Xe dap',
        keyValue: 'loanTypeAssetValue'
    },
    {
        id: 3,
        text: 'Sản phẩm vay',
        value: 'O to',
        keyValue: 'loanProductValue'
    },
    {
        id: 4,
        text: 'Tên tài sản',
        value: 'May bay',
        keyValue: 'loanNameAssetValue'
    },
    {
        id: 5,
        text: 'Giá trị tài sản',
        value: 'Xe khach',
        keyValue: 'loanAssetValue'
    },
    {
        id: 6,
        text: 'Số tiền tối đa có thể vay',
        value: 'Tau hoa',
        keyValue: 'loanMaxMountValue'
    },
    {
        id: 7,
        text: 'Khấu hao tài sản',
        value: 'Tau hoa',
        keyValue: 'loanDepreciationValue'
    },
    {
        id: 8,
        text: 'Mục đích vay',
        value: 'Tau hoa',
        keyValue: 'loanPurposeValue'
    },
    {
        id: 9,
        text: 'Số tiền vay',
        value: 'Tau hoa',
        keyValue: 'loanMountValue'
    },
    {
        id: 10,
        text: 'Thời gian vay',
        value: 'Tau hoa',
        keyValue: 'loanTimerValue'
    },
    {
        id: 11,
        text: 'Hình thức trả lãi',
        value: 'Tau hoa',
        keyValue: 'loanFormInterestPayValue'
    },
    {
        id: 12,
        text: 'Chương trình ưu đãi',
        value: 'Tau hoa',
        keyValue: 'loanSpecialOfferValue'
    }
] as ItemPropsModel[]

export const ItemVehicleInfomation = [
    {
        id: 1,
        text: 'Họ tên chủ xe',
        keyValue: 'vehicleOwnerFullNameValue'
        // status: true
    },
    {
        id: 2,
        text: 'Nhãn hiệu',
        keyValue: 'vehicleBrandValue'
        // status: true
    },
    {
        id: 3,
        text: 'Model',
        keyValue: 'vehicleModelValue'
        // status: true
    },
    {
        id: 4,
        text: 'Biển số xe',
        keyValue: 'vehicleLicensePlatesValue'
        // status: true
    },
    {
        id: 5,
        text: 'Số khung',
        keyValue: 'vehicleChassisNumberValue'
        // status: true
    },
    {
        id: 6,
        text: 'Số máy',
        keyValue: 'vehicleEngineNumberValue'
        // status: true
    },
    {
        id: 7,
        text: 'Địa chỉ đăng ký',
        keyValue: 'vehicleSignUpAddressValue'
        // status: true
    },
    {
        id: 8,
        text: 'Số đăng ký',
        keyValue: 'vehicleRegistrationNumberValue'
        // status: true
    },
    {
        id: 9,
        text: 'Ngày cấp',
        keyValue: 'vehicleDateRangeValue'
        // status: true
    },
    {
        id: 10,
        text: 'Số km đã đi',
        keyValue: 'vehicleKilometersTraveledValue'
        // status: true
    },
    {
        id: 11,
        text: 'Mã seri định vị',
        keyValue: 'vehicleSeriLocateValue'
        // status: true
    }

] as ItemPropsModel[]

export const ItemInsuranceInfomation = [
    {
        id: 1,
        text: 'Bảo hiểm khoản vay',
        keyValue: 'insuranceLoanValue'
        // status: true
    },
    {
        id: 2,
        text: 'Phí bảo hiểm khoản vay',
        keyValue: 'insuranceLoanFeeValue'
        // status: true
    },
    {
        id: 3,
        text: 'Bảo hiểm phúc lộc thọ',
        keyValue: 'insuranceLifeValue'
        // status: true
    },
    {
        id: 4,
        text: 'Phí bảo hiểm phúc lộc thọ',
        keyValue: 'insuranceLifeFeeValue'
        // status: true
    },
    {
        id: 5,
        text: 'Bảo hiểm xe máy(easy) GIC',
        keyValue: 'insuranceGICMotorValue'
        // status: true
    },
    {
        id: 6,
        text: 'Phí bảo hiểm xe máy (easy) GIC',
        keyValue: 'insuranceGICMotorFeeValue'
        // status: true
    },
    {
        id: 7,
        text: 'Bảo hiểm xe máy MIC',
        keyValue: 'insuranceMICMotorValue'
        // status: true
    },
    {
        id: 8,
        text: 'Phí bảo hiểm xe máy MIC',
        keyValue: 'insuranceMICMotorFeeValue'
        // status: true
    },
    {
        id: 9,
        text: 'Bảo hiểm VBI',
        keyValue: 'insuranceVBIValue'
        // status: true
    },
    {
        id: 10,
        text: 'Phí bảo hiểm VBI ',
        keyValue: 'insuranceVBIFeeValue'
        // status: true
    },
    {
        id: 11,
        text: 'Bảo Hiểm TNDS',
        keyValue: 'insuranceTNDSValue'
        // status: true
    },
    {
        id: 12,
        text: 'Dung tích xe ',
        keyValue: 'vehicleCapacityValue'
        // status: true
    },
    {
        id: 13,
        text: 'Mức trách nhiệm',
        keyValue: 'insuranceResponsibilityLevelValue'
        // status: true
    },
    {
        id: 14,
        text: 'Phí BH TNDS',
        keyValue: 'insuranceTNDSFeeValue'
        // status: true
    },
    {
        id: 15,
        text: 'Bảo Hiểm Tai Nạn Con Người (PTI)',
        keyValue: 'insurancePTIValue'
        // status: true
    },
    {
        id: 16,
        text: 'Phí Bảo Hiểm Tai Nạn Con Người (PTI)',
        keyValue: 'insurancePTIFeeValue'
        // status: true
    },
    {
        id: 17,
        text: 'Ghi chú',
        keyValue: 'insuranceNoteValue'
        // status: true
    },

] as ItemPropsModel[]

export const loanDepreciationInfomation = [
    {
        id: 1,
        value: 'Giảm trừ biển ngoại tỉnh',
        title: 'Giảm trừ biển ngoại tỉnh',
        status: false
    },
    {
        id: 2,
        value: 'Giảm trừ xe vận tải',
        title: 'Giảm trừ xe vận tải',
        status: false
    },
    {
        id: 3,
        value: 'Giảm trừ xe công ty',
        title: 'Giảm trừ xe công ty',
        status: false
    }

] as ItemPropsModel[]

export const ItemHomeLand = [
    {
        id: 1,
        title: 'Loại tài sản',
        value: 'Loại tài sản',
        status: true,
        ref: 'typeLandRef',
        keyValue: 'typeLand'
    },
    {
        id: 2,
        title: 'Thửa đất số',
        value: 'Thửa đất số',
        status: true,
        ref: 'landPlotNoRef',
        keyValue: 'landPlotNo'
    },
    {
        id: 3,
        title: 'Tờ bản đồ số',
        value: 'Tờ bản đồ số',
        status: true,
        ref: 'mapSheetNoRef',
        keyValue: 'mapSheetNo'
    },
    {
        id: 4,
        title: 'Địa chỉ thửa đất',
        value: 'Địa chỉ thửa đất',
        status: true,
        ref: 'landAddressRef',
        keyValue: 'landAddress'
    },
    {
        id: 5,
        title: 'Diện tích (m2)',
        value: 'Diện tích (m2)',
        status: true,
        ref: 'areaRef',
        keyValue: 'area'
    },
    {
        id: 6,
        title: 'Hình thức sử dụng: riêng (m2)',
        value: 'Hình thức sử dụng: riêng (m2)',
        status: true,
        ref: 'privateUsageFormRef',
        keyValue: 'privateUsageForm'
    },
    {
        id: 7,
        title: 'Hình thức sử dụng: chung (m2)',
        value: 'Hình thức sử dụng: chung (m2)',
        status: true,
        ref: 'publicUsageFormRef',
        keyValue: 'publicUsageForm'
    },
    {
        id: 8,
        title: 'Mục đích sử dụng',
        value: 'Mục đích sử dụng',
        status: true,
        ref: 'purposeUsageRef',
        keyValue: 'purposeUsage'
    },
    {
        id: 9,
        title: 'Thời hạn sử dụng',
        value: 'Thời hạn sử dụng',
        status: true,
        ref: 'timeUsageRef',
        keyValue: 'timeUsage'
    },
    {
        id: 10,
        title: 'Nhà ở (nếu có)',
        value: 'Nhà ở (nếu có)',
        status: false,
        ref: 'houseRef',
        keyValue: 'house'
    },
    {
        id: 11,
        title: 'Giấy chứng nhận số',
        value: 'Giấy chứng nhận số',
        status: true,
        ref: 'certificateNoRef',
        keyValue: 'certificateNo'
    },
    {
        id: 12,
        title: 'Nơi cấp',
        value: 'Nơi cấp',
        status: true,
        ref: 'issuedByRef',
        keyValue: 'issuedBy'
    },
    {
        id: 13,
        title: 'Ngày cấp',
        value: 'Ngày cấp',
        status: true,
        ref: 'dateRangeRef',
        keyValue: 'dateRange'
    },
    {
        id: 14,
        title: 'Số vào sổ',
        value: 'Số vào sổ',
        status: true,
        ref: 'numbersIntoNoteRef',
        keyValue: 'numbersIntoNote'
    }

] as ItemPropsModel[]


export const vehicleItemInputRef = [
    'vehicleOwnerFullNameInputRef',// 0
    'vehicleBrandInputRef',//1
    'vehicleModelInputRef',//2
    'vehicleLicensePlatesInputRef',//3
    'vehicleChassisNumberInputRef',//4
    'vehicleEngineNumberInputRef',//5
    'vehicleSignUpAddressInputRef',//6
    'vehicleRegistrationNumberInputRef',//7
    'vehicleDateRangePickerRef',//8
    'vehicleKilometersTraveledInputRef',//9
] as string[];

export const vehicleItemPickerRef = [
    'vehicleSeriLocatePickerRef'
] as string[];

export const landItemInputRef = [
    'typeLandRef',//0
    'landPlotNoRef',//1
    'mapSheetNoRef',//2
    'landAddressRef',//3
    'areaRef',//4
    'privateUsageFormRef',//5
    'publicUsageFormRef',//6
    'purposeUsageRef',//7
    'timeUsageRef',//8
    'houseRef',//9
    'certificateNoRef',//10
    'issuedByRef',//11
    'dateRangeRef',//12
    'numbersIntoNoteRef',//13
] as string[];

export const loanItemPickerRef = [
    'loanFormPickerRef', //0
    'loanTypeAssetPickerRef',//1
    'loanProductPickerRef',//2
    'loanNameAssetPickerRef',//3
    'loanPurposePickerRef',//4
    // 'loanMountPickerRef',//5---
    'loanTimerPickerRef',//5
    'loanFormInterestPayPickerRef',//6
    'loanSpecialOfferPickerRef',//7
] as string[];

export const loanItemInputRef = [
    'loanAssetValuePickerRef',
    'loanMaxMountPickerRef',
    'loanMountPickerRef'
] as string[];

export const insuranceItemPickerRef = [
    'insuranceLoanPickerRef',//0
    'insuranceLifePickerRef',//1
    'insuranceGICMotorPickerRef',//2
    'insuranceMICMotorPickerRef',//3
    'insuranceVBIPickerRef',//4
    'insuranceTNDSPickerRef',//5
    'vehicleCapacityPickerRef',//6
    'insuranceResponsibilityLevelPickerRef',//7
    'insurancePTIPickerRef',//8
] as string[];

export const insuranceItemInputRef = [
    'insuranceLoanFeePickerRef',//0
    'insuranceLifeFeePickerRef',//1
    'insuranceGICMotorFeePickerRef',//2
    'insuranceMICMotorFeePickerRef',//3
    'insuranceVBIFeePickerRef',//4
    'insuranceTNDSFeePickerRef',//5
    'insurancePTIFeePickerRef',//6
    'insuranceNoteInputRef'//7
] as string[];

export const loanPayItemInputRef = [
    'payerNameRef',//0
    'relationshipWithOwnerRef',//1
    'payerPhoneRef',//2
    'realityDateRef',//3
    'datePaymentRef',//4
    'numberDaysDifferenceRef',//5
    'deductionFeeRef',//6
    'totalAmountdeductionFeeRef',//7
    'totalAmountDueRef',//8
    'moneyPayDateRef',//9
    'actualDifferenceAndPayoutRef',//10
    'totalAmountMinusRef',//11
    'penaltyForLatePaymentRef',//12
    'overdueMoneyRef',//13
    'validMoneyRef',//14
    'moneyPaidByCustomerRef',// 15
    'collectedContentRef'
] as string[];

export const loanSettlementItemInputRef = [
    'payerNameRef',//0
    'relationshipWithOwnerRef',//1
    'payerPhoneRef',//2
    'realityDateRef',//3
    'datePaymentRef',//4
    'numberDaysDifferenceRef',//5
    'totalDeductionFeeRef',//6
    'actualSettlementSateRef',//7
    'totalAmountToabsRef',//8
    'actualDifferenceAndPayoutRef',//9
    'earlySettlementFeeRef',//10
    'penaltyForLatePaymentRef',//11
    'overdueMoneyRef',//12
    'fee', //13
    'validMoneyRef',//14
    'interest', //15
    'moneyPaidByCustomerRef'// 16
] as string[];

export const loanPayRadioRef = [
    'form', 'method'
]

export const PropertyType = [{ id: 'ts_1', name: 'Thế chấp' }, { id: 'ts_2', name: 'Tín chấp' }] as ItemSearch[]
export const ActiveStatus = [{ id: 'tt_1', name: 'Đang vay' }, { id: 'tt_2', name: 'Đang đầu tư' }, { id: 'tt_3', name: 'Khác' }] as ItemSearch[]
export const ContractType = [{ id: 'hd_1', name: 'Hợp đồng giấy' }, { id: 'hd_2', name: 'Hợp đồng điện tử' }, { id: 'hd_3', name: 'Khác' }] as ItemSearch[]
export const LoanForm = [{ id: 'ht_1', name: 'Dư nợ giảm dần' }, { id: 'ht_2', name: 'Khác' }] as ItemSearch[]

export const TypeCustomerContract = [
    {
        id: 1,
        value: 'Khách hàng mới',
        title: 'Khách hàng mới',
    },
    {
        id: 2,
        value: 'Khách hàng cũ',
        title: 'Khách hàng cũ'
    },

] as ItemPropsModel[]

export const GenderCustomerContract = [
    {
        id: 1,
        value: 'Nam',
        title: 'Nam',
    },
    {
        id: 2,
        value: 'Nữ',
        title: 'Nữ'
    }
] as ItemPropsModel[]

export const StatusCustomerContract = [
    {
        id: 1,
        value: 'Đã kết hôn',
        title: 'Đã kết hôn',
    },
    {
        id: 2,
        value: 'Chưa kết hôn',
        title: 'Chưa kết hôn'
    },
    {
        id: 3,
        value: 'Ly hôn',
        title: 'Ly hôn'
    }
] as ItemPropsModel[]

export const PapContract = [
    {
        id: 1,
        title: 'CMND/CCCD',
        value: 'CMND/CCCD'
    },
    {
        id: 2,
        title: 'Giấy khai sinh',
        value: 'Giấy khai sinh'
    }
] as ItemPropsModel[]

export const resources = [
    {
        id: 1,
        title: 'youtube',
        value: 'youtube',
    },
    {
        id: 2,
        title: 'facebook',
        value: 'facebook'
    },
    {
        id: 3,
        title: 'tiktok',
        value: 'tiktok',
    }
] as ItemPropsModel[]

export const checkBoxLivingData = [
    {
        id: 1,
        value: 'Đang sống tại hộ khẩu',
        title: 'Đang sống tại hộ khẩu',
        status: false
    }
] as ItemPropsModel[]


export const ManualUploadData = [
    {
        name: 'Ảnh giấy tờ tùy thân',
        info_child: [
            { id: 1, title: '1. Mặt trước rõ, đủ 4 góc' },
            { id: 2, title: '2. Không chụp giấy tờ tuỳ thân photo, chụp thông qua màn hình thiết bị điện tử.' },
        ]
    },
    {
        name: 'Ảnh chân dung chụp:',
        info_child: [
            { id: 1, title: '1. Chụp cận mặt, rõ, thẳng góc, không bị che, không chụp quá xa.' },
            { id: 2, title: '2. Không chụp chân dung từ ảnh,  màn hình thiết bị điện tử.' },
        ]
    }, {
        name: 'Bước thực hiện upload',
        info_child: [
            { id: 1, title: 'Bước 1: Upload 3 ảnh mặt trước + mặt sau CMT, ảnh chân dung' },
            { id: 2, title: 'Bước 2: Click vào nút Nhận dạng để so khớp chân dung' },
        ]
    }
] as InfoSteps[]

export const dataCustomerResource = [
    {
        id: '1',
        value: '901 giải phóng'
    },
    {
        id: '2',
        value: '21DA Lê Văn Lương'

    },
    {
        id: '3',
        value: '902 giải phóng'
    },
    {
        id: '4',
        value: '903 giải phóng'
    },
    {
        id: '5',
        value: '904 giải phóng'
    },
    {
        id: '6',
        value: '905 giải phóng'
    },
    {
        id: '7',
        value: '906 giải phóng'
    },
    {
        id: '8',
        value: '907 giải phóng'
    },
    {
        id: '9',
        value: '908 giải phóng'
    },
    {
        id: '10',
        value: '909 giải phóng'
    }
] as ItemPropsModel[];

export const infoPayment = {
    reality_date: '17/10/2022',
    number_days_difference: '4',
    deduction_fee: undefined,
    total_amount_deduction_fee: '0',
    total_amount_due: '5,361',
    difference: '5,361',
    total_amount_minus: '5,361,111',
    forfeit: '0',
    overdue_money: '122,121',
    valid_money: '5,361,12312',
    money_pay_date: '5,361,756'
}

export const infoSettlement = {
    reality_date: '17/10/2022',
    number_days_difference: '4',
    deduction_fee: undefined,
    actual_settlement_state: '1,112,121',
    total_amount_settlement: '5,361',
    difference: '5,361',
    early_settlement_fee: '5,361,111',
    forfeit: '0',
    overdue_money: '122,121',
    valid_money: '5,361,12312',
    money_pay_date: '5,361,756',
    fee: '111,111',
    interest: '222,222'
}


export const radioForm = [{ id: 1, value: 'Thanh toán kỳ', title: 'Thanh toán kỳ' }, { id: 2, value: 'Thanh toán kỳ 1', title: 'Thanh toán kỳ 1' }];
export const radioMethod = [{ id: 1, value: 'Tiền mặt', title: 'Chuyển khoản' }, { id: 2, value: 'Chuyển khoản', title: 'Chuyển khoản' }];
export const radioApplicationExemption = [{ id: 1, value: 'Có', title: 'Có' }, { id: 2, value: 'Không', title: 'Không' }];

export const dataLoanRecovery = {
    name_customer: 'Nguyên Đinh Dũng',
    loan_product: 'Xe Máy Honda Vision 110 2019',
    loan_format: 'Đăng ký xe',
    loan_timer: '04/09/2021 - 04/09/2022 (366 ngày)',
    payment_method: 'Dư nợ giảm dần',
    loan_amount: '15,000,000',
    remaining_principal_balance: '15,000,000',
    amount_paid: '25,033,039',
    money_paid: '25,033,039',
    money_owed: '21,122,123',
    slow_period: '2',
    unpaid_money: '25,033,111',
    overdue_money: '111,111,222',
    penalty_for_late_payment: '2,767,427'
}


export const typeDownloadLicenseData = [
    {
        id: '1',
        title: 'Toàn bộ ảnh',
        value: 'Toàn bộ ảnh',
        status: false
    },
    {
        id: '2',
        title: 'Hồ sơ nhân thân',
        value: 'Hồ sơ nhân thân',
        status: false

    },
    {
        id: '3',
        title: 'Hồ sơ chứng minh thu nhập',
        value: 'Hồ sơ chứng minh thu nhập',
        status: false
    },
    {
        id: '4',
        title: 'Hồ sơ tài sản',
        value: 'Hồ sơ tài sản',
        status: false
    },
    {
        id: '5',
        title: 'Hồ sơ thẩm định thực địa',
        value: 'Hồ sơ thẩm định thực địa',
        status: false
    },
    {
        id: '6',
        title: 'Thỏa thuận',
        value: 'Thỏa thuận',
        status: false
    },
    {
        id: '7',
        title: 'Hồ sơ gia hạn',
        value: 'Hồ sơ gia hạn',
        status: false
    },
    {
        id: '8',
        title: 'Thực nghiệm hiện trường THN',
        value: 'Thực nghiệm hiện trường THN',
        status: false
    },
    {
        id: '9',
        title: 'Ảnh gắn thiết bị định vị',
        value: 'Ảnh gắn thiết bị định vị',
        status: false
    }
] as ItemPropsModel[];

export const ImageLicenseData = [
    {
        id: '1',
        title: 'Hồ sơ nhân thân',
        itemList: [
            {
                id: '1',
                image: 'https://thumbs.dreamstime.com/b/small-tree-growing-sunrise-green-world-earth-day-concept-162365691.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '2',
                image: 'https://cdn.tgdd.vn/hoi-dap/1353143/file-duoi-jpeg-la-gi-cach-mo-va-chuyen-duoi-jpeg-sang-png-24-800x387.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '3',
                image: 'https://cdn.tgdd.vn/hoi-dap/1353143/file-duoi-jpeg-la-gi-cach-mo-va-chuyen-duoi-jpeg-sang-png-24-800x387.jpg',
                dateTime: '01/11/2022 23:23:12'
            }, {
                id: '4',
                image: 'https://cdn.tgdd.vn/hoi-dap/1353143/file-duoi-jpeg-la-gi-cach-mo-va-chuyen-duoi-jpeg-sang-png-24-800x387.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '5',
                image: 'https://thumbs.dreamstime.com/b/small-tree-growing-sunrise-green-world-earth-day-concept-162365691.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '6',
                image: 'https://thumbs.dreamstime.com/b/small-tree-growing-sunrise-green-world-earth-day-concept-162365691.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '7',
                image: 'https://cdn.tgdd.vn/hoi-dap/1353143/file-duoi-jpeg-la-gi-cach-mo-va-chuyen-duoi-jpeg-sang-png-24-800x387.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '8',
                video: 'https://res.cloudinary.com/codelife/video/upload/v1637805738/intro_l5ul1k.mp4',
                dateTime: '01/11/2022 23:23:12'
            }
        ],
    },
    {
        id: '2',
        title: 'Hồ sơ chứng minh thu nhập',
        itemList: [
            {
                id: '1',
                image: 'https://cdn.tgdd.vn/hoi-dap/1353143/file-duoi-jpeg-la-gi-cach-mo-va-chuyen-duoi-jpeg-sang-png-24-800x387.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '2',
                image: 'https://thumbs.dreamstime.com/b/small-tree-growing-sunrise-green-world-earth-day-concept-162365691.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '3',
                image: 'https://thumbs.dreamstime.com/b/small-tree-growing-sunrise-green-world-earth-day-concept-162365691.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '4',
                image: 'https://thumbs.dreamstime.com/b/small-tree-growing-sunrise-green-world-earth-day-concept-162365691.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '5',
                image: 'https://thumbs.dreamstime.com/b/small-tree-growing-sunrise-green-world-earth-day-concept-162365691.jpg',
                dateTime: '01/11/2022 23:23:12'
            }
        ],
    },
    {
        id: '3',
        title: 'Hồ sơ tài sản',
        itemList: [
            {
                id: '1',
                image: 'https://cdn.tgdd.vn/hoi-dap/1353143/file-duoi-jpeg-la-gi-cach-mo-va-chuyen-duoi-jpeg-sang-png-27-800x450.jpg',
                dateTime: '01/11/2022 23:23:12'
            },
            {
                id: '2',
                image: 'https://thumbs.dreamstime.com/b/small-tree-growing-sunrise-green-world-earth-day-concept-162365691.jpg',
                dateTime: '01/11/2022 23:23:12'
            }
        ],
    },
    {
        id: '4',
        title: 'Hồ sơ thẩm định thực địa',
        itemList: [],
    },
    {
        id: '5',
        title: 'Thỏa thuận',
        itemList: [],
    },
    {
        id: '6',
        title: 'Hồ sơ gia hạn',
        itemList: [],
    },
    {
        id: '7',
        title: 'Thực nghiệm hiện trường THN',
        itemList: [],
    },
    {
        id: '8',
        title: 'Ảnh gắn thiết bị định vị',
        itemList: [],
    }
] as ImageGroupModel[];
