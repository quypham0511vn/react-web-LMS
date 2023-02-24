import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './modal-search-contract.module.scss';
import Modal from '@mui/material/Modal';
import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import { Button } from 'components/button';
import Languages from 'commons/languages';
import { agentsMock } from 'pages/__mocks__/Agents';
import { AgentModel } from 'models/agent-model';
import SelectModal, { SelectActions } from 'components/select-modal';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { ActiveStatus, ContractType, LoanForm, PropertyType } from 'pages/__mocks__/ContractInfomation';
import moment from 'moment';
import { TYPE_INPUT } from 'commons/constants';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const stylesContainerCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

export type SearchModel = {
    transaction?: string;
    property_type?: string;
    property_name?: string;
    to_date?: string;
    from_date?: string;
    active_status?: string;
    contract_type?: string;
    loan_form?: string;
}

enum SearchContract {
    transaction = 'transaction',
    property_type = 'property_type',
    property_name = 'property_name',
    time = 'time',
    active_status = 'active_status',
    contract_type = 'contract_type',
    loan_form = 'loan_form'
}

const cx = classNames.bind(styles);

const ModalSearchContract = forwardRef<PopupBaseActions, PopupBaseProps>(({ description, onSuccessPress }: PopupBaseProps, ref) => {

    const [visible, setVisible] = useState(false);
    const [dataTransaction, setDataTransaction] = useState<AgentModel[]>(agentsMock);
    const [search, setSearch] = useState<SearchModel>({});
    const [toggle, setToggle] = useState<boolean>(false);
    const refInputName = useRef<TextFieldActions>(null);
    const refInputFromDate = useRef<TextFieldActions>(null);
    const refInputToDate = useRef<TextFieldActions>(null);

    const transactionRef = useRef<SelectActions>(null);
    const contractTypeRef = useRef<SelectActions>(null);
    const propertyTypeRef = useRef<SelectActions>(null);
    const activeStatusRef = useRef<SelectActions>(null);
    const loanFormRef = useRef<SelectActions>(null);

    const hideModal = () => {
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = useCallback(() => {
        setSearch(last => {
            last.property_name = refInputName.current?.getValue();
            last.from_date = refInputFromDate.current?.getValue();
            last.to_date = refInputToDate.current?.getValue();
            return last;
        });
        onSuccessPress?.(search);
        setVisible(false);
    }, [onSuccessPress, search]);

    const handleCancel = () => {
        setVisible(false);
    };

    const onChoose = useCallback((text: string, key: string) => {
        setSearch((last) => {
            const newObj = last;
            if (key) {
                newObj[key] = text;
            }
            return newObj;
        });
    }, []);

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal
    }));

    const onChangeTextInput = useCallback((value: string, tag?: string) => {

        switch (tag) {
            case Languages.contract.modalSearch.fromDate:
                setSearch(last => {
                    last.from_date = value;
                    return last;
                });
                break;
            case Languages.contract.modalSearch.toDate:
                setSearch(last => {
                    last.to_date = value;
                    return last;
                });
                break;
            default:
                break;
        }
        setToggle(last => !last);
    }, []);

    const renderInput = useCallback((
        label: string,
        refInput: any,
        type: any,
        inputStyle: string,
        inputContainer: string,
        placeholder: string,
        value: string,
        max_length: number,
        max?: any,
        min?: any
    ) => {
        return (
            <div className={cx('container-input')}>
                <span className={cx('label-styles')}>{label}</span>
                <MyTextInput
                    ref={refInput}
                    type={type}
                    inputStyle={inputStyle}
                    containerInput={inputContainer}
                    placeHolder={placeholder}
                    value={value}
                    maxLength={max_length}
                    max={max}
                    min={min}
                    onChangeText={onChangeTextInput}
                />
            </div>
        );
    }, [onChangeTextInput]);

    const renderViewDate = useMemo(() => {
        return (
            <>
                {renderInput(
                    Languages.contract.modalSearch.fromDate,
                    refInputFromDate,
                    TYPE_INPUT.DATE,
                    cx('input-time'),
                    cx('input-container'),
                    Languages.contract.modalSearch.fromDate,
                    search?.from_date ? search?.from_date : '',
                    50,
                    moment().format(search?.to_date ? `${search?.to_date}` : 'YYYY-MM-DD')
                )}
                {renderInput(
                    Languages.contract.modalSearch.toDate,
                    refInputToDate,
                    TYPE_INPUT.DATE,
                    cx('input-time'),
                    cx('input-container'),
                    Languages.contract.modalSearch.toDate,
                    search?.to_date ? search?.to_date : '',
                    50,
                    moment().format('YYYY-MM-DD'),
                    moment().format(search?.from_date ? `${search?.from_date}` : '')
                )}
            </>
        );
    }, [renderInput, search?.from_date, search?.to_date, toggle]);

    return (
        <Modal
            open={visible}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleCancel}
            sx={stylesContainerCenter}
        >
            <div className={cx('container')}>
                <span className={cx('description')}>{description}</span>
                <div className={cx('body')}>
                    <SelectModal
                        title={Languages.contract.modalSearch.transaction}
                        placeholder={Languages.contract.modalSearch.placeholderTransaction}
                        labelStyles={cx('label-styles')}
                        data={dataTransaction}
                        onPress={onChoose}
                        keys={SearchContract.transaction}
                        labelSearch={search?.transaction ? search?.transaction : ''}
                        ref={transactionRef}
                    />
                    <SelectModal
                        title={Languages.contract.modalSearch.propertyType}
                        placeholder={Languages.contract.modalSearch.placeholderPropertyType}
                        labelStyles={cx('label-styles')}
                        data={PropertyType}
                        onPress={onChoose}
                        keys={SearchContract.property_type}
                        labelSearch={search?.property_type ? search?.property_type : ''}
                        ref={propertyTypeRef}
                    />
                    {renderInput(
                        Languages.contract.modalSearch.propertyName,
                        refInputName,
                        TYPE_INPUT.TEXT,
                        cx('input'),
                        cx('input-container'),
                        Languages.contract.modalSearch.placeholderPropertyName,
                        search?.property_name ? search?.property_name : '',
                        50
                    )}
                    <div className={cx('view-input-time')}>
                        {renderViewDate}
                    </div>
                    <SelectModal
                        title={Languages.contract.modalSearch.activeStatus}
                        placeholder={Languages.contract.modalSearch.placeholderActiveStatus}
                        labelStyles={cx('label-styles')}
                        data={ActiveStatus}
                        onPress={onChoose}
                        keys={SearchContract.active_status}
                        labelSearch={search?.active_status ? search?.active_status : ''}
                        ref={activeStatusRef}
                    />

                    <SelectModal
                        title={Languages.contract.modalSearch.contractType}
                        placeholder={Languages.contract.modalSearch.placeholderContractType}
                        labelStyles={cx('label-styles')}
                        data={ContractType}
                        onPress={onChoose}
                        keys={SearchContract.contract_type}
                        labelSearch={search?.contract_type ? search?.contract_type : ''}
                        ref={contractTypeRef}
                    />
                    <SelectModal
                        title={Languages.contract.modalSearch.loanForm}
                        placeholder={Languages.contract.modalSearch.placeholderLoanForm}
                        labelStyles={cx('label-styles')}
                        data={LoanForm}
                        onPress={onChoose}
                        keys={SearchContract.loan_form}
                        labelSearch={search?.loan_form ? search?.loan_form : ''}
                        ref={loanFormRef}
                    />
                </div>
                <div className={cx('view-bottom')}>
                    <Button
                        label={Languages.common.continue}
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

export default ModalSearchContract;
