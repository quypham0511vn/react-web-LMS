import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import IcSelect from 'assets/icon/ic_select.svg';
import classNames from 'classnames/bind';
import { TYPE_INPUT } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerLoanComponent, { PickerAction } from 'components/picker-loan-component/picker-loan-component';
import RadioSelect from 'components/radio-select/radio-select';
import { MyTextAreaInput } from 'components/text-area';
import { TextAreaActions } from 'components/text-area/types';
import { DeductionFree, loanSettlementModel } from 'models/contract-detail.model';
import { ItemPropsModel } from 'models/item-props-model';
import { dataCustomerResource, infoSettlement, loanPayItemInputRef, radioMethod } from 'pages/__mocks__/ContractInfomation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import formValidate from 'utils/form-validate';
import styles from './steps-loan-settlement.module.scss';

const cx = classNames.bind(styles);
const LoanSettlement = () => {
    const loanPayInputRef = loanPayItemInputRef.map(() => useRef<TextFieldActions>(null));
    const loanPayRadioRef = loanPayItemInputRef.map(() => useRef<TextFieldActions>(null));
    const contentRef = useRef<TextAreaActions>(null);
    const customerResourcesRef = useRef<PickerAction>(null);
    const [data, setData] = useState<loanSettlementModel>({});
    const [toggle, setToggle] = useState<boolean>(false);

    useEffect(() => {
        setData(last => {
            Object.keys(infoSettlement).map((key) => {
                last[key] = infoSettlement[key];
            });
            setToggle(!toggle);
            return last;
        });
    }, []);

    const renderInput = useCallback(
        (_ref: any, _value: string, _type: any, _label: string, _input: string, isNotRequired?: boolean, isColor?: boolean) => {
            return (
                <Grid item xs={12} md={12} className={cx('container-item')} style={{ marginTop: '10px' }}>
                    <label className={cx('label-input')}>
                        {_label}
                        {isNotRequired && <span className={cx('star')}> *</span>}
                    </label>
                    <MyTextInput
                        ref={_ref}
                        type={_type}
                        inputStyle={isColor ? cx('input-style', 'color-red') : cx('input-style')}
                        containerInput={cx('container-input')}
                        placeHolder={_input}
                        value={_value}
                        disabled={!isNotRequired}
                    />
                </Grid>
            );
        }, []);

    const renderRadioButtonGroup = useCallback((_ref: any, _data: any, _title: string, _defaultValue: string, _titleRadioStyle: string, _keyValue: string, _idRadio?: number) => {
        const onChangeText = (e: any) => {
            setData(last => {
                const newObj = last;
                if (_keyValue) {
                    newObj[_keyValue] = e.target?.value;
                }
                return newObj;
            });
        };

        return (
            <RadioSelect
                ref={_ref}
                hasStar
                title={_title}
                data={_data}
                defaultValue={_defaultValue}
                titleRadioStyle={cx(_titleRadioStyle)}
                onChangeText={onChangeText}
                groupItemRadioContainer={cx('group-item-radio')}
            />
        );
    }, []);

    const renderTextArea = useCallback((refInput: any, _type: any, _label: string, value: string) => {
        return (
            <Grid item xs={12} md={12} className={cx('container-item')} style={{ marginTop: '10px' }}>
                <label className={cx('label-input')}>
                    {_label}
                </label>
                <MyTextAreaInput
                    ref={refInput}
                    value={value}
                    type={_type}
                    inputStyle={cx('input-container')}
                    placeHolder={Languages.contract.placeholderInfo}
                />
            </Grid>
        );
    }, []);

    const renderSelect = useCallback(
        (refSelect: any, _data: ItemPropsModel[], _value: string, _title: string, key: string) => {
            return (
                <Grid item xs={12} className={cx('container-item')} style={{ marginTop: '10px' }}>
                    <PickerLoanComponent
                        data={_data}
                        title={_title}
                        defaultValue={_value !== '' ? _value : undefined}
                        ref={refSelect}
                        isImportant
                        onSelectItem={(item) => {
                            setData(last => {
                                const newObj = last;
                                if (newObj) {
                                    newObj[key] = item;
                                }
                                return last;
                            });
                        }}
                        titleItemPickerText={cx('label-picker')}
                    />
                </Grid>
            );
        },
        []
    );

    const renderListItem = useCallback((value: DeductionFree | undefined, title: string) => {
        return (
            <Grid item xs={12} md={12} className={cx('container-item')} style={{ marginTop: '10px' }} >
                <span className={cx('label-input')}>
                    {title}
                    <span className={cx('star')}>  *</span>
                </span>
                {value && Object.keys(value).map((key) => {
                    return (
                        <div className={cx('item')} key={key}>
                            <span className={cx('label-item')}>{value[key]}</span>
                        </div>
                    );
                })}
            </Grid>
        );
    }, []);

    const onValidate = useCallback(() => {
        const payerNameErrMsg = formValidate.userNameValidate(loanPayInputRef[0].current?.getValue());
        const nameCustomerErrMsg = formValidate.userNameValidate(loanPayInputRef[15].current?.getValue());
        const relationshipErrMsg = formValidate.emptyValidate(loanPayInputRef[1].current?.getValue());
        const realityDateErrMsg = formValidate.passConFirmPhone(loanPayInputRef[2].current?.getValue());
        const datePaymentErrMsg = formValidate.emptyValidate(loanPayInputRef[4].current?.getValue());
        const customerResourcesErrMsg = formValidate.emptyValidate(customerResourcesRef.current?.getValue() || '');
        loanPayInputRef[0].current?.setErrorMsg(payerNameErrMsg);
        loanPayInputRef[15].current?.setErrorMsg(nameCustomerErrMsg);
        loanPayInputRef[1].current?.setErrorMsg(relationshipErrMsg);
        loanPayInputRef[2].current?.setErrorMsg(realityDateErrMsg);
        loanPayInputRef[4].current?.setErrorMsg(datePaymentErrMsg);
        customerResourcesRef.current?.setError?.(customerResourcesErrMsg);

        if (`${payerNameErrMsg}${relationshipErrMsg}${realityDateErrMsg}${datePaymentErrMsg}${customerResourcesErrMsg}${nameCustomerErrMsg}`.length === 0) return true;
        return false;
    }, [loanPayInputRef]);

    const onConfirmPay = useCallback(() => {
        if (onValidate()) {
            setData(last => {
                last.payer_name = loanPayInputRef[0].current?.getValue();
                last.relationship = loanPayInputRef[1].current?.getValue();
                last.payer_phone = loanPayInputRef[2].current?.getValue();
                last.date_payment = loanPayInputRef[4].current?.getValue();
                last.money_paid_by_customer = loanPayInputRef[15].current?.getValue();
                last.content = contentRef.current?.getValue();
                console.log('Last === ', last);
                return last;
            });
        }

    }, [loanPayInputRef, onValidate]);

    const renderViewBody = useMemo(() => {
        return (
            <Box sx={{ flexGrow: 1 }} className={cx('box-container')}>
                <Grid container spacing={2} xs={12}>
                    <Grid item xs={12} md={4}>
                        {renderInput(loanPayInputRef[0], data?.payer_name || '', TYPE_INPUT.TEXT, Languages.contract.payerName, Languages.contract.import, true)}
                        {renderInput(loanPayInputRef[1], data?.relationship || '', TYPE_INPUT.TEXT, Languages.contract.relationshipWithOwner, Languages.contract.import, true)}
                        {renderInput(loanPayInputRef[2], data?.payer_phone || '', TYPE_INPUT.TEXT, Languages.contract.payerPhone, Languages.contract.import, true)}
                        {renderInput(loanPayInputRef[3], data?.reality_date || '', TYPE_INPUT.TEXT, Languages.contract.realityDate, Languages.contract.import, false)}
                        {renderInput(loanPayInputRef[4], data?.date_payment || '', TYPE_INPUT.DATE, Languages.contract.datePayment, Languages.contract.import, true)}
                        {renderInput(loanPayInputRef[5], data?.number_days_difference || '', TYPE_INPUT.TEXT, Languages.contract.numberDaysDifference, Languages.contract.import, false)}
                        {renderListItem(data?.deduction_fee || { value_one: '0', value_two: '0', value_three: '0' }, Languages.contract.deductionFee)}
                        {renderInput(loanPayInputRef[6], data?.total_amount_deduction_fee || '', TYPE_INPUT.TEXT, Languages.contract.totalAmountDeductionFee, Languages.contract.import, false)}
                    </Grid>
                    <Grid item xs={12} md={4}>

                        {renderInput(loanPayInputRef[7], data?.actual_settlement_state || '', TYPE_INPUT.TEXT, Languages.contract.actualSettlementSate, Languages.contract.import, false)}
                        {renderInput(loanPayInputRef[8], data?.total_amount_settlement || '', TYPE_INPUT.TEXT, Languages.contract.totalAmountSettlement, Languages.contract.import, false, true)}
                        {renderInput(loanPayInputRef[9], data?.difference || '', TYPE_INPUT.TEXT, Languages.contract.actualDifferenceAndPayout, Languages.contract.import, false)}
                        {renderInput(loanPayInputRef[10], data?.early_settlement_fee || '', TYPE_INPUT.TEXT, Languages.contract.earlySettlementFee, Languages.contract.import, false)}
                        {renderInput(loanPayInputRef[11], data?.forfeit || '', TYPE_INPUT.TEXT, Languages.contract.penaltyForLatePayment, Languages.contract.import, false)}
                        {renderInput(loanPayInputRef[12], data?.overdue_money || '', TYPE_INPUT.TEXT, Languages.contract.overdueMoney, Languages.contract.import, false)}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid item xs={12} md={12} className={cx('container-item')} style={{ marginTop: '10px' }}>
                            {renderRadioButtonGroup(loanPayRadioRef[1], radioMethod, Languages.contract.method, data?.method || radioMethod[0].value, 'title-radio-form', 'method', 5)}
                        </Grid>
                        {renderInput(loanPayInputRef[13], data?.fee || '', TYPE_INPUT.TEXT, Languages.contract.fee, Languages.contract.import, false)}
                        {renderInput(loanPayInputRef[14], data?.valid_money || '', TYPE_INPUT.TEXT, Languages.contract.validMoney, Languages.contract.import, false, true)}
                        {renderInput(loanPayInputRef[14], data?.interest || '', TYPE_INPUT.TEXT, Languages.contract.interest, Languages.contract.import, false)}
                        {renderInput(loanPayInputRef[15], data?.money_paid_by_customer || '', TYPE_INPUT.TEXT, Languages.contract.moneyPaidByCustomer, Languages.contract.import, true)}
                        {renderSelect(customerResourcesRef, dataCustomerResource, data?.customer_resources || '', Languages.contract.customerResources, 'customer_resources')}
                        {renderTextArea(contentRef, TYPE_INPUT.TEXT, Languages.contract.collectedContent, data?.content || '')}
                    </Grid>
                </Grid>
            </Box>
        );
    }, [toggle, renderInput, loanPayInputRef, data?.payer_name, data?.relationship, data?.payer_phone, data?.reality_date, data?.date_payment, data?.number_days_difference, data?.deduction_fee, data?.total_amount_deduction_fee, data?.actual_settlement_state, data?.total_amount_settlement, data?.difference, data?.early_settlement_fee, data?.forfeit, data?.overdue_money, data?.method, data?.fee, data?.valid_money, data?.interest, data?.money_paid_by_customer, data?.customer_resources, data?.content, renderListItem, renderRadioButtonGroup, loanPayRadioRef, renderSelect, renderTextArea]);

    return (
        <div className={cx('container')}>
            <span className={cx('txt-group-table')}>{Languages.contract.paymentPeriod}</span>
            {renderViewBody}
            <div className={cx('view-bottom')}>
                <Button
                    isLowerCase
                    label={Languages.contract.confirmPay}
                    containButtonStyles={cx('container-btn')}
                    labelStyles={cx('label-btn')}
                    rightIcon={IcSelect}
                    rightIconStyles={cx('right-btn')}
                    onPress={onConfirmPay}
                />
            </div>
        </div>
    );
};

export default LoanSettlement;
