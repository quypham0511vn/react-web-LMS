import Grid from '@mui/material/Grid';
import IC_usd from 'assets/icon/ic_usd.svg';
import classNames from 'classnames/bind';
import { TYPE_INPUT } from 'commons/constants';
import Languages from 'commons/languages';
import ContractFooter from 'components/contract-footer/contract-footer';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerLoanComponent, { PickerAction } from 'components/picker-loan-component/picker-loan-component';
import sessionManager from 'managers/session-manager';
import { DisbursementModel } from 'models/contract-disbursement-model';
import { ItemPropsModel } from 'models/item-props-model';
import { dt } from 'pages/__mocks__/TestApiProductUnivest';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import formValidate from 'utils/form-validate';
import { InfoChild, KEY_CONTRACT } from '..';
import { ContractActions, ContractProps } from '../types';
import styles from './step-disbursement-info.module.scss';

const cx = classNames.bind(styles);

enum KEY_DISBURSEMENT {
    FORM = 'form',
    BANK = 'bank',
    TRANSACTION = 'transaction',
    BRANCH = 'branch',
    ACCOUNT_HOLDER = 'account_holder',
    ACCOUNT_NUMBER = 'account_number'
}

const StepDisbursementInfo = forwardRef<ContractActions, ContractProps>(({ onBack, onContinue, onSave }: ContractProps, ref: any) => {
    const [dataSelect, setDataSelect] = useState<ItemPropsModel[]>(dt);
    const [data, setData] = useState<DisbursementModel>(sessionManager.contractInfo?.disbursement_info || {});
    const [infoSteps, setInfoSteps] = useState<InfoChild[]>([]);
    const refBranch = useRef<TextFieldActions>(null);
    const refAccountHolder = useRef<TextFieldActions>(null);
    const refAccountNumber = useRef<TextFieldActions>(null);
    const refBank = useRef<PickerAction>(null);
    const refForm = useRef<PickerAction>(null);
    const refTransaction = useRef<PickerAction>(null);
    const [checkForm, setCheckFrom] = useState<number>(1);

    useEffect(() => {
        if (sessionManager.contractInfo?.disbursement_info) {
            setData(sessionManager.contractInfo?.disbursement_info);
            setInfoSteps(sessionManager.stepsInfoContract?.[2]?.info_child || []);
        }
    }, []);

    const fillData = useCallback((_data: any) => {
    }, []);

    const validate = useCallback(() => {
        const errMsgBranch = formValidate.emptyValidate(refBranch.current?.getValue());
        const errMsgAccountHolder = formValidate.accountHolderValidate(refAccountHolder.current?.getValue(), Languages.errorMsg.userInfoLength, Languages.errorMsg.userNameRegex);
        const errMsgAccountNumber = formValidate.inputNoSpecialCharacters(refAccountNumber.current?.getValue(), Languages.errorMsg.userInfoLength, Languages.errorMsg.specialCharacters);
        const errMsgForm = formValidate.emptyValidate(data.form || '');
        const errMsgBank = formValidate.emptyValidate(data.bank || '');
        const errMsgTransaction = formValidate.emptyValidate(data.transaction || '');
        refBranch.current?.setErrorMsg(errMsgBranch);
        refAccountHolder.current?.setErrorMsg(errMsgAccountHolder);
        refAccountNumber.current?.setErrorMsg(errMsgAccountNumber);
        refForm.current?.setError?.(errMsgForm);
        refBank.current?.setError?.(errMsgBank);
        refTransaction.current?.setError?.(errMsgTransaction);
        if (`${errMsgBranch}${errMsgAccountHolder}${errMsgAccountNumber}${errMsgTransaction}${errMsgForm}${errMsgBank}`.length === 0) return true;
        return false;
    }, [data.bank, data.form, data.transaction]);

    useImperativeHandle(ref, () => ({
        validate,
        fillData
    }));

    const onSaveDisbursement = useCallback(() => {
        setData(last => {
            last.branch = refBranch.current?.getValue();
            last.name_customer = refAccountHolder.current?.getValue();
            last.account_number = refAccountNumber.current?.getValue();
            return last;
        });
        onSave?.();
        console.log('data === ', data);
    }, [data, onSave]);

    const onContinueDisbursement = useCallback(() => {
        setData(last => {
            last.branch = refBranch.current?.getValue();
            last.name_customer = refAccountHolder.current?.getValue();
            last.account_number = refAccountNumber.current?.getValue();
            return last;
        });
        onContinue?.(data, KEY_CONTRACT.disbursement_info, infoSteps);
    }, [data, infoSteps, onContinue]);

    const renderSelect = useCallback((refSelect: any, _data: ItemPropsModel[], _value: string, _title: string, key: string, id_select: number, isCheckFrom?: boolean) => {
        const onSelectItem = (item: any) => {
            setData(last => {
                const newObj = last;
                if (newObj) {
                    newObj[key] = item;
                }
                return last;
            });
            if (isCheckFrom) setCheckFrom(parseInt(item?.key));
            setInfoSteps(last => {
                if (last.filter(_last => _last.id === id_select).length > 0) {
                    last.filter(_last => _last.id === id_select)[0].value = item;
                    return last;
                }
                return [...last, { title: _title, value: item, id: id_select }];
            });
        };
        return (
            <Grid item xs={12} md={4}>
                <PickerLoanComponent
                    data={_data}
                    title={_title}
                    defaultValue={_value}
                    ref={refSelect}
                    isImportant
                    onSelectItem={onSelectItem}
                    titleItemPickerText={cx('label-picker')}
                />
            </Grid>
        );
    }, []);

    const renderInput = useCallback((_ref: any, _value: string, _type: any, _label: string, _input: string, id_input: number, _maxLength: number, isNotRequired?: boolean) => {
        const onChangeText = (text: string) => {
            setInfoSteps(last => {
                if (last.filter(_last => _last.id === id_input).length > 0) {
                    last.filter(_last => _last.id === id_input)[0].value = text;
                    return last;
                }
                return [...last, { title: _label, value: text, id: id_input, status: _label === Languages.contract.accountNumber || _label === Languages.contract.cardNumber }];
            });
        };

        return (
            <Grid item xs={12} md={4}>
                <label className={cx('label-input')}>
                    {_label}
                    {!isNotRequired && <span className={cx('start')}> *</span>}
                </label>
                <MyTextInput
                    ref={_ref}
                    type={_type}
                    inputStyle={cx('input-style')}
                    containerInput={cx('container-input')}
                    placeHolder={_input}
                    value={_value}
                    onChangeText={onChangeText}
                    maxLength={_maxLength}
                />
            </Grid>
        );
    }, []);

    const renderViewBody = useMemo(() => {
        return (
            <Grid container spacing={2}>
                <Grid container item spacing={2}>
                    {renderSelect(refForm, dataSelect, data.form || '', Languages.contract.formality, KEY_DISBURSEMENT.FORM, 1, true)}
                    {renderSelect(refBank, dataSelect, data.bank || '', Languages.contract.bank, KEY_DISBURSEMENT.BANK, 2)}
                    {renderInput(refBranch, data?.branch || '', TYPE_INPUT.TEXT, Languages.contract.branch, Languages.contract.import, 3, 30)}
                </Grid>
                <Grid container item spacing={2}>
                    {renderInput(refAccountHolder, data?.name_customer || '', TYPE_INPUT.TEXT, checkForm === 1 ? Languages.contract.accountHolder : Languages.contract.cardName, Languages.contract.import, 4, 30)}
                    {renderInput(refAccountNumber, data?.account_number || '', TYPE_INPUT.NUMBER, checkForm === 1 ? Languages.contract.accountNumber : Languages.contract.cardNumber, Languages.contract.import, 5, 16)}
                    {renderSelect(refTransaction, dataSelect, data.transaction || '', Languages.contract.transaction, KEY_DISBURSEMENT.TRANSACTION, 6)}
                </Grid>
            </Grid>
        );
    }, [checkForm, data?.account_number, data.bank, data?.branch, data.form, data?.name_customer, data.transaction, dataSelect, renderInput, renderSelect]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <span>{Languages.contract.steps.disbursementInformation}</span>
            </div>
            <div className={cx('xt')}>
                <div className={cx('label')}>
                    <img src={IC_usd} />
                    {Languages.contract.steps.disbursementInformation}
                </div>
            </div>
            {renderViewBody}
            <ContractFooter onBack={onBack} onSave={onSaveDisbursement} onContinue={onContinueDisbursement} />
        </div>
    );
});

export default StepDisbursementInfo;
