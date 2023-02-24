import { Grid } from '@mui/material';
import Ic_Address from 'assets/icon/ic_address.svg';
import Ic_Card from 'assets/icon/ic_green_card_loan.svg';
import Ic_Green_Tick from 'assets/icon/ic_green_tick_contract.svg';
import Ic_Job from 'assets/icon/ic_job.svg';
import Ic_Location from 'assets/icon/ic_location.svg';
import Ic_people from 'assets/icon/ic_onepeople.svg';
import Ic_Portrait from 'assets/icon/ic_portrait.svg';
import Ic_Relative from 'assets/icon/ic_relative.svg';
import Ic_Search from 'assets/icon/ic_search.svg';
import Ic_Warn from 'assets/icon/ic_yellow_warning_contract.svg';
import classNames from 'classnames/bind';
import { TYPE_INPUT } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { CartUpload } from 'components/cart-upload';
import { PropsUploadActions } from 'components/cart-upload/types';
import CheckBoxSelect, { CheckBoxAction } from 'components/check-box-select/check-box-select';
import ContractFooter from 'components/contract-footer/contract-footer';
import DialogManualUpload from 'components/dialog-manual-upload/dialog-manual-upload';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerLoanComponent, { PickerAction } from 'components/picker-loan-component/picker-loan-component';
import RadioSelect, { RadioAction } from 'components/radio-select/radio-select';
import { MyTextAreaInput } from 'components/text-area';
import { TextAreaActions } from 'components/text-area/types';
import sessionManager from 'managers/session-manager';
import { ItemPropsModel } from 'models/item-props-model';
import { PopupBaseActions } from 'models/modal-model';
import { checkBoxLivingData, City, District, fromTakeWage, GenderCustomerContract, job, Location, PapContract, relationship, Resident, resources, StatusCustomerContract, TypeCustomerContract, Ward } from 'pages/__mocks__/ContractInfomation';
import { currentAddressInput, currentAddressSelect, CustomerInformationInput, CustomerInformationSelect, householdAddressInput, householdAddressSelect, jobInput, jobSelect, relativeInformationInput, relativeInformationSelect } from 'pages/__mocks__/CreateLoanContract';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import formValidate from 'utils/form-validate';
import { InfoChild, KEY_CONTRACT } from '..';
import { ContractActions, ContractProps } from '../types';
import styles from './step-customer-info.module.scss';
import { InfoCustomer, LoadAddressIn, LoadHouseholdAddress, loadInfoClient, LoadInforRelative, LoadJob, SearchCustomer } from './type';

const cx = classNames.bind(styles);

const StepCustomerInfo = forwardRef<ContractActions, ContractProps>(
    ({ onContinue, onSave }: ContractProps, ref: any) => {
        // const { userManager } = useAppStore();
        // const navigate = useNavigate();
        const [infoSteps, setInfoSteps] = useState<InfoChild[]>([]);
        const [isLivingInHousehold, setIsLivingInHousehold] = useState<boolean>(false);
        const refRadioTypeCustomer = useRef<RadioAction>(null);
        const refRadioGender = useRef<RadioAction>(null);
        const refRadioPrivateStatus = useRef<RadioAction>(null);
        const [radioTypeCustomer, setTypeCustomer] = useState<string>(TypeCustomerContract[0].value);
        const frontIdRef = useRef<PropsUploadActions>(null);
        const backIdRef = useRef<PropsUploadActions>(null);
        const faceIdRef = useRef<PropsUploadActions>(null);
        const refWarningUpload = useRef<PopupBaseActions>(null);
        const fillData = useCallback((_data: any) => { }, []);

        const [arrayClientInputErrorMsg, setArrayClientInputErrorMsg] = useState<Array<string>>([]);
        const [arrayClientSelectErrorMsg, setArrayClientSelectErrorMsg] = useState<Array<string>>([]);

        const [residentialAddressInputErrorMsg, setResidentialAddressInputErrorMsg] = useState<Array<string>>([]);
        const [residentialAddressSelectErrorMsg, setResidentialAddressSelectErrorMsg] = useState<Array<string>>([]);

        const [addressInputErrorMsg, setAddressInputErrorMsg] = useState<Array<string>>([]);
        const [addressSelectErrorMsg, setAddressSelectErrorMsg] = useState<Array<string>>([]);

        const [jobInputErrorMsg, setJobInputErrorMsg] = useState<Array<string>>([]);
        const [jobSelectErrorMsg, setJobSelectErrorMsg] = useState<Array<string>>([]);

        const [relativeInformationInputErrorMsg, setRelativeInformationInputErrorMsg] = useState<Array<string>>([]);
        const [relativeInformationSelectErrorMsg, setRelativeInformationSelectErrorMsg] = useState<Array<string>>([]);

        const [infoClient, setInfoClient] = useState<loadInfoClient>(sessionManager?.contractInfo?.customer_info?.infoClient || {}); // State thông tin khách hàng
        const [householdAddress, setHouseholdAddress] = useState<LoadHouseholdAddress>(sessionManager?.contractInfo?.customer_info?.residential_address || {}); // State địa chỉ hộ khẩu
        const [addressIn, setAddressIn] = useState<LoadAddressIn>(sessionManager?.contractInfo?.customer_info?.address_in || {}); //State địa chỉ đang ở
        const [jobInformation, setJobInformation] = useState<LoadJob>(sessionManager?.contractInfo?.customer_info?.job_information || {}); //State thông tin việc làm 
        const [infoRelatives, setInfoRelatives] = useState<LoadInforRelative[]>(sessionManager?.contractInfo?.customer_info?.info_relatives || []); //State thông tin người thân 
        const [searchCustomer, setSearchCustomer] = useState<SearchCustomer>({});

        // Thông tin khách hàng
        const clientInputRef = CustomerInformationInput.map(() => useRef<TextAreaActions>(null));
        const clientSelectRef = CustomerInformationSelect.map(() => useRef<PickerAction>(null));

        //------ref Địa chỉ hộ khẩu -------------
        const residentialAddressSelectRef = householdAddressSelect.map(() => useRef<PickerAction>(null));
        const residentialAddressInputRef = householdAddressInput.map(() => useRef<TextAreaActions>(null));

        //ref Địa chỉ đang ở 
        const checkBoxRef = useRef<CheckBoxAction>(null);
        const addressInputRef = currentAddressInput.map(() => useRef<TextAreaActions>(null));
        const addressSelectRef = currentAddressSelect.map(() => useRef<PickerAction>(null));

        // ref thông tin việc làm 
        const jobInputRef = jobInput.map(() => useRef<TextFieldActions>(null));
        const jobSelectRef = jobSelect.map(() => useRef<PickerAction>(null));

        // ref Thông tin người thân 
        const relativeInformationInputRef = relativeInformationInput.map(() => useRef<TextFieldActions>(null));
        const relativeInformationSelectRef = relativeInformationSelect.map(() => useRef<PickerAction>(null));
        // -----------------------
        const identityInputSearchRef = useRef<TextFieldActions>(null);
        const typePageSelectSearchRef = useRef<PickerAction>(null);

        useImperativeHandle(ref, () => ({ validate, fillData }));

        const handleReChoose = useCallback(() => {
            frontIdRef.current?.clearFile?.();
            backIdRef.current?.clearFile?.();
            faceIdRef.current?.clearFile?.();
        }, []);
        // -----------------State---------------------
        const [customerData, setCustomerData] = useState<InfoCustomer>(sessionManager.contractInfo?.customer_info || {});

        useEffect(() => {
            if (sessionManager.contractInfo?.customer_info && sessionManager.stepsInfoContract?.[0].info_child) {
                setCustomerData(sessionManager.contractInfo.customer_info);
                setInfoSteps(sessionManager.stepsInfoContract?.[0].info_child);
            }
        }, []);

        const validate = useCallback(() => {
            clientInputRef.map((item: any, index: number) => {
                const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setErrorMsg?.(errMsgClientInput);
                const newData = arrayClientInputErrorMsg?.splice(index, 1, errMsgClientInput);
                setArrayClientInputErrorMsg(newData);
            });

            clientSelectRef.map((item: any, index: number) => {
                const errMsgClientSelect = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setError?.(errMsgClientSelect);
                const newData = arrayClientSelectErrorMsg?.splice(index, 1, errMsgClientSelect);
                setArrayClientSelectErrorMsg(newData);
            });

            residentialAddressInputRef.map((item: any, index: number) => {
                const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setErrorMsg?.(errMsgClientInput);
                const newData = residentialAddressInputErrorMsg?.splice(index, 1, errMsgClientInput);
                setResidentialAddressInputErrorMsg(newData);
            });
            residentialAddressSelectRef.map((item: any, index: number) => {
                const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setError?.(errMsgClientInput);
                const newData = residentialAddressSelectErrorMsg?.splice(index, 1, errMsgClientInput);
                setResidentialAddressSelectErrorMsg(newData);
            });

            addressInputRef.map((item: any, index: number) => {
                const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setErrorMsg?.(errMsgClientInput);
                const newData = addressInputErrorMsg?.splice(index, 1, errMsgClientInput);
                setAddressInputErrorMsg(newData);
            });
            addressSelectRef.map((item: any, index: number) => {
                const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setError?.(errMsgClientInput);
                const newData = addressSelectErrorMsg?.splice(index, 1, errMsgClientInput);
                setAddressSelectErrorMsg(newData);
            });

            jobInputRef.map((item: any, index: number) => {
                const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setErrorMsg?.(errMsgClientInput);
                const newData = jobInputErrorMsg?.splice(index, 1, errMsgClientInput);
                setJobInputErrorMsg(newData);
            });
            jobSelectRef.map((item: any, index: number) => {
                const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setError?.(errMsgClientInput);
                const newData = jobSelectErrorMsg?.splice(index, 1, errMsgClientInput);
                setJobSelectErrorMsg(newData);
            });
            relativeInformationInputRef.map((item: any, index: number) => {
                if (index < 8) {
                    const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                    item.current?.setErrorMsg?.(errMsgClientInput);
                    const newData = relativeInformationInputErrorMsg?.splice(index, 1, errMsgClientInput);
                    setRelativeInformationInputErrorMsg(newData);
                }
                else if (relativeInformationInputRef[8].current?.getValue?.() && index >= 8) {
                    const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                    item.current?.setErrorMsg?.(errMsgClientInput);
                    const newData = relativeInformationInputErrorMsg?.splice(index, 1, errMsgClientInput);
                    setRelativeInformationInputErrorMsg(newData);
                }
            });
            relativeInformationSelectRef.map((item: any, index: number) => {
                const errMsgClientInput = formValidate.emptyValidate(item.current?.getValue?.());
                item.current?.setError?.(errMsgClientInput);
                const newData = relativeInformationSelectErrorMsg?.splice(index, 1, errMsgClientInput);
                setRelativeInformationSelectErrorMsg(newData);
            });

            const arrayClientInputErrorMsgFilter = arrayClientInputErrorMsg.filter((item: string) => { return item; });
            const arrayClientSelectErrorMsgFilter = arrayClientSelectErrorMsg.filter((item: string) => { return item; });

            const addressSelectErrorMsgFilter = addressSelectErrorMsg.filter((item: string) => { return item; });
            const addressInputErrorMsgFilter = addressInputErrorMsg.filter((item: string) => { return item; });

            const residentialAddressInputErrorMsgFilter = residentialAddressInputErrorMsg.filter((item: string) => { return item; });
            const residentialAddressSelectErrorMsgFilter = residentialAddressSelectErrorMsg.filter((item: string) => { return item; });

            const jobInputErrorMsgFilter = jobInputErrorMsg.filter((item: string) => { return item; });
            const jobSelectErrorMsgFilter = jobSelectErrorMsg.filter((item: string) => { return item; });

            const relativeInformationInputErrorMsgFilter = relativeInformationInputErrorMsg.filter((item: string) => { return item; });
            const relativeInformationSelectErrorMsgFilter = relativeInformationSelectErrorMsg.filter((item: string) => { return item; });

            if (arrayClientInputErrorMsgFilter.length + arrayClientSelectErrorMsgFilter.length + addressSelectErrorMsgFilter.length + addressInputErrorMsgFilter.length + residentialAddressInputErrorMsgFilter.length + residentialAddressSelectErrorMsgFilter.length + jobInputErrorMsgFilter.length + jobSelectErrorMsgFilter.length + relativeInformationInputErrorMsgFilter.length + relativeInformationSelectErrorMsgFilter.length === 0) {
                return true;
            } return false;
        }, [addressInputErrorMsg, addressInputRef, addressSelectErrorMsg, addressSelectRef, arrayClientInputErrorMsg, arrayClientSelectErrorMsg, clientInputRef, clientSelectRef, jobInputErrorMsg, jobInputRef, jobSelectErrorMsg, jobSelectRef, relativeInformationInputErrorMsg, relativeInformationInputRef, relativeInformationSelectErrorMsg, relativeInformationSelectRef, residentialAddressInputErrorMsg, residentialAddressInputRef, residentialAddressSelectErrorMsg, residentialAddressSelectRef]);

        const fillAddress = useCallback(() => {
            setInfoSteps(lastStep => {
                let _value = lastStep.filter(item => item.id === 16.5)[0]?.value as InfoChild[];
                if (lastStep.filter(item => item.id === 21.5).length === 0) {
                    lastStep.push({ id: 21.5, title: Languages.contract.addressIsIn, value: _value });
                }
                return lastStep;
            });
        }, []);

        const onSaveData = useCallback(() => {
            onSave?.();
            if (isLivingInHousehold) fillAddress();
            const refInfoClient = {
                valCusName: clientInputRef[0]?.current?.getValue(),
                dateOfBirth: clientInputRef[1]?.current?.getValue(),
                telephoneNumber: clientInputRef[2]?.current?.getValue(),
                typeofDocument: clientSelectRef[0].current?.getValue?.(),
                numberID: clientInputRef[3]?.current?.getValue(),
                dateRange: clientInputRef[4]?.current?.getValue(),
                issuedBy: clientInputRef[5]?.current?.getValue(),
                numberIdOld: clientInputRef[6]?.current?.getValue(),
                email: clientInputRef[7]?.current?.getValue(),
                customerResources: clientSelectRef[1].current?.getValue?.(),
                gender: refRadioGender.current?.getValue?.(),
                maritalStatus: refRadioPrivateStatus.current?.getValue?.()
            } as loadInfoClient;

            const refHouseholdAddress = {
                city: residentialAddressSelectRef[0].current?.getValue?.(),
                district: residentialAddressSelectRef[1].current?.getValue?.(),
                ward: residentialAddressSelectRef[2].current?.getValue?.(),
                nest: residentialAddressInputRef[0]?.current?.getValue()
            } as LoadHouseholdAddress;

            const refAddressIn = {
                residencyForm: addressSelectRef[0].current?.getValue?.(),
                city: isLivingInHousehold ? residentialAddressSelectRef[0].current?.getValue?.() : addressSelectRef[1].current?.getValue?.(),
                district: isLivingInHousehold ? residentialAddressSelectRef[1].current?.getValue?.() : addressSelectRef[2].current?.getValue?.(),
                ward: isLivingInHousehold ? residentialAddressSelectRef[2].current?.getValue?.() : addressSelectRef[3].current?.getValue?.(),
                nest: isLivingInHousehold ? residentialAddressInputRef[0]?.current?.getValue() : addressInputRef[0]?.current?.getValue(),
                timeLive: addressInputRef[1]?.current?.getValue()
            } as LoadAddressIn;

            const refJobInformation = {
                companyName: jobInputRef[0]?.current?.getValue(),
                companyAddress: jobInputRef[1]?.current?.getValue(),
                companyPhoneNumber: jobInputRef[2]?.current?.getValue(),
                position: jobSelectRef[0].current?.getValue?.(),
                job: jobSelectRef[1].current?.getValue?.(),
                timeWorkCompany: jobInputRef[3]?.current?.getValue(),
                income: jobInputRef[4]?.current?.getValue(),
                formTakeSalary: jobSelectRef[2].current?.getValue?.()
            } as LoadJob;

            const refInfoRelatives = [
                {
                    referencePerson: relativeInformationInputRef[0]?.current?.getValue(),
                    relationship: relativeInformationSelectRef[0].current?.getValue(),
                    relativePhone: relativeInformationInputRef[1]?.current?.getValue(),
                    residentialAddress: relativeInformationInputRef[2]?.current?.getValue(),
                    feedback: relativeInformationInputRef[3]?.current?.getValue()
                },
                {
                    referencePerson: relativeInformationInputRef[4]?.current?.getValue(),
                    relationship: relativeInformationSelectRef[1].current?.getValue(),
                    relativePhone: relativeInformationInputRef[5]?.current?.getValue(),
                    residentialAddress: relativeInformationInputRef[6]?.current?.getValue(),
                    feedback: relativeInformationInputRef[7]?.current?.getValue()
                },
                {
                    referencePerson: relativeInformationInputRef[8]?.current?.getValue(),
                    relationship: relativeInformationInputRef[9]?.current?.getValue(),
                    relativePhone: relativeInformationInputRef[10]?.current?.getValue(),
                    residentialAddress: relativeInformationInputRef[11]?.current?.getValue(),
                    feedback: relativeInformationInputRef[12]?.current?.getValue()
                }
            ] as LoadInforRelative[];

            setCustomerData((last) => {
                last.infoClient = refInfoClient;
                last.residential_address = refHouseholdAddress;
                last.address_in = refAddressIn;
                last.job_information = refJobInformation;
                last.info_relatives = refInfoRelatives;

                return last;
            });
        }, [addressInputRef, addressSelectRef, clientInputRef, clientSelectRef, fillAddress, isLivingInHousehold, jobInputRef, jobSelectRef, onSave, relativeInformationInputRef, relativeInformationSelectRef, residentialAddressInputRef, residentialAddressSelectRef]);

        const renderBoxTitle = useCallback((_icon: any, _label: string) => {
            return (
                <div className={cx('line-title')}>
                    <img src={_icon} alt="" /> <span className={cx('title-item-info')}>{_label}</span>
                </div>
            );
        }, []);

        const handleUploadImage = useCallback(() => { }, []);

        const renderCart = useCallback(
            (refCart: any, title: string, textLabel: string, hasButton?: boolean) => {
                return (
                    <Grid item xs={12} md={4} className={cx('item-card-upload-container')}>
                        <CartUpload
                            ref={refCart} type={'text'} title={title} label={Languages.contract.label} textLabel={textLabel}
                            hasButtonBottom={hasButton} onLeftButton={handleReChoose} onRightButton={handleUploadImage}
                            iconMain={hasButton ? Ic_Portrait : Ic_Card} icRight={Ic_Green_Tick}
                        />
                    </Grid>
                );
            }, [handleReChoose, handleUploadImage]);

        const onNextScreen = useCallback(() => {
            const residentialAddressString = `${residentialAddressInputRef[0]?.current?.getValue()}${','}${'\xa0'}${residentialAddressSelectRef[2].current?.getValue?.()}${','}${'\xa0'}${residentialAddressSelectRef[1].current?.getValue?.()}${','}${'\xa0'}${residentialAddressSelectRef[0].current?.getValue?.()}`;
            const addressString = `${addressSelectRef[0].current?.getValue?.()}${':'}${'\xa0'}${addressInputRef[0]?.current?.getValue()}${','}${'\xa0'}${addressSelectRef[3].current?.getValue?.()}${','}${'\xa0'}${addressSelectRef[2].current?.getValue?.()}${','}${'\xa0'}${addressSelectRef[1].current?.getValue?.()}`;
            const arr = infoSteps.filter((item) => { return item?.id !== 13 && item?.id !== 14; });
            onContinue?.(customerData, KEY_CONTRACT.custom_info, [...arr, { title: Languages.contract.householdAddress, value: residentialAddressString, id: 13 }, { title: Languages.contract.addressIsIn, value: addressString, id: 14 }]);

        }, [addressInputRef, addressSelectRef, customerData, infoSteps, onContinue, residentialAddressInputRef, residentialAddressSelectRef]);

        const renderInput = useCallback((_value: string, _ref: any, _type: any, _placeholder: string, _label: string, _idInput?: number, _maxLength?: number, star?: boolean, _labelRight?: string, key_parent?: string) => {
            const onChangeText = (event: any) => {
                if (!key_parent) {
                    setInfoSteps(last => {
                        if (last.filter(_last => _last?.id === _idInput).length > 0) {
                            if (_type === TYPE_INPUT.DATE) {
                                const [year, month, day] = _ref.current?.getValue?.()?.trim().split('-') || '';
                                last.filter(_last => _last.id === _idInput)[0].value = `${day}/${month}/${year}` || '';
                            } else {
                                last.filter(_last => _last.id === _idInput)[0].value = _ref.current?.getValue?.() || _value;
                            }
                            return last;
                        }
                        return [...last, { title: _label, value: event || _value, id: _idInput }];
                    });
                }
            };

            return (
                <Grid item xs={12} md={4} >
                    <MyTextInput
                        value={_value} ref={_ref} type={_type} placeHolder={_placeholder} label={_label}
                        important={!star} inputStyle={cx('input-style')} onRightCallback={() => { }} labelRight={_labelRight}
                        onChangeText={onChangeText} maxLength={_maxLength}
                    />
                </Grid>
            );
        }, []);

        const renderSelect = useCallback((_value: any, _ref: any, _data: ItemPropsModel[], _title: string, _idSelect: number, star?: boolean, key_parent?: string) => {
            const onSelectItem = (valueSelect: any) => {
                if (!key_parent) {
                    setInfoSteps(last => {
                        if (last.filter(_last => _last?.id === _idSelect).length > 0) {
                            last.filter(_last => _last?.id === _idSelect)[0].value = valueSelect || _value;
                            return last;
                        }
                        return [...last, { title: _title, value: valueSelect ? valueSelect : _value, id: _idSelect }];
                    });
                }

            };
            return (
                <Grid item xs={12} md={4}>
                    <PickerLoanComponent defaultValue={_value ? _value : undefined} ref={_ref} data={_data} title={_title} isImportant={!star} onSelectItem={onSelectItem} />
                </Grid>
            );
        }, []);

        const renderRadioButtonGroup = useCallback((_ref: any, _data: ItemPropsModel[], _title: string, _defaultValue: string, _titleRadioStyle: string, _keyValue: string, _idRadio?: number) => {
            const onChangeText = (e: any) => {
                if (!_keyValue) {
                    setTypeCustomer(e.target?.value);
                } else {
                    setInfoSteps(last => {
                        if (last.filter(_last => _last.id === _idRadio).length > 0) {
                            last.filter(_last => _last.id === _idRadio)[0].value = e.target?.value;
                            return last;
                        }
                        return [...last, { title: _title, value: e.target?.value, id: _idRadio }];
                    });
                }
            };
            return (
                <RadioSelect ref={_ref} hasStar title={_title} data={_data} defaultValue={_defaultValue} titleRadioStyle={cx(_titleRadioStyle)} onChangeText={onChangeText} />
            );
        }, []);

        const renderCheckBoxSelect = useCallback((_ref: any, _data: ItemPropsModel[]) => {
            const onChangeCheckBox = (e: any) => {
                setIsLivingInHousehold(e.target?.checked);
                if (e.target?.checked) {
                    addressSelectRef[1].current?.setValue?.(residentialAddressSelectRef[0].current?.getValue?.() || '');
                    addressSelectRef[2].current?.setValue?.(residentialAddressSelectRef[1].current?.getValue?.() || '');
                    addressSelectRef[3].current?.setValue?.(residentialAddressSelectRef[2].current?.getValue?.() || '');
                    addressInputRef[0].current?.setValue?.(residentialAddressInputRef[0].current?.getValue?.() || '');
                }
            };
            return (
                <CheckBoxSelect ref={_ref} data={_data} onChangeText={onChangeCheckBox} groupInputContainer={cx('group-check-box-container')} />
            );
        }, [addressInputRef, addressSelectRef, residentialAddressInputRef, residentialAddressSelectRef]);

        const renderTextarea = useCallback((_value: string, _ref: any, _label: string, _placeholder: string, _idTextArea: number, star?: boolean) => {
            const onChangeTextArea = (value: string) => {
                setInfoSteps(last => {
                    if (last.filter(_last => _last.id === _idTextArea).length > 0) {
                        last.filter(_last => _last.id === _idTextArea)[0].value = value;
                        return last;
                    }
                    return [...last, { title: _label, value: value, id: _idTextArea }];
                });
            };

            return (
                <Grid item xs={12} md={8}>
                    <MyTextAreaInput value={_value} ref={_ref} label={_label} placeHolder={_placeholder} important={!star} inputStyle={cx('textarea-container')} onChangeText={onChangeTextArea} />
                </Grid>
            );
        }, []);

        const renderButton = useCallback(() => {
            return (
                <Grid item xs={12} md={4} className={cx('style-container-btn')}>
                    <Button
                        label={Languages.contract.searchInfo}
                        buttonStyle={'GREEN'}
                        rightIcon={Ic_Search}
                        containButtonStyles={cx('btn-style')}
                        labelStyles={cx('label-style-btn')}
                        rightIconStyles={cx('icon-style-btn')}
                    />
                </Grid>
            );
        }, []);

        const renderCustomerBaseInfo = useMemo(() => {
            return (
                <div className={cx('customer-information')}>
                    {renderBoxTitle(Ic_people, Languages.contract.CustomerInformation)}
                    <div>
                        <Grid container spacing={2} className={cx('style-form')}>
                            {renderInput(customerData?.infoClient?.valCusName || '', clientInputRef[0], TYPE_INPUT.TEXT, Languages.contract.customerName, Languages.contract.customerName, 1, 30)}
                            {renderInput(customerData?.infoClient?.dateOfBirth || '', clientInputRef[1], TYPE_INPUT.DATE, Languages.contract.dateOfBirth, Languages.contract.dateOfBirth, 2, 8)}
                            {renderInput(customerData?.infoClient?.telephoneNumber || '', clientInputRef[2], TYPE_INPUT.NUMBER, Languages.contract.telephoneNumber, Languages.contract.telephoneNumber, 3, 10, false, Languages.contract.seeRelatedContract)}
                            {renderSelect(customerData?.infoClient?.typeofDocument || '', clientSelectRef[0], PapContract, Languages.contract.typeofDocument, 4)}
                            <Grid item xs={12} md={4}>
                                {renderRadioButtonGroup(refRadioGender, GenderCustomerContract, Languages.contract.sex, infoClient?.gender || '', 'title-radio-gender', 'gender', 5)}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {renderRadioButtonGroup(refRadioPrivateStatus, StatusCustomerContract, Languages.contract.maritalStatus, infoClient?.maritalStatus || '', 'title-radio-gender', 'maritalStatus', 6)}
                            </Grid>
                            {renderInput(customerData?.infoClient?.numberID || '', clientInputRef[3], TYPE_INPUT.NUMBER, Languages.contract.numberID, Languages.contract.numberID, 7, 12, false, Languages.contract.seeRelatedContract)}
                            {renderInput(customerData?.infoClient?.dateRange || '', clientInputRef[4], TYPE_INPUT.DATE, Languages.contract.dateRange, Languages.contract.dateRange, 8, 8)}
                            {renderInput(customerData?.infoClient?.issuedBy || '', clientInputRef[5], TYPE_INPUT.TEXT, Languages.contract.IssuedBy, Languages.contract.IssuedBy, 9, 200)}
                            {renderInput(customerData?.infoClient?.numberIdOld || '', clientInputRef[6], TYPE_INPUT.TEXT, Languages.contract.numberIdOld, Languages.contract.numberIdOld, 10, 12)}
                            {renderInput(customerData?.infoClient?.email || '', clientInputRef[7], TYPE_INPUT.EMAIL, Languages.contract.email, Languages.contract.email, 11, 100)}
                            {renderSelect(customerData?.infoClient?.customerResources || '', clientSelectRef[1], resources, Languages.contract.customerResources, 12)}
                        </Grid>
                    </div>
                </div>
            );
        }, [clientInputRef, clientSelectRef, customerData?.infoClient?.customerResources, customerData?.infoClient?.dateOfBirth, customerData?.infoClient?.dateRange, customerData?.infoClient?.email, customerData?.infoClient?.issuedBy, customerData?.infoClient?.numberID, customerData?.infoClient?.numberIdOld, customerData?.infoClient?.telephoneNumber, customerData?.infoClient?.typeofDocument, customerData?.infoClient?.valCusName, infoClient?.gender, infoClient?.maritalStatus, renderBoxTitle, renderInput, renderRadioButtonGroup, renderSelect]);

        const renderResidentialAddressInfo = useMemo(() => {
            return (
                <div className={cx('household-address')}>
                    {renderBoxTitle(Ic_Address, Languages.contract.householdAddress)}
                    <Grid container spacing={2}>
                        {renderSelect(householdAddress.city || '', residentialAddressSelectRef[0], City, Languages.contract.city, 13, false, 'residential_address')}
                        {renderSelect(householdAddress.district || '', residentialAddressSelectRef[1], District, Languages.contract.district, 14, false, 'residential_address')}
                        {renderSelect(householdAddress.ward || '', residentialAddressSelectRef[2], Ward, Languages.contract.ward, 15, false, 'residential_address')}
                        {renderInput(householdAddress.nest || '', residentialAddressInputRef[0], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.village, 16, 100, false, '', 'residential_address')}
                    </Grid>
                </div>
            );
        }, [householdAddress.city, householdAddress.district, householdAddress.nest, householdAddress.ward, renderBoxTitle, renderInput, renderSelect, residentialAddressInputRef, residentialAddressSelectRef]);

        const renderLivingAddressInfo = useMemo(() => {
            return (
                <div className={cx('address-in')}>
                    <div className={cx('title-container-living')}>
                        {renderBoxTitle(Ic_Location, Languages.contract.addressIsIn)}
                        {renderCheckBoxSelect(checkBoxRef, checkBoxLivingData)}
                    </div>
                    <Grid container spacing={2}>
                        {renderSelect(addressIn.residencyForm || '', addressSelectRef[0], Resident, Languages.contract.residenceForm, 17, false, 'address')}
                        {renderSelect(addressIn.city, addressSelectRef[1], City, Languages.contract.city, 18, false, 'address')}
                        {renderSelect(addressIn.district, addressSelectRef[2], District, Languages.contract.district, 19, false, 'address')}
                        {renderSelect(addressIn.ward || '', addressSelectRef[3], Ward, Languages.contract.ward, 20, false, 'address')}
                        {renderInput(addressIn?.nest || '', addressInputRef[0], TYPE_INPUT.TEXT, Languages.contract.village, Languages.contract.village, 21, 100, false, '', 'address')}
                        {renderInput(addressIn.timeLive || '', addressInputRef[1], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.timeLive, 22, 30)}
                    </Grid>
                </div>
            );
        }, [addressIn.city, addressIn.district, addressIn?.nest, addressIn.residencyForm, addressIn.timeLive, addressIn.ward, addressInputRef, addressSelectRef, renderBoxTitle, renderCheckBoxSelect, renderInput, renderSelect]);

        const renderJobInfo = useMemo(() => {
            return (
                <div className={cx('job-information')}>
                    {renderBoxTitle(Ic_Job, Languages.contract.jobInformation)}
                    <Grid container spacing={2}>
                        {renderInput(jobInformation.companyName || '', jobInputRef[0], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.nameCompany, 23, 100)}
                        {renderInput(jobInformation.companyAddress || '', jobInputRef[1], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.companyAddress, 24, 150)}
                        {renderInput(jobInformation.companyPhoneNumber || '', jobInputRef[2], TYPE_INPUT.NUMBER, Languages.contract.import, Languages.contract.companyPhoneNumber, 25, 10)}
                        {renderSelect(jobInformation.position || '', jobSelectRef[0], Location, Languages.contract.position, 26)}
                        {renderSelect(jobInformation.job || '', jobSelectRef[1], job, Languages.contract.job, 27)}
                        {renderInput(jobInformation.timeWorkCompany || '', jobInputRef[3], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.workingTime, 28, 20)}
                        {renderInput(jobInformation.income || '', jobInputRef[4], TYPE_INPUT.NUMBER, Languages.contract.import, Languages.contract.income, 29, 10)}
                        {renderSelect(jobInformation.formTakeSalary || '', jobSelectRef[2], fromTakeWage, Languages.contract.fromTakeWage, 30)}
                    </Grid>
                </div>
            );
        }, [jobInformation.companyAddress, jobInformation.companyName, jobInformation.companyPhoneNumber, jobInformation.formTakeSalary, jobInformation.income, jobInformation.job, jobInformation.position, jobInformation.timeWorkCompany, jobInputRef, jobSelectRef, renderBoxTitle, renderInput, renderSelect]);

        const renderPersonRelativeInfo = useMemo(() => {
            return (
                <div className={cx('relative-information')}>
                    {renderBoxTitle(Ic_Relative, Languages.contract.relativeInformation)}
                    <Grid container spacing={2}>
                        {/* ----------------------------------------- person 1*/}
                        {renderInput(infoRelatives[0]?.referencePerson || '', relativeInformationInputRef[0], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.referencePerson1, 31, 30)}
                        {renderSelect(infoRelatives[0]?.relationship || '', relativeInformationSelectRef[0], relationship, Languages.contract.chooseRelationship, 32)}
                        {renderInput(infoRelatives[0]?.relativePhone || '', relativeInformationInputRef[1], TYPE_INPUT.NUMBER, Languages.contract.importTelephoneNumber, Languages.contract.telephoneNumber, 33, 10, false, Languages.contract.seeRelatedContract)}
                        {renderInput(infoRelatives[0]?.residentialAddress || '', relativeInformationInputRef[2], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.residentialAddress, 34, 100)}
                        {renderTextarea(infoRelatives[0]?.feedback || '', relativeInformationInputRef[3], Languages.contract.feedback, Languages.contract.import, 35)}
                        {/* ----------------------------------------- person 2*/}
                        {renderInput(infoRelatives[1]?.referencePerson || '', relativeInformationInputRef[4], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.referencePerson2, 36, 30)}
                        {renderSelect(infoRelatives[1]?.relationship || '', relativeInformationSelectRef[1], relationship, Languages.contract.chooseRelationship, 37)}
                        {renderInput(infoRelatives[1]?.relativePhone || '', relativeInformationInputRef[5], TYPE_INPUT.NUMBER, Languages.contract.importTelephoneNumber, Languages.contract.telephoneNumber, 38, 10, false, Languages.contract.seeRelatedContract)}
                        {renderInput(infoRelatives[1]?.residentialAddress || '', relativeInformationInputRef[6], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.residentialAddress, 39, 100)}
                        {renderTextarea(infoRelatives[1]?.feedback || '', relativeInformationInputRef[7], Languages.contract.feedback, Languages.contract.import, 40)}
                        {/* ----------------------------------------- person 3*/}
                        {renderInput(infoRelatives[2]?.referencePerson || '', relativeInformationInputRef[8], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.referencePerson3, 41, 30, true)}
                        {renderInput(infoRelatives[2]?.relationship || '', relativeInformationInputRef[9], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.referencePurposes, 42, 100, true)}
                        {renderInput(infoRelatives[2]?.relativePhone || '', relativeInformationInputRef[10], TYPE_INPUT.NUMBER, Languages.contract.importTelephoneNumber, Languages.contract.telephoneNumber, 43, 10, true)}
                        {renderInput(infoRelatives[2]?.residentialAddress || '', relativeInformationInputRef[11], TYPE_INPUT.TEXT, Languages.contract.import, Languages.contract.residentialAddress, 44, 100, true)}
                        {renderTextarea(infoRelatives[2]?.feedback || '', relativeInformationInputRef[12], Languages.contract.feedback, Languages.contract.import, 45, true)}
                    </Grid>
                </div>
            );
        }, [infoRelatives, relativeInformationInputRef, relativeInformationSelectRef, renderBoxTitle, renderInput, renderSelect, renderTextarea]);

        const onClickWarningUpload = useCallback(() => {
            refWarningUpload.current?.showModal?.();
        }, []);

        const renderDialogUpload = useMemo(() => {
            return (
                <DialogManualUpload ref={refWarningUpload} icon={Ic_Warn} hasTwoButton />
            );
        }, []);

        return (
            <div className={cx('wrapper')}>
                <div className={cx('informationTitle')}>
                    <span className={cx('title-container')}>
                        {Languages.contract.CustomerInformation}
                    </span>
                    {renderRadioButtonGroup(refRadioTypeCustomer, TypeCustomerContract, '', TypeCustomerContract[0].value, 'title-radio-customer', '')}
                </div>
                <div >
                    {radioTypeCustomer === TypeCustomerContract[1].value && <div className={cx('oldCustomers')}>
                        <Grid container spacing={2}>
                            {renderSelect(searchCustomer.type_document_search, identityInputSearchRef, PapContract, Languages.contract.typeofDocument, 46, true)}
                            {renderInput(searchCustomer.identity_search || '', typePageSelectSearchRef, TYPE_INPUT.NUMBER, Languages.contract.numberID, Languages.contract.numberID, 47, 12, true)}
                            {renderButton()}
                        </Grid>
                    </div>}
                    {radioTypeCustomer !== TypeCustomerContract[1].value && <>
                        <div className={cx('upload-img')}>
                            <div className={cx('upload-text')}>
                                <span className={cx('cmt')}>{Languages.contract.cmt}</span>
                                <div className={cx('upload-note-img')} onClick={onClickWarningUpload}>
                                    <img src={Ic_Warn} />
                                    <span className={cx('upload-title')}>{Languages.contract.uploadImg}</span>
                                </div>
                            </div>
                            <Grid container spacing={2} className={cx('card-container')}>
                                {renderCart(frontIdRef, Languages.contract.beforeID, Languages.contract.textLabel)}
                                {renderCart(backIdRef, Languages.contract.afterID, Languages.contract.textLabel)}
                                {renderCart(faceIdRef, Languages.contract.portrait, '', true)}
                            </Grid>
                        </div>
                        <div className={cx('container-form')}>
                            {renderCustomerBaseInfo}
                            {renderResidentialAddressInfo}
                            {renderLivingAddressInfo}
                            {renderJobInfo}
                            {renderPersonRelativeInfo}
                        </div>
                    </>}
                    {renderDialogUpload}
                    <ContractFooter onSave={onSaveData} onContinue={onNextScreen} />
                </div>
            </div>
        );
    }
);

export default StepCustomerInfo;
