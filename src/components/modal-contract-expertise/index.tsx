import { Grid } from '@mui/material';
import Modal from '@mui/material/Modal';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import classNames from 'classnames/bind';
import { TYPE_INPUT } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import PickerLoanComponent, { PickerAction } from 'components/picker-loan-component/picker-loan-component';
import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import { InfoChild } from 'pages/contract';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import formValidate from 'utils/form-validate';
import styles from './modal-contract-expertise.module.scss';

const stylesContainerCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

const _ = require('lodash');

const cx = classNames.bind(styles);

export type DataExpertise = {
    loan_organization_name?: string;
    remaining_balance?: string;
    completed?: string;
    installment_payment?: string;
    out_of_date?: string;
}

type LoanOrganization = {
    id: string;
    name: string;
    value: string;
}

function mockContractAll() {

    let loanOrganization = [] as LoanOrganization[];

    for (let index = 0; index < 50; index++) {
        loanOrganization.push({
            id: `${index}`,
            name: `JACCS${index}`,
            value: `JACCS${index}`
        });
    }

    return loanOrganization;
}

const ModalAddExpertise = forwardRef<PopupBaseActions, PopupBaseProps>(({ description, onSuccessPress }: PopupBaseProps, ref) => {

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<DataExpertise>({});
    const refInputRemainingBalance = useRef<TextFieldActions>(null);
    const refInputCompleted = useRef<TextFieldActions>(null);
    const refInputInstallmentPayment = useRef<TextFieldActions>(null);
    const refInputOutOfDate = useRef<TextFieldActions>(null);
    const [infoStepExpertise, setInfoStepExpertise] = useState<InfoChild[]>([]);
    const [indexSteps, setIndexSteps] = useState<number>(1);
    const loanOrganizationNameRef = useRef<PickerAction>(null);

    const hideModal = () => {
        setVisible(false);
    };

    const showModal = (info_step) => {
        console.log('info_step ===', info_step);
        setIndexSteps(info_step?.length || 0);
        setVisible(true);
        setData({});
    };

    const onValidate = useCallback(() => {

        const errMsgCompleted = formValidate.numberValidate(refInputCompleted.current?.getValue());
        const errMsgInstallmentPayment = formValidate.numberValidate(refInputInstallmentPayment.current?.getValue());
        const errMsgRemainingBalance = formValidate.numberValidate(refInputRemainingBalance.current?.getValue());
        const errMsgInputOutOfDate = formValidate.emptyValidate(refInputOutOfDate.current?.getValue());
        const errMsgPickerName = formValidate.emptyValidate(loanOrganizationNameRef.current?.getValue?.() || '');

        refInputCompleted.current?.setErrorMsg(errMsgCompleted);
        refInputInstallmentPayment.current?.setErrorMsg(errMsgInstallmentPayment);
        refInputOutOfDate.current?.setErrorMsg(errMsgInputOutOfDate);
        loanOrganizationNameRef.current?.setError?.(errMsgPickerName || '');
        refInputRemainingBalance.current?.setErrorMsg(errMsgRemainingBalance);

        if (`${errMsgCompleted}${errMsgInstallmentPayment}${errMsgRemainingBalance}${errMsgInputOutOfDate}${errMsgPickerName}`.length === 0) {
            return true;
        }
        return false;
    }, []);

    const handleOk = useCallback(() => {
        if (onValidate()) {
            setData(last => {
                last.completed = refInputCompleted.current?.getValue();
                last.installment_payment = refInputInstallmentPayment.current?.getValue();
                last.out_of_date = refInputOutOfDate.current?.getValue();
                last.remaining_balance = refInputRemainingBalance.current?.getValue();
                onSuccessPress?.(_.cloneDeep(last), infoStepExpertise);
                
                
                return last;
            });
            setVisible(false);
        }
    }, [infoStepExpertise, onSuccessPress, onValidate]);

    const handleCancel = () => {
        setVisible(false);
    };

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal
    }));

    const renderPicker = useCallback((refSelect: any, _data: LoanOrganization[], _value: string, _title: string, key: string) => {
        const onSelectItem = (item: any) => {
            setData((last) => {
                const newObj = last;
                if (key) {
                    newObj[key] = item;
                }
                return newObj;
            });

            setInfoStepExpertise(last => {
                if (item) {
                    if (last.filter(_last => _last.id === indexSteps + 1).length > 0) {
                        last.filter(_last => _last.id === indexSteps + 1)[0].value = item;
                        return last;
                    }
                    return [...last, { title: Languages.contract.tableExpertise.loanOrganizationName, value: item, id: indexSteps + 1 }];
                }
                return last;
            });
        };
        return (
            <Grid item xs={12} md={12}>
                <PickerLoanComponent data={_data} title={_title} defaultValue={_value} ref={refSelect} placeholder={Languages.common.input} onSelectItem={onSelectItem} titleItemPickerText={cx('label-picker')} />
            </Grid>
        );
    }, [indexSteps]);

    const renderInput = useCallback((label: string, refInput: any, type: any, placeholder: string, value: string, max_length: number, id_input: number) => {
        const onChangeText = (_value) => {
            setInfoStepExpertise(last => {
                if (last.filter(_last => _last.id === id_input).length > 0) {
                    last.filter(_last => _last.id === id_input)[0].value = _value;
                    return last;
                }
                return [...last, { title: label, value: _value, id: id_input }];
            });
        };

        return (
            <Grid item xs={12} md={12}>
                <span className={cx('label-styles')}>{label}</span>
                <MyTextInput ref={refInput} type={type} inputStyle={cx('input')} containerInput={cx('input-container')} value={value} maxLength={max_length}
                    placeHolder={placeholder || Languages.common.input} onChangeText={onChangeText}
                />
            </Grid>
        );
    }, []);

    return (
        <Modal
            open={visible}
            onClose={handleCancel}
            sx={stylesContainerCenter}
        >
            <div className={cx('container')}>
                <span className={cx('description')}>{description}</span>
                <Grid container spacing={1} className={cx('wrap-content')}>
                    {renderPicker(loanOrganizationNameRef, mockContractAll(), data?.loan_organization_name || '', Languages.contract.tableExpertise.loanOrganizationName, 'loan_organization_name')}
                    {renderInput(Languages.contract.tableExpertise.remainingBalance, refInputRemainingBalance, TYPE_INPUT.TEXT, '', data?.remaining_balance || '', 50, indexSteps + 2)}
                    {renderInput(Languages.contract.tableExpertise.completed, refInputCompleted, TYPE_INPUT.NUMBER, '', data?.completed || '', 50, indexSteps + 3)}
                    {renderInput(Languages.contract.tableExpertise.installmentPayment, refInputInstallmentPayment, TYPE_INPUT.NUMBER, Languages.contract.tableExpertise.placeholderInstallmentPayment, data?.installment_payment || '', 50, indexSteps + 4)}
                    {renderInput(Languages.contract.tableExpertise.outOfDate, refInputOutOfDate, TYPE_INPUT.TEXT, '', data?.out_of_date || '', 50, indexSteps + 5)}
                </Grid>
                <div className={cx('view-bottom')}>
                    <Button
                        label={Languages.common.add}
                        isLowerCase
                        containButtonStyles={cx('button-continue')}
                        labelStyles={cx('label-continue')}
                        onPress={handleOk}
                    />
                    <Button
                        label={Languages.common.cancel}
                        isLowerCase
                        containButtonStyles={cx('button-cancel')}
                        labelStyles={cx('label-cancel')}
                        onPress={handleCancel}
                    />
                </div>
            </div>
        </Modal>
    );
});

export default ModalAddExpertise;
