import { Grid } from '@mui/material';
import IcCar from 'assets/icon/ic_green_car_loan.svg';
import IcDollar from 'assets/icon/ic_green_dollar_loan.svg';
import IcHome from 'assets/icon/ic_green_home_loan.svg';
import IcBike from 'assets/icon/ic_green_motorbike_loan.svg';
import IcShield from 'assets/icon/ic_green_shield_loan.svg';

import classNames from 'classnames/bind';
import { TYPE_ASSETS, TYPE_CAPITALIZE, TYPE_INPUT } from 'commons/constants';
import Languages from 'commons/languages';
import { CartUpload } from 'components/cart-upload';
import { PropsUploadActions } from 'components/cart-upload/types';
import CheckBoxSelect, { CheckBoxAction } from 'components/check-box-select/check-box-select';
import ContractFooter from 'components/contract-footer/contract-footer';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerLoanComponent, { PickerAction } from 'components/picker-loan-component/picker-loan-component';
import { MyTextAreaInput } from 'components/text-area';
import sessionManager from 'managers/session-manager';
import { ItemPropsModel } from 'models/item-props-model';
import { AssetInfoModel, InsuranceInfoModel, LoanInfoModel } from 'models/loan-contract';
import { InsuranceInfoData, insuranceItemInputRef, insuranceItemPickerRef, ItemHomeLand, ItemInsuranceInfomation as ItemInsuranceInfomation, ItemLoanInfomation as ItemLoanInfomation, ItemVehicleInfomation as ItemVehicleInfomation, landItemInputRef, loanDepreciationInfomation as loanDepreciationInfomation, LoanInfoData, loanItemInputRef, loanItemPickerRef, VehicleInfoData, vehicleItemInputRef, vehicleItemPickerRef } from 'pages/__mocks__/ContractInfomation';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import formValidate from 'utils/form-validate';
import utils from 'utils/utils';
import { InfoChild, KEY_CONTRACT } from '..';
import { ContractActions, ContractProps } from '../types';
import styles from './step-loan-info.module.scss';

const cx = classNames.bind(styles);

const StepLoanInfo = forwardRef<ContractActions, ContractProps>(({ onBack, onContinue, onSave }: ContractProps, ref: any) => {
    // const { userManager } = useAppStore();
    // const navigate = useNavigate();

    const frontCardRef = useRef<PropsUploadActions>(null);
    const behindCardRef = useRef<PropsUploadActions>(null);
    const locateImgRef = useRef<PropsUploadActions>(null);

    const loanPickerRef = loanItemPickerRef.map(() => useRef<PickerAction>(null));
    const loanInputRef = loanItemInputRef.map(() => useRef<TextFieldActions>(null));
    const depreciationRef = useRef<CheckBoxAction>(null);

    const vehicleInputRef = vehicleItemInputRef.map(() => useRef<TextFieldActions>(null));
    const vehiclePickerRef = vehicleItemPickerRef.map(() => useRef<PickerAction>(null));

    const landInputRef = landItemInputRef.map(() => useRef<TextFieldActions>(null));

    const insurancePickerRef = insuranceItemPickerRef.map(() => useRef<PickerAction>(null));
    const insuranceInputRef = insuranceItemInputRef.map(() => useRef<TextFieldActions>(null));

    const [typeAsset, setTypeAsset] = useState<string>(sessionManager?.contractInfo?.loan?.loanInfo?.loanTypeAssetValue || '');
    const [loanInfoData, setLoanInfoData] = useState<any>(LoanInfoData);
    const [vehicleInfoData, setVehicleInfoData] = useState<any>(VehicleInfoData);
    const [insuranceInfoData, setInsuranceInfoData] = useState<any>(InsuranceInfoData);
    const [depreciationValue, setDepreciationValue] = useState<ItemPropsModel[]>(sessionManager?.contractInfo?.loan?.loanInfo?.loanDepreciationValue || loanDepreciationInfomation);

    const [loanInfoValue, setLoanInfoValue] = useState<LoanInfoModel>(sessionManager.contractInfo?.loan?.loanInfo || {});
    const [insuranceInfoValue, setInsuranceInfoValue] = useState<InsuranceInfoModel>(sessionManager.contractInfo?.loan?.insuranceInfo || {});
    const [assetInfoValue, setAssetInfoValue] = useState<AssetInfoModel>(sessionManager.contractInfo?.loan?.assetInfo || {});

    const [arrayLoanPickerErrorMsg, setArrayLoanPickerErrorMsg] = useState<Array<string>>([]);
    const [arrayLoanInputErrorMsg, setArrayLoanInputErrorMsg] = useState<Array<string>>([]);
    const [arrayVehiclePickerErrorMsg, setArrayVehiclePickerErrorMsg] = useState<Array<string>>([]);
    const [arrayVehicleInputErrorMsg, setArrayVehicleInputErrorMsg] = useState<Array<string>>([]);
    const [arrayLandInputErrorMsg, setArrayLandInputErrorMsg] = useState<Array<string>>([]);

    const [infoSteps, setInfoSteps] = useState<InfoChild[]>(sessionManager?.stepsInfoContract?.[1]?.info_child || []);

    useEffect(() => {
        if (sessionManager.contractInfo?.loan) {
            setLoanInfoValue(sessionManager?.contractInfo?.loan?.loanInfo || {});
            setAssetInfoValue(sessionManager?.contractInfo?.loan?.assetInfo || {});
            setInsuranceInfoValue(sessionManager?.contractInfo?.loan?.insuranceInfo || {});
            setInfoSteps(sessionManager?.stepsInfoContract?.[1]?.info_child || []);
        }
    }, []);

    const fillData = useCallback((_data?: any) => {
    }, []);

    const validate = useCallback(() => {

        loanPickerRef.map((item: any, index: number) => {
            if (item !== loanPickerRef[1]) {
                const errMsgLoanPicker = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setError?.(errMsgLoanPicker);
                const newData = arrayLoanPickerErrorMsg?.splice(index, 1, errMsgLoanPicker);
                setArrayLoanPickerErrorMsg(newData);
            } else {
                const errMsgLoanTypeAsset = formValidate.emptyValidate(typeAsset);
                loanPickerRef[1].current?.setError?.(errMsgLoanTypeAsset);
                const newData = arrayLoanPickerErrorMsg?.splice(1, 1, errMsgLoanTypeAsset);
                setArrayLoanPickerErrorMsg(newData);
            }
        });

        loanInputRef.map((item: any, index: number) => {
            if (item === loanInputRef[2]) {
                const errMsgLoanInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setErrorMsg?.(errMsgLoanInput);
                const newData = arrayLoanInputErrorMsg?.splice(index, 1, errMsgLoanInput);
                setArrayLoanInputErrorMsg(newData);
            }
        });

        if (typeAsset === TYPE_ASSETS.HOME) {
            landInputRef.map((item: any, index: number) => {
                if (item !== landInputRef[9]) {
                    const errMsgLandInput = formValidate.emptyValidate(item.current?.getValue?.());
                    item.current?.setErrorMsg?.(errMsgLandInput);
                    const newData = arrayLandInputErrorMsg?.splice(index, 1, errMsgLandInput);
                    setArrayLandInputErrorMsg(newData);
                }
            });
        } else {
            vehicleInputRef.map((item: any, index: number) => {
                const errMsgVehicleInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setErrorMsg?.(errMsgVehicleInput);
                const newData = arrayVehicleInputErrorMsg?.splice(index, 1, errMsgVehicleInput);
                setArrayVehicleInputErrorMsg(newData);
            });

            vehiclePickerRef.map((item: any, index: number) => {
                if (typeAsset === TYPE_ASSETS.CAR) {
                    const errMsgVehiclePicker = formValidate.emptyValidate(item.current?.getValue?.());
                    item.current?.setError?.(errMsgVehiclePicker);
                    const newData = arrayVehiclePickerErrorMsg?.splice(index, 1, errMsgVehiclePicker);
                    setArrayVehiclePickerErrorMsg(newData);
                }
            });
        }

        const arrayLoanPickerErrorMsgFilter = arrayLoanPickerErrorMsg.filter((item: string) => { return item; });
        const arrayLoanInputErrorMsgFilter = arrayLoanInputErrorMsg.filter((item: string) => { return item; });
        const arrayLandInputErrorMsgFilter = arrayLandInputErrorMsg.filter((item: string) => { return item; });
        const arrayVehicleInputErrorMsgFilter = arrayVehicleInputErrorMsg.filter((item: string) => { return item; });
        const arrayVehiclePickerErrorMsgFilter = arrayVehiclePickerErrorMsg.filter((item: string) => { return item; });

        if (arrayLoanPickerErrorMsgFilter.length + arrayLoanInputErrorMsgFilter.length + arrayLandInputErrorMsgFilter.length + arrayVehicleInputErrorMsgFilter.length + arrayVehiclePickerErrorMsgFilter.length === 0) {
            return true;
        } else { return false; }
    }, [arrayLandInputErrorMsg, arrayLoanInputErrorMsg, arrayLoanPickerErrorMsg, arrayVehicleInputErrorMsg, arrayVehiclePickerErrorMsg, landInputRef, loanInputRef, loanPickerRef, typeAsset, vehicleInputRef, vehiclePickerRef]);

    useImperativeHandle(ref, () => ({
        validate,
        fillData
    }));

    const renderContentDivider = useCallback((_title: string, _icon?: string) => {
        return (
            <div className={cx('content-divider-container')}>
                <img src={_icon} />
                <span className={cx('title-divider-text')}>{_title}</span>
                <div className={cx('divider-container')}></div>
            </div>
        );
    }, []);

    const renderTextAreaInput = useCallback((_ref: any, _value: string, _title: string, _keyValue: string, _indexField?: number) => {
        const onChangeTextArea = (text: string) => {
            if (_keyValue) {
                setInsuranceInfoValue((last) => {
                    const newInsuranceObj = last;
                    newInsuranceObj[_keyValue] = text;
                    return newInsuranceObj;
                });
                setInfoSteps(last => {
                    if (last.filter(_last => _last?.id === _indexField).length > 0) {
                        last.filter(_last => _last?.id === _indexField)[0].value = text || _value;
                        return last;
                    }
                    return [...last, { title: _title, value: text || _value, id: _indexField }];
                });
            }
        };
        return (
            <Grid item xs={12} md={6} className={cx('item-picker-container')}>
                <div className={cx('title-item-picker-container')}>
                    <span className={cx('title-item-picker-text')}>{_title}</span>
                </div>
                <MyTextAreaInput
                    ref={_ref}
                    value={_value}
                    inputStyle={cx('textarea-container')}
                    placeHolder={Languages.common.input}
                    onChangeText={onChangeTextArea}
                />
            </Grid>
        );
    }, []);

    const renderDepreciation = useCallback((_ref: any, _title: string, _data: ItemPropsModel[]) => {
        return (
            <Grid item xs={12} md={4} className={cx('item-picker-container')}>
                <CheckBoxSelect ref={_ref} data={_data} title={_title} onChangeText={() => { }} titleContainer={cx('title-depcreciation')} />
            </Grid>
        );
    }, []);

    const handleReChoose = useCallback(() => {
        frontCardRef.current?.clearFile?.();
        behindCardRef.current?.clearFile?.();
        locateImgRef.current?.clearFile?.();
    }, []);

    const handleUploadImage = useCallback(() => {

    }, []);

    const renderVehicleCard = useCallback((_ref: any, _title: string, hasButton?: boolean) => {
        return (
            <Grid item xs={12} md={4} className={cx('item-card-container')}>
                <CartUpload ref={_ref}
                    title={_title}
                    hasButtonBottom={hasButton}
                    onLeftButton={handleReChoose}
                    onRightButton={handleUploadImage}
                />
            </Grid>
        );
    }, [handleReChoose, handleUploadImage]);

    const renderAssetInput = useCallback((_keyArray: string, _title: string, _refInput: TextFieldActions | any, _value: string, _keyValue: string, _maxLength: number, _type: any, _indexField?: number, _xsRow?: number, _mdRow?: number, _isMustChoose?: boolean, _disable?: boolean, _isRed?: boolean, capitalize?: TYPE_CAPITALIZE) => {
        const onChangeInput = (event: any) => {
            if (_keyArray === Languages.loanInfo.loanInfo) {
                setLoanInfoValue((last) => {
                    const newLoanObj = last;
                    newLoanObj[_keyValue] = utils.formatLoanMoney(`${_refInput.current?.getValue?.()}`);
                    return newLoanObj;
                });
            } else if (_keyArray === Languages.loanInfo.vehicleSignUpInfo) {
                setAssetInfoValue((last) => {
                    const newVehicleObj = last;
                    newVehicleObj[_keyValue] = _refInput.current?.getValue?.();
                    return newVehicleObj;
                });
            } else if (_keyArray === Languages.loanInfo.insuranceInfo) {
                setInsuranceInfoValue((last) => {
                    const newInsuranceObj = last;
                    newInsuranceObj[_keyValue] = _refInput.current?.getValue?.();
                    return newInsuranceObj;
                });
            } else return null;

            setInfoSteps(last => {
                if (last.filter(_last => _last.id === _indexField).length > 0) {
                    if (_keyArray === Languages.loanInfo.loanInfo) {
                        last.filter(_last => _last.id === _indexField)[0].value = utils.formatLoanMoney(_refInput.current?.getValue?.() || _value);
                    } else {
                        if (_type === TYPE_INPUT.DATE) {
                            const [year, month, day] = _refInput.current?.getValue?.()?.trim().split('-') || '';
                            last.filter(_last => _last.id === _indexField)[0].value = `${day}/${month}/${year}` || '';
                        } else {
                            last.filter(_last => _last.id === _indexField)[0].value = _refInput.current?.getValue?.() || _value;
                        }
                    }
                    return last;
                }
                return [...last, { title: _title, value: _refInput.current?.getValue?.() || _value, id: _indexField, status: _isRed }];
            });
        };
        return (
            <Grid item xs={_xsRow || 12} md={_mdRow || 4} className={cx('item-picker-container')}>
                <div className={cx('title-item-picker-container')}>
                    <span className={cx('title-item-picker-text')}>{_title}</span>
                    {!_isMustChoose && <span className={cx('title-item-must-choose-picker')}>{Languages.common.mustChoose}</span>}
                </div>
                <MyTextInput
                    ref={_refInput}
                    type={_type}
                    inputStyle={cx(_disable ? 'content-disable-item-picker-text' : 'content-item-picker-text')}
                    placeHolder={_disable ? Languages.loanInfo.vnd : _type === TYPE_INPUT.DATE ? Languages.common.ok : Languages.common.input}
                    value={_value}
                    maxLength={_maxLength}
                    onChangeText={onChangeInput}
                    disabled={_disable}
                    capitalize={capitalize || TYPE_CAPITALIZE.NONE}
                />
            </Grid>
        );
    }, []);

    const resetValue = useCallback(() => {
        loanInputRef.map((item: any) => { item.current?.setValue?.(''); item.current?.setErrorMsg?.(''); });
        vehicleInputRef.map((item: any) => { item.current?.setValue?.(''); item.current?.setErrorMsg?.(''); });
        landInputRef.map((item: any) => { item.current?.setValue?.(''); item.current?.setErrorMsg?.(''); });
        insuranceInputRef.map((item: any) => item.current?.setValue?.(''));

        insurancePickerRef.map((item: any) => item.current?.clearValue?.());
        loanPickerRef.map((item: any, index: number) => {
            if (index !== 1 && index !== 0) {
                item.current?.clearValue?.(); item.current?.setError?.('');
            }
        });
        vehiclePickerRef.map((item: any) => { item.current?.clearValue?.(); item.current?.setError?.(''); });
        depreciationRef.current?.clearValue?.();

    }, [insuranceInputRef, insurancePickerRef, landInputRef, loanInputRef, loanPickerRef, vehicleInputRef, vehiclePickerRef]);

    const renderItemLoanPicker = useCallback((_keyArray: string, _ref: any, _data: ItemPropsModel[], _value: any, _title: string, _keyValue: string, _indexField?: number, _isImportant?: boolean, xsInsurance?: number, mdInsurance?: number, isCheckbox?: boolean) => {
        const onCheckbox = () => {
            if (isCheckbox) {
                setInsuranceInfoValue((last) => {
                    const newLoanObj = last;
                    newLoanObj[_keyValue] = undefined;
                    return newLoanObj;
                });
            }
        };

        const handleSelectItemPicker = (item: string) => {
            if (_keyValue === ItemLoanInfomation[1].keyValue && item !== typeAsset) {
                setLoanInfoValue({ loanFormValue: loanPickerRef[0]?.current?.getValue?.() || sessionManager.contractInfo?.loan?.loanInfo?.loanFormValue, loanTypeAssetValue: loanPickerRef[1]?.current?.getValue?.() || '' });
                setAssetInfoValue({});
                setInsuranceInfoValue({});
                setInfoSteps([{ title: ItemLoanInfomation[0].text, value: sessionManager?.contractInfo?.loan?.loanInfo?.loanFormValue || '', id: 1 }]);
                resetValue();
            } else null;

            if (_keyArray === Languages.loanInfo.loanInfo) {
                setLoanInfoValue((last) => {
                    const newLoanObj = last;
                    if (_keyValue === ItemLoanInfomation[1].keyValue) {
                        setTypeAsset(item);
                        newLoanObj[_keyValue] = item || sessionManager.contractInfo?.loan?.loanInfo?.loanTypeAssetValue;
                    } else {
                        newLoanObj[_keyValue] = item;
                    }
                    return newLoanObj;
                });
            } else if (_keyArray === Languages.loanInfo.vehicleSignUpInfo) {
                setAssetInfoValue((last) => {
                    const newVehicleObj = last;
                    newVehicleObj[_keyValue] = item;
                    return newVehicleObj;
                });
            } else if (_keyArray === Languages.loanInfo.insuranceInfo) {
                setInsuranceInfoValue((last) => {
                    const newInsuranceObj = last;
                    newInsuranceObj[_keyValue] = item;
                    return newInsuranceObj;
                });
            } else return null;
            setInfoSteps(last => {
                if (last.filter(_last => _last.id === _indexField).length > 0) {
                    last.filter(_last => _last.id === _indexField)[0].value = item ? item : _value;
                    return last;
                }
                return [...last, { title: _title, value: item ? item : _value, id: _indexField }];
            });
        };
        return (
            <Grid item xs={xsInsurance || 12} md={mdInsurance || 4}>
                <PickerLoanComponent ref={_ref} value={_value} data={_data} isImportant={_isImportant} title={_title} isCheckbox={isCheckbox}
                    onSelectItem={handleSelectItemPicker} onCheckbox={onCheckbox}
                    defaultValue={_value ? _value : undefined}
                />
            </Grid>
        );
    }, [loanPickerRef, resetValue, typeAsset]);

    const renderItemListLoanPicker = useMemo(() => {
        return (
            <Grid container spacing={2} className={cx('content-item-picker-container')}>
                <Grid container item spacing={2}>
                    {renderItemLoanPicker(Languages.loanInfo.loanInfo, loanPickerRef[0], loanInfoData?.obj1, loanInfoValue?.loanFormValue, ItemLoanInfomation[0].text, ItemLoanInfomation[0].keyValue, 1, true)}
                    {renderItemLoanPicker(Languages.loanInfo.loanInfo, loanPickerRef[1], loanInfoData?.obj2, loanInfoValue.loanTypeAssetValue, ItemLoanInfomation[1].text, ItemLoanInfomation[1].keyValue, 2, true)}
                    {renderItemLoanPicker(Languages.loanInfo.loanInfo, loanPickerRef[2], loanInfoData?.obj3, loanInfoValue?.loanProductValue, ItemLoanInfomation[2].text, ItemLoanInfomation[2].keyValue, 3, true)}
                </Grid>
                <Grid container item spacing={2}>
                    {renderItemLoanPicker(Languages.loanInfo.loanInfo, loanPickerRef[3], loanInfoData?.obj4, loanInfoValue?.loanNameAssetValue, ItemLoanInfomation[3].text, ItemLoanInfomation[3].keyValue, 4, true)}
                    {renderAssetInput(Languages.loanInfo.loanInfo, ItemLoanInfomation[4].text, loanInputRef[0], loanInfoValue?.loanAssetValue || '', ItemLoanInfomation[4].keyValue, 250, TYPE_INPUT.TEXT, 5, 12, 4, true, true)}
                    {renderAssetInput(Languages.loanInfo.loanInfo, ItemLoanInfomation[5].text, loanInputRef[1], loanInfoValue?.loanMaxMountValue || '', ItemLoanInfomation[5].keyValue, 250, TYPE_INPUT.TEXT, 6, 12, 4, true, true)}
                </Grid>
                <Grid container item spacing={2} className={cx('wrap-depcreciation')}>
                    {typeAsset !== TYPE_ASSETS.HOME ? renderDepreciation(depreciationRef, ItemLoanInfomation[6].text, depreciationValue) : <Grid item xs={12} md={4}></Grid>}
                    {renderItemLoanPicker(Languages.loanInfo.loanInfo, loanPickerRef[4], loanInfoData?.obj5, loanInfoValue?.loanPurposeValue, ItemLoanInfomation[7].text, ItemLoanInfomation[7].keyValue, 8, true)}
                    {renderAssetInput(Languages.loanInfo.loanInfo, ItemLoanInfomation[8].text, loanInputRef[2], loanInfoValue?.loanMountValue || '', ItemLoanInfomation[8].keyValue, 250, TYPE_INPUT.TEXT, 6, 12, 4, true, false, true)}
                </Grid>
                <Grid container item spacing={2}>
                    {renderItemLoanPicker(Languages.loanInfo.loanInfo, loanPickerRef[5], loanInfoData?.obj6, loanInfoValue?.loanTimerValue, ItemLoanInfomation[9].text, ItemLoanInfomation[9].keyValue, 10, true)}
                    {renderItemLoanPicker(Languages.loanInfo.loanInfo, loanPickerRef[6], loanInfoData?.obj7, loanInfoValue?.loanFormInterestPayValue, ItemLoanInfomation[10].text, ItemLoanInfomation[10].keyValue, 11, true)}
                    {renderItemLoanPicker(Languages.loanInfo.loanInfo, loanPickerRef[7], loanInfoData?.obj8, loanInfoValue?.loanSpecialOfferValue, ItemLoanInfomation[11].text, ItemLoanInfomation[11].keyValue, 12, true)}
                </Grid>
            </Grid>
        );
    }, [renderItemLoanPicker, loanPickerRef, loanInfoData?.obj1, loanInfoData?.obj2, loanInfoData?.obj3, loanInfoData?.obj4, loanInfoData?.obj5, loanInfoData?.obj6, loanInfoData?.obj7, loanInfoData?.obj8, loanInfoValue?.loanFormValue, loanInfoValue.loanTypeAssetValue, loanInfoValue?.loanProductValue, loanInfoValue?.loanNameAssetValue, loanInfoValue?.loanAssetValue, loanInfoValue?.loanMaxMountValue, loanInfoValue?.loanPurposeValue, loanInfoValue?.loanMountValue, loanInfoValue?.loanTimerValue, loanInfoValue?.loanFormInterestPayValue, loanInfoValue?.loanSpecialOfferValue, renderAssetInput, loanInputRef, typeAsset, renderDepreciation, depreciationValue]);

    const renderItemVehicleListLoanPicker = useCallback((check?: boolean) => {
        return (
            <Grid container spacing={2} className={cx(typeAsset !== TYPE_ASSETS.HOME && 'content-item-vehicle-picker-container')}>
                {typeAsset === TYPE_ASSETS.HOME ?
                    <>
                        <Grid container item spacing={2}>
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[0].title, landInputRef[0], assetInfoValue?.typeLand || '', ItemHomeLand[0].keyValue, 250, TYPE_INPUT.TEXT, 13)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[1].title, landInputRef[1], assetInfoValue?.landPlotNo || '', ItemHomeLand[1].keyValue, 250, TYPE_INPUT.TEXT, 14)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[2].title, landInputRef[2], assetInfoValue?.mapSheetNo || '', ItemHomeLand[2].keyValue, 250, TYPE_INPUT.TEXT, 15)}
                        </Grid>
                        <Grid container item spacing={2}>
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[3].title, landInputRef[3], assetInfoValue?.landAddress || '', ItemHomeLand[3].keyValue, 250, TYPE_INPUT.TEXT, 16)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[4].title, landInputRef[4], assetInfoValue?.area || '', ItemHomeLand[4].keyValue, 250, TYPE_INPUT.TEXT, 17)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[5].title, landInputRef[5], assetInfoValue?.privateUsageForm || '', ItemHomeLand[5].keyValue, 250, TYPE_INPUT.TEXT, 18)}
                        </Grid>
                        <Grid container item spacing={2}>
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[6].title, landInputRef[6], assetInfoValue?.publicUsageForm || '', ItemHomeLand[6].keyValue, 250, TYPE_INPUT.TEXT, 19)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[7].title, landInputRef[7], assetInfoValue?.purposeUsage || '', ItemHomeLand[7].keyValue, 250, TYPE_INPUT.TEXT, 20)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[8].title, landInputRef[8], assetInfoValue?.timeUsage || '', ItemHomeLand[8].keyValue, 10, TYPE_INPUT.TEXT, 21)}
                        </Grid>
                        <Grid container item spacing={2}>
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[9].title, landInputRef[9], assetInfoValue?.house || '', ItemHomeLand[9].keyValue, 250, TYPE_INPUT.TEXT, 22, 12, 4, true, false)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[10].title, landInputRef[10], assetInfoValue?.certificateNo || '', ItemHomeLand[10].keyValue, 250, TYPE_INPUT.TEXT, 23)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[11].title, landInputRef[11], assetInfoValue?.issuedBy || '', ItemHomeLand[11].keyValue, 10, TYPE_INPUT.TEXT, 24)}
                        </Grid>
                        <Grid container item spacing={2}>
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[12].title, landInputRef[12], assetInfoValue?.dateRange || '', ItemHomeLand[12].keyValue, 250, TYPE_INPUT.DATE, 25)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemHomeLand[13].title, landInputRef[13], assetInfoValue?.numbersIntoNote || '', ItemHomeLand[13].keyValue, 250, TYPE_INPUT.TEXT, 26)}
                        </Grid>
                    </> :
                    <>
                        <Grid container item spacing={2}>
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[0].text, vehicleInputRef[0], assetInfoValue?.vehicleOwnerFullNameValue || '', ItemVehicleInfomation[0].keyValue, 30, TYPE_INPUT.TEXT, 27, 12, 4, false, false, false, TYPE_CAPITALIZE.WORDS)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[1].text, vehicleInputRef[1], assetInfoValue?.vehicleBrandValue || '', ItemVehicleInfomation[1].keyValue, 250, TYPE_INPUT.TEXT, 28)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[2].text, vehicleInputRef[2], assetInfoValue?.vehicleModelValue || '', ItemVehicleInfomation[2].keyValue, 250, TYPE_INPUT.TEXT, 29)}
                        </Grid>
                        <Grid container item spacing={2}>
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[3].text, vehicleInputRef[3], assetInfoValue?.vehicleLicensePlatesValue || '', ItemVehicleInfomation[3].keyValue, 250, TYPE_INPUT.TEXT, 30)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[4].text, vehicleInputRef[4], assetInfoValue?.vehicleChassisNumberValue || '', ItemVehicleInfomation[4].keyValue, 250, TYPE_INPUT.TEXT, 31)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[5].text, vehicleInputRef[5], assetInfoValue?.vehicleEngineNumberValue || '', ItemVehicleInfomation[5].keyValue, 250, TYPE_INPUT.TEXT, 32)}

                        </Grid>
                        <Grid container item spacing={2}>
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[6].text, vehicleInputRef[6], assetInfoValue?.vehicleSignUpAddressValue || '', ItemVehicleInfomation[6].keyValue, 250, TYPE_INPUT.TEXT, 33)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[7].text, vehicleInputRef[7], assetInfoValue?.vehicleRegistrationNumberValue || '', ItemVehicleInfomation[7].keyValue, 250, TYPE_INPUT.TEXT, 34)}
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[8].text, vehicleInputRef[8], assetInfoValue?.vehicleDateRangeValue || '', ItemVehicleInfomation[8].keyValue, 10, TYPE_INPUT.DATE, 35)}
                        </Grid>
                        <Grid container item spacing={2}>
                            {renderAssetInput(Languages.loanInfo.vehicleSignUpInfo, ItemVehicleInfomation[9].text, vehicleInputRef[9], assetInfoValue?.vehicleKilometersTraveledValue || '', ItemVehicleInfomation[9].keyValue, 250, TYPE_INPUT.TEXT, 36)}
                            {check && renderItemLoanPicker(Languages.loanInfo.vehicleSignUpInfo, vehiclePickerRef[0], VehicleInfoData?.obj1, assetInfoValue?.vehicleSeriLocateValue, ItemVehicleInfomation?.[10].text, ItemVehicleInfomation[10].keyValue, 37, true, 12, 4)}
                        </Grid>
                    </>
                }
            </Grid>
        );
    }, [assetInfoValue?.area, assetInfoValue?.certificateNo, assetInfoValue?.dateRange, assetInfoValue?.house, assetInfoValue?.issuedBy, assetInfoValue?.landAddress, assetInfoValue?.landPlotNo, assetInfoValue?.mapSheetNo, assetInfoValue?.numbersIntoNote, assetInfoValue?.privateUsageForm, assetInfoValue?.publicUsageForm, assetInfoValue?.purposeUsage, assetInfoValue?.timeUsage, assetInfoValue?.typeLand, assetInfoValue?.vehicleBrandValue, assetInfoValue?.vehicleChassisNumberValue, assetInfoValue?.vehicleDateRangeValue, assetInfoValue?.vehicleEngineNumberValue, assetInfoValue?.vehicleKilometersTraveledValue, assetInfoValue?.vehicleLicensePlatesValue, assetInfoValue?.vehicleModelValue, assetInfoValue?.vehicleOwnerFullNameValue, assetInfoValue?.vehicleRegistrationNumberValue, assetInfoValue?.vehicleSeriLocateValue, assetInfoValue?.vehicleSignUpAddressValue, landInputRef, renderAssetInput, renderItemLoanPicker, typeAsset, vehicleInputRef, vehiclePickerRef]);

    const renderItemInsuranceListLoanPicker = useCallback((typeCheck?: boolean) => {

        return (
            <Grid container spacing={2} className={cx('content-item-insurance-picker-container')}>
                <Grid container item spacing={2}>
                    {renderItemLoanPicker(Languages.loanInfo.insuranceInfo, insurancePickerRef[0], insuranceInfoData?.obj1, insuranceInfoValue?.insuranceLoanValue, ItemInsuranceInfomation[0].text, ItemInsuranceInfomation[0].keyValue, 38, false, 12, 3, true)}
                    {renderAssetInput(Languages.loanInfo.insuranceInfo, ItemInsuranceInfomation[1].text, insuranceInputRef[0], insuranceInfoValue?.insuranceLoanFeeValue || '', ItemInsuranceInfomation[1].keyValue, 250, TYPE_INPUT.TEXT, 39, 12, 3, true, true)}
                    {renderItemLoanPicker(Languages.loanInfo.insuranceInfo, insurancePickerRef[1], insuranceInfoData?.obj3, insuranceInfoValue?.insuranceLifeValue, ItemInsuranceInfomation[2].text, ItemInsuranceInfomation[2].keyValue, 40, false, 12, 3)}
                    {renderAssetInput(Languages.loanInfo.insuranceInfo, ItemInsuranceInfomation[3].text, insuranceInputRef[1], insuranceInfoValue?.insuranceLifeFeeValue || '', ItemInsuranceInfomation[3].keyValue, 250, TYPE_INPUT.TEXT, 41, 12, 3, true, true)}
                </Grid>
                {typeCheck &&
                    <Grid container item spacing={2}>
                        {renderItemLoanPicker(Languages.loanInfo.insuranceInfo, insurancePickerRef[2], insuranceInfoData?.obj5, insuranceInfoValue?.insuranceGICMotorValue, ItemInsuranceInfomation[4].text, ItemInsuranceInfomation[4].keyValue, 42, false, 12, 3)}
                        {renderAssetInput(Languages.loanInfo.insuranceInfo, ItemInsuranceInfomation[5].text, insuranceInputRef[2], insuranceInfoValue?.insuranceMICMotorValue || '', ItemInsuranceInfomation[5].keyValue, 250, TYPE_INPUT.TEXT, 43, 12, 3, true, true)}
                        {renderItemLoanPicker(Languages.loanInfo.insuranceInfo, insurancePickerRef[3], insuranceInfoData?.obj7, insuranceInfoValue?.insuranceMICMotorValue, ItemInsuranceInfomation[6].text, ItemInsuranceInfomation[6].keyValue, 44, false, 12, 3)}
                        {renderAssetInput(Languages.loanInfo.insuranceInfo, ItemInsuranceInfomation[7].text, insuranceInputRef[3], insuranceInfoValue?.insuranceMICMotorFeeValue || '', ItemInsuranceInfomation[7].keyValue, 250, TYPE_INPUT.TEXT, 45, 12, 3, true, true)}
                    </Grid>}

                <Grid container item spacing={2}>
                    {renderItemLoanPicker(Languages.loanInfo.insuranceInfo, insurancePickerRef[4], insuranceInfoData?.obj9, insuranceInfoValue?.insuranceVBIValue, ItemInsuranceInfomation[8].text, ItemInsuranceInfomation[8].keyValue, 46, false, 12, 9)}
                    {renderAssetInput(Languages.loanInfo.insuranceInfo, ItemInsuranceInfomation[9].text, insuranceInputRef[4], insuranceInfoValue?.insuranceVBIFeeValue || '', ItemInsuranceInfomation[9].keyValue, 250, TYPE_INPUT.TEXT, 47, 12, 3, true, true)}
                </Grid>

                {typeCheck &&
                    <Grid container item spacing={2}>
                        {renderItemLoanPicker(Languages.loanInfo.insuranceInfo, insurancePickerRef[5], insuranceInfoData?.obj11, insuranceInfoValue?.insuranceTNDSValue, ItemInsuranceInfomation[10].text, ItemInsuranceInfomation[10].keyValue, 48, false, 12, 3)}
                        {renderItemLoanPicker(Languages.loanInfo.insuranceInfo, insurancePickerRef[6], insuranceInfoData?.obj12, insuranceInfoValue?.vehicleCapacityValue, ItemInsuranceInfomation[11].text, ItemInsuranceInfomation[11].keyValue, 49, false, 12, 3)}
                        {renderItemLoanPicker(Languages.loanInfo.insuranceInfo, insurancePickerRef[7], insuranceInfoData?.obj13, insuranceInfoValue?.insuranceResponsibilityLevelValue, ItemInsuranceInfomation?.[12].text, ItemInsuranceInfomation[12].keyValue, 50, false, 12, 3)}
                        {renderAssetInput(Languages.loanInfo.insuranceInfo, ItemInsuranceInfomation[13].text, insuranceInputRef[5], insuranceInfoValue?.insuranceTNDSFeeValue || '', ItemInsuranceInfomation[13].keyValue, 250, TYPE_INPUT.TEXT, 51, 12, 3, true, true)}
                    </Grid>}

                <Grid container item spacing={2}>
                    {renderItemLoanPicker(Languages.loanInfo.insuranceInfo, insurancePickerRef[8], insuranceInfoData?.obj15, insuranceInfoValue?.insurancePTIValue, ItemInsuranceInfomation[14].text, ItemInsuranceInfomation[14].keyValue, 52, false, 12, 3)}
                    {renderAssetInput(Languages.loanInfo.insuranceInfo, ItemInsuranceInfomation[15].text, insuranceInputRef[6], insuranceInfoValue?.insurancePTIFeeValue || '', ItemInsuranceInfomation[15].keyValue, 250, TYPE_INPUT.TEXT, 53, 12, 3, true, true)}
                    {renderTextAreaInput(insuranceInputRef[7], insuranceInfoValue?.insuranceNoteValue || '', ItemInsuranceInfomation[16].text, ItemInsuranceInfomation[16].keyValue, 54)}
                </Grid>
            </Grid>
        );
    }, [insuranceInfoData?.obj1, insuranceInfoData?.obj11, insuranceInfoData?.obj12, insuranceInfoData?.obj13, insuranceInfoData?.obj15, insuranceInfoData?.obj3, insuranceInfoData?.obj5, insuranceInfoData?.obj7, insuranceInfoData?.obj9, insuranceInfoValue?.insuranceGICMotorValue, insuranceInfoValue?.insuranceLifeFeeValue, insuranceInfoValue?.insuranceLifeValue, insuranceInfoValue?.insuranceLoanFeeValue, insuranceInfoValue?.insuranceLoanValue, insuranceInfoValue?.insuranceMICMotorFeeValue, insuranceInfoValue?.insuranceMICMotorValue, insuranceInfoValue?.insuranceNoteValue, insuranceInfoValue?.insurancePTIFeeValue, insuranceInfoValue?.insurancePTIValue, insuranceInfoValue?.insuranceResponsibilityLevelValue, insuranceInfoValue?.insuranceTNDSFeeValue, insuranceInfoValue?.insuranceTNDSValue, insuranceInfoValue?.insuranceVBIFeeValue, insuranceInfoValue?.insuranceVBIValue, insuranceInfoValue?.vehicleCapacityValue, insuranceInputRef, insurancePickerRef, renderAssetInput, renderItemLoanPicker, renderTextAreaInput]);

    const onSaveData = useCallback(() => {
        onSave?.();
    }, [onSave]);

    const onBackScreen = useCallback(() => {
        onBack?.();
    }, [onBack]);

    const onNextScreen = useCallback(() => {
        const dataArray = depreciationValue.filter((item: ItemPropsModel) => {
            return item?.status === true;
        }).map((item: ItemPropsModel) => { return item?.value; }).join(`${','}${'\xa0'}`);

        const navigateData = {
            loanInfo: { ...loanInfoValue, loanDepreciationValue: depreciationValue },
            assetInfo: { ...assetInfoValue },
            insuranceInfo: { ...insuranceInfoValue }
        };

        if (!insurancePickerRef[0]?.current?.getCheckBox?.()) {
            setInfoSteps(last => {
                if (last.filter(_last => _last.id === 38).length > 0) {
                    last.filter(_last => _last.id === 38)[0].value = '';
                    return last;
                }
                return [...last, { title: ItemLoanInfomation[0].text, value: '', id: 38 }];
            });
        } else {
            setInfoSteps(last => {
                if (last.filter(_last => _last.id === 38).length > 0) {
                    last.filter(_last => _last.id === 38)[0].value = insurancePickerRef[0]?.current?.getValue?.() || '';
                    return last;
                }
                return [...last, { title: ItemLoanInfomation[0].text, value: insurancePickerRef[0]?.current?.getValue?.() || '', id: 38 }];
            });
        }
        const arr = infoSteps.filter((item) => { return item?.id !== 7; });

        if (dataArray) {
            onContinue?.(navigateData, KEY_CONTRACT.loan, [...arr, { title: ItemLoanInfomation[6].text, value: dataArray, id: 7 }]);
        } else { onContinue?.(navigateData, KEY_CONTRACT.loan, [...arr, { title: ItemLoanInfomation[6].text, value: '', id: 7 }]); }
    }, [assetInfoValue, depreciationValue, infoSteps, insuranceInfoValue, insurancePickerRef, loanInfoValue, onContinue]);

    return (
        <div className={cx('main-container')}>
            <div className={cx('title-main-container')}>
                {Languages.loanInfo.loanInfo}
            </div>
            <div className={cx('content-loan-info-container')}>
                <div className={cx('loan-info-container')}>
                    {renderContentDivider(Languages.loanInfo.loanInfo, IcDollar)}
                    {renderItemListLoanPicker}
                </div>

                <div className={cx('vehicle-sign-up-info-container')}>
                    {typeAsset === TYPE_ASSETS.HOME ?
                        renderContentDivider(Languages.loanInfo.assetInformation, IcHome) :
                        renderContentDivider(Languages.loanInfo.vehicleSignUpInfo, typeAsset === TYPE_ASSETS.CAR ? IcCar : IcBike)
                    }

                    {typeAsset !== TYPE_ASSETS.HOME && <Grid container spacing={2} className={cx('content-vehicle-sign-up-info-container')}>
                        {renderVehicleCard(frontCardRef, Languages.loanInfo.frontVehicleCard,)}
                        {renderVehicleCard(behindCardRef, Languages.loanInfo.behindVehicleCard, true)}
                        {typeAsset === TYPE_ASSETS.CAR && renderVehicleCard(locateImgRef, Languages.loanInfo.imgLocate)}
                    </Grid>}
                    {renderItemVehicleListLoanPicker(typeAsset === TYPE_ASSETS.CAR)}
                </div>

                <div className={cx('insurance-info-container')}>
                    {renderContentDivider(Languages.loanInfo.insuranceInfo, IcShield)}
                    {renderItemInsuranceListLoanPicker(typeAsset === TYPE_ASSETS.MOTOR_BIKE)}
                </div>
            </div>
            <ContractFooter onBack={onBackScreen} onSave={onSaveData} onContinue={onNextScreen} />
        </div>
    );
});

export default StepLoanInfo;
