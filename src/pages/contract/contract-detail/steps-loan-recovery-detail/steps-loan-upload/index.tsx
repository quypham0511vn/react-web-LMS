import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import IcContinue from 'assets/icon/ic_continue.svg';
import classNames from 'classnames/bind';
import { TYPE_INPUT, TYPE_TOAST } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import RadioSelect, { RadioAction } from 'components/radio-select/radio-select';
import { MyTextAreaInput } from 'components/text-area';
import { TextAreaActions } from 'components/text-area/types';
import { DataToast, Toast, ToastActions } from 'components/toast';
import UploadImage from 'components/upload';
import { loanUploadModel } from 'models/contract-detail.model';
import { radioApplicationExemption, radioForm, radioMethod } from 'pages/__mocks__/ContractInfomation';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import formValidate from 'utils/form-validate';
import styles from './steps-loan-upload.module.scss';

const cx = classNames.bind(styles);

const LoanUpload = () => {
    const moneyRequestedReducedRef = useRef<TextFieldActions>(null);
    const suggestedDateRef = useRef<TextFieldActions>(null);
    const dateOfApplicationSigningRef = useRef<TextFieldActions>(null);
    const noteRef = useRef<TextAreaActions>(null);
    const [data, setData] = useState<loanUploadModel>({});
    const exemptionTypeRef = useRef<RadioAction>(null);
    const confirmEmailRef = useRef<RadioAction>(null);
    const applicationExemptionRef = useRef<RadioAction>(null);
    const [toggle, setToggle] = useState<boolean>(false);
    const refToast = useRef<ToastActions>(null);
    const code = 'HĐCC/ĐKXM/HCM662LVK/2109/01';

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

    const renderRadioButtonGroup = useCallback((_ref: any, _data: any, _title: string, _defaultValue: string, _titleRadioStyle: string, _keyValue: string) => {
        const onChangeText = (e: any) => {
            setData(last => {
                const newObj = last;
                if (_keyValue) {
                    newObj[_keyValue] = e.target?.value;
                }
                setToggle(lasts => !lasts);
                console.log('last ===', _keyValue);
                return newObj;
            });
        };

        return (
            <RadioSelect ref={_ref} hasStar title={_title} data={_data} defaultValue={_defaultValue} titleRadioStyle={cx(_titleRadioStyle)} onChangeText={onChangeText} groupItemRadioContainer={cx('group-item-radio')} />
        );
    }, []);

    const saveUploadImage = useCallback((arrFile: string[]) => {
        setData(last => {
            last.image = arrFile;
            return last;
        });
    }, []);

    const renderUploadImage = useCallback(() => {
        return (
            <Grid item xs={12} md={12} className={cx('container-item')} style={{ marginTop: '10px' }}>
                <span className={cx('label-input')}>
                    {Languages.contract.uploadImage}
                    <span className={cx('star')}>  *</span>
                </span>
                <Grid item xs={12} md={12}>
                    <UploadImage saveDataImage={saveUploadImage} />
                </Grid>
            </Grid>
        );
    }, [saveUploadImage]);

    const onValidate = useCallback(() => {
        const moneyRequestedReducedErrMsg = formValidate.numberValidate(moneyRequestedReducedRef.current?.getValue());
        const suggestedDateErrMsg = formValidate.emptyValidate(suggestedDateRef.current?.getValue());
        const dateOfApplicationSigningErrMsg = formValidate.emptyValidate(dateOfApplicationSigningRef.current?.getValue());

        moneyRequestedReducedRef.current?.setErrorMsg(moneyRequestedReducedErrMsg);
        suggestedDateRef.current?.setErrorMsg(suggestedDateErrMsg);
        dateOfApplicationSigningRef.current?.setErrorMsg(dateOfApplicationSigningErrMsg);
        if (data.image?.length === 0) {
            const dataToast = { title: TYPE_TOAST.ERROR, type: TYPE_TOAST.ERROR, describe: Languages.errorMsg.imageRequired } as DataToast;
            refToast.current?.showToast(dataToast);
        }

        if (`${moneyRequestedReducedErrMsg}${suggestedDateErrMsg}${dateOfApplicationSigningErrMsg}`.length === 0) return true;
        return false;
    }, [data.image?.length]);

    const onContinue = useCallback(() => {
        if (onValidate()) {
            setData(last => {
                last.contract_suggest = code;
                last.money_requested_reduced = moneyRequestedReducedRef.current?.getValue();
                last.suggested_date = suggestedDateRef.current?.getValue();
                last.date_of_application_signing = dateOfApplicationSigningRef.current?.getValue();
                last.note = noteRef.current?.getValue();
                console.log('last ===', last);
                return last;
            });
        }
    }, [onValidate]);

    const renderViewBody = useMemo(() => {
        return (
            <Box sx={{ flexGrow: 1 }} className={cx('box-container')}>
                <Grid container spacing={2} xs={12}>
                    <Grid item xs={12} md={4}>
                        <Grid item xs={12} md={12} className={cx('container-item')} style={{ marginTop: '10px' }}>
                            <span className={cx('label-input')}>
                                {Languages.contract.contractSuggest}
                                <span className={cx('star')}>  *</span>
                            </span>

                            <div className={cx('item')}>
                                <span className={cx('label-item')}>{code}</span>
                            </div>
                        </Grid>
                        {renderRadioButtonGroup(exemptionTypeRef, radioMethod, Languages.contract.exemptionType, data?.exemption_type || radioMethod[0].value, 'title-radio-form', 'exemption_type')}
                        {renderRadioButtonGroup(confirmEmailRef, radioForm, Languages.contract.confirmEmailCEO, data?.confirm_email || radioForm[0].value, 'title-radio-form', 'confirm_email')}
                        {renderRadioButtonGroup(applicationExemptionRef, radioApplicationExemption, Languages.contract.applicationExemption, data?.application_exemption || radioApplicationExemption[0].value, 'title-radio-form', 'application_exemption')}
                        {renderInput(moneyRequestedReducedRef, data?.money_requested_reduced || '', TYPE_INPUT.TEXT, Languages.contract.moneyRequestedReduced, Languages.contract.import, true)}
                        {renderInput(suggestedDateRef, data?.suggested_date || '', TYPE_INPUT.DATE, Languages.contract.suggestedDate, Languages.contract.import, true)}
                        <Grid item xs={12} md={12}>
                            <span className={cx('label-input')}>{Languages.contract.noteDate}</span>
                        </Grid>
                        {renderInput(dateOfApplicationSigningRef, data?.date_of_application_signing || '', TYPE_INPUT.DATE, Languages.contract.dateOfApplicationSigning, Languages.contract.import, true)}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid item xs={12} md={12} className={cx('container-item')} style={{ marginTop: '10px' }}>
                            {renderUploadImage()}
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid item xs={12} md={12} className={cx('container-item')} style={{ marginTop: '10px' }}>
                            {renderTextArea(noteRef, TYPE_INPUT.TEXT, Languages.contract.collectedContent, data?.note || '')}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        );
    }, [data?.application_exemption, data?.confirm_email, data?.date_of_application_signing, data?.exemption_type, data?.money_requested_reduced, data?.note, data?.suggested_date, renderInput, renderRadioButtonGroup, renderTextArea, renderUploadImage]);

    return (
        <div className={cx('container')}>
            {renderViewBody}
            <div className={cx('btn-container')}>
                <Button
                    isLowerCase
                    label={Languages.contract.sendForm}
                    containButtonStyles={cx('btn-send')}
                    labelStyles={cx('label-send')}
                    rightIcon={IcContinue}
                    onPress={onContinue}
                />
            </div>
            <Toast ref={refToast} />
        </div>
    );
};

export default LoanUpload;
