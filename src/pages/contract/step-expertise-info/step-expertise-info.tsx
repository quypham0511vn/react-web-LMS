import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import ContractFooter from 'components/contract-footer/contract-footer';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Grid from '@mui/material/Grid';
import IcUsd from 'assets/icon/ic_usd.svg';
import styles from './step-expertise-info.module.scss';
import IcClose from 'assets/icon/ic_close.svg';
import { TYPE_INPUT } from 'commons/constants';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CreditRelationship, Exception, ExceptionChild, ExpertiseModel } from 'models/contract-expertise-model';
import { Button } from 'components/button';
import IcAddPermissions from 'assets/icon/ic_add_permissions.svg';
import { PopupBaseActions } from 'models/modal-model';
import ModalAddExpertise from 'components/modal-contract-expertise';
import { PAGE_SIZE } from 'commons/configs';
import { MyTextAreaInput } from 'components/text-area';
import { TextAreaActions } from 'components/text-area/types';
import ModalChooseException from 'components/modal-choose-exception';
import { ContractActions, ContractProps } from '../types';
import formValidate from 'utils/form-validate';
import { InfoChild, KEY_CONTRACT } from '..';
import sessionManager from 'managers/session-manager';

const cx = classNames.bind(styles);

const title_table = [
    Languages.contract.tableExpertise.loanOrganizationName,
    Languages.contract.tableExpertise.remainingBalance,
    Languages.contract.tableExpertise.completed,
    Languages.contract.tableExpertise.installmentPayment,
    Languages.contract.tableExpertise.outOfDate,
    ''
];

const StepExpertiseInfo = forwardRef<ContractActions, ContractProps>((
    {
        onBack,
        onContinue
    }: ContractProps, ref: any
) => {
    const pages = 1;
    const [data, setData] = useState<ExpertiseModel>({});
    const refModalAddRelative = useRef<PopupBaseActions>(null);
    const [toggle, setToggle] = useState<boolean>(false);
    const refInputFileAppraisal = useRef<TextAreaActions>(null);
    const refInputFieldAppraisal = useRef<TextAreaActions>(null);
    const refModalAddException = useRef<PopupBaseActions>(null);
    const [infoStepExpertise, setInfoStepExpertise] = useState<InfoChild[]>([]);

    useEffect(() => {
        if (sessionManager.contractInfo?.expertise_info) {
            setData(sessionManager.contractInfo?.expertise_info);
            setInfoStepExpertise(sessionManager.stepsInfoContract?.[3]?.info_child || []);
        }
    }, []);

    const onSaveData = useCallback(() => {
    }, []);

    const onBackScreen = useCallback(() => {
        onBack?.();
    }, [onBack]);

    const onNextScreen = useCallback(() => {
        let exception = [] as InfoChild[];
        const info = [
            { title: Languages.contract.fileAppraisal, value: refInputFileAppraisal.current?.getValue(), id: 1 },
            { title: Languages.contract.fieldAppraisal, value: refInputFieldAppraisal.current?.getValue(), id: 2 }
        ];

        data.exception?.filter(item => item.child.filter(item_child => item_child.is_select === true).length > 0)
            .map((_item, index) => {
                const _exception = _item.child.filter(_item_child => _item_child.is_select === true).map((_i) => { return _i?.name; }).join(`${','}${'\xa0'}`);
                exception.push({ title: _item.name, value: _exception, id: index + 3 });
            });
        if (exception.length > 0 || infoStepExpertise.length > 0) {
            info.push({ title: Languages.contract.creditRelationshipInformation, value: infoStepExpertise, id: 3 });
            info.push({ title: Languages.contract.exception, value: exception, id: 4 });
        }
        setData(last => {
            last.file_appraisal = refInputFileAppraisal.current?.getValue();
            last.field_appraisal = refInputFieldAppraisal.current?.getValue();
            last.name = Languages.contract.steps.appraisalInformation;
            onContinue?.(last, KEY_CONTRACT.expertise_info, info);
            return last;
        });

    }, [data.exception, infoStepExpertise, onContinue]);

    const fillData = useCallback((_data: ExpertiseModel) => {
        setData(_data);
    }, []);

    const validate = useCallback(() => {
        const errMsgFileAppraisal = formValidate.emptyValidate(refInputFileAppraisal.current?.getValue());
        const errMsgFieldAppraisal = formValidate.emptyValidate(refInputFieldAppraisal.current?.getValue());
        refInputFileAppraisal.current?.setErrorMsg(errMsgFileAppraisal);
        refInputFieldAppraisal.current?.setErrorMsg(errMsgFieldAppraisal);
        if (`${errMsgFileAppraisal}${errMsgFieldAppraisal}`.length === 0) {
            return true;
        }
        return false;
    }, []);

    useImperativeHandle(ref, () => ({
        validate,
        fillData
    }));

    const renderInput = useCallback((refInput: any, _type: any, _label: string, value: string, id_input: number, isNotRequired?: boolean) => {
        return (
            <Grid item xs={12} md={6}>
                <label className={cx('label-input')}>
                    {_label}{!isNotRequired && <span className={cx('star')}> *</span>}
                </label>
                <MyTextAreaInput
                    ref={refInput}
                    value={value}
                    type={_type}
                    inputStyle={cx('input-container')}
                    containerInput={cx('input-wrap')}
                    placeHolder={Languages.contract.placeholderInfo}
                />
            </Grid>
        );
    }, []);

    const onModalRelative = useCallback(() => {
        refModalAddRelative.current?.showModal(infoStepExpertise);
    }, [infoStepExpertise]);

    const onModalAddException = useCallback(() => {
        refModalAddException.current?.showModal(data.exception);
    }, [data.exception]);

    const onAddRelative = useCallback((_data: CreditRelationship, info_steps: InfoChild[]) => {

        setData(last => {
            if (last.credit_relationship_info) {
                last.credit_relationship_info = [...last.credit_relationship_info, _data];
            } else {
                last.credit_relationship_info = [_data];
            }
            return last;
        });

        setInfoStepExpertise(info_steps);

        setToggle(last => !last);
    }, []);

    const onChooseException = useCallback((_data: Exception[]) => {
        setData(last => {
            last.exception = _data;
            return last;
        });
        setToggle(last => !last);
    }, []);

    const onDeleteRowTable = useCallback((index: number) => {
        const _credit_relationship = [] as CreditRelationship[];
        if (data.credit_relationship_info) {
            for (let i = 0; i < data.credit_relationship_info?.length; i++) {
                if (index !== i) {
                    _credit_relationship.push(data.credit_relationship_info[i]);
                }
            }
        }
        setData(last => {
            last.credit_relationship_info = _credit_relationship;
            return last;
        });
        setToggle(!toggle);
    }, [data.credit_relationship_info, toggle]);

    const renderTable = useMemo(() => {

        return (
            <Grid item xs={12} md={6}>
                <span className={cx('label-exception')}>{Languages.contract.creditRelationshipInformation}</span>
                {data?.credit_relationship_info && data?.credit_relationship_info.length > 0 &&
                    <TableContainer component={Paper} className={cx('table-container')} >
                        <Table className={cx('table')}>
                            <TableHead className={cx('table-head')}>
                                <TableRow className={cx('table-row')}>
                                    {title_table.map((label, index) => {
                                        return (
                                            <TableCell align="center" className={cx('txt-tableCell')} key={index}>{label}</TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody className={cx('table-body')}>
                                {data?.credit_relationship_info.slice((pages - 1) * PAGE_SIZE, (pages - 1) * PAGE_SIZE + PAGE_SIZE)
                                    .map((row: CreditRelationship, index: number) => {
                                        const handleDelete = () => {
                                            onDeleteRowTable(index);
                                        };
                                        return (
                                            <TableRow key={index} className={index % 2 === 0 ? cx('table-body-row-white') : cx('table-body-row-gray')}>
                                                <TableCell align='left' className={cx('text-table')}>{row?.loan_organization_name}</TableCell>
                                                <TableCell align="center" className={cx('text-table')}>{row?.remaining_balance}</TableCell>
                                                <TableCell align="center" className={cx('text-table')}>{row?.completed}</TableCell>
                                                <TableCell align="center" className={cx('text-table')}>{row?.installment_payment}</TableCell>
                                                <TableCell align="center" className={cx('text-table')}>{row?.out_of_date}</TableCell>
                                                <TableCell align="center" className={cx('text-table')}>
                                                    <img src={IcClose} className={cx('img-table')} onClick={handleDelete} />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
                <Button
                    label={Languages.contract.add}
                    isLowerCase
                    containButtonStyles={cx('container-btn-add-relative')}
                    labelStyles={cx('label-btn-add')}
                    rightIcon={IcAddPermissions}
                    onPress={onModalRelative}
                />
            </Grid>
        );
    }, [data?.credit_relationship_info, onDeleteRowTable, onModalRelative]);

    const onDeleteExceptionGroup = useCallback((_exception: Exception) => {
        setData(last => {
            if (last?.exception) {
                for (let i = 0; i < last.exception.length; i++) {
                    if (last?.exception[i].id === _exception.id) {
                        for (let j = 0; j < last.exception[i].child.length; j++) {
                            last.exception[i].child[j].is_select = false;
                        }
                    }
                }
            }
            return last;
        });
        setToggle(!toggle);
    }, [toggle]);

    const onDeleteExceptionChild = useCallback((_exception: Exception, _exceptionChild: ExceptionChild) => {
        setData(last => {
            if (last?.exception) {
                for (let i = 0; i < last.exception.length; i++) {
                    if (last?.exception[i].id === _exception.id) {
                        if (last.exception[i].child.filter(_item => _item.is_select === true).length === 0) onDeleteExceptionGroup(_exception);
                        else {
                            for (let j = 0; j < last.exception[i].child.length; j++) {
                                if (last.exception[i].child[j].id === _exceptionChild.id && last.exception[i].child[j].is_select) {
                                    const currentState = last.exception[i].child[j].is_select;
                                    last.exception[i].child[j].is_select = !currentState;
                                }
                            }
                        }
                    }
                }
            }
            return last;
        });
        setToggle(!toggle);
    }, [onDeleteExceptionGroup, toggle]);

    const renderException = useMemo(() => {
        return (
            <Grid item xs={12} md={6}>
                <span className={cx('label-exception')}>{Languages.contract.exception}</span>
                {data.exception && data.exception.filter(item => item.child.filter(item_child => item_child.is_select === true).length > 0).map((_exception: Exception, index: number) => {
                    const handleDeleteGroupException = () => {
                        onDeleteExceptionGroup(_exception);
                    };

                    return (
                        <div key={index} className={cx('exception-group')}>
                            <div className={cx('exception-container')} >
                                <div className={cx('exception-child-top')}>
                                    <span className={cx('title-exception')}>{_exception.name}</span>
                                    <img src={IcAddPermissions} className={cx('img-add')} onClick={onModalAddException} />
                                </div>
                                {_exception.child.filter(item => item.is_select === true).map((_exceptionChild: ExceptionChild, indexChild: number) => {
                                    const handleDeleteExceptionChild = () => {
                                        onDeleteExceptionChild(_exception, _exceptionChild);
                                    };

                                    return (
                                        <div key={indexChild} className={cx('exception-child-bottom')}>
                                            <span className={cx('title-exception')}>{_exceptionChild.name}</span>
                                            <img
                                                src={IcClose}
                                                className={cx('img-exception-close')}
                                                onClick={handleDeleteExceptionChild}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <img
                                src={IcClose}
                                className={cx('ic-close-group')}
                                onClick={handleDeleteGroupException}
                            />
                        </div>
                    );
                })
                }
                <Button
                    label={Languages.contract.add}
                    isLowerCase
                    containButtonStyles={cx('container-btn-add-relative')}
                    labelStyles={cx('label-btn-add')}
                    rightIcon={IcAddPermissions}
                    onPress={onModalAddException}
                />
            </Grid>
        );
    }, [data.exception, onDeleteExceptionChild, onDeleteExceptionGroup, onModalAddException]);

    return (
        <div className={cx('main-container')}>
            <div className={cx('title')}>
                <span>{Languages.contract.steps.appraisalInformation}</span>
            </div>
            <div className={cx('label')}>
                <img src={IcUsd} />
                {Languages.contract.steps.appraisalInformation}
            </div>
            <Grid container spacing={2} className={cx('content-item-insurance-picker-container')}>
                <Grid container item spacing={2}>
                    {renderInput(refInputFileAppraisal, TYPE_INPUT.TEXT, Languages.contract.fileAppraisal, data?.field_appraisal || '', 1)}
                    {renderInput(refInputFieldAppraisal, TYPE_INPUT.TEXT, Languages.contract.fieldAppraisal, data?.field_appraisal || '', 2)}
                </Grid>
                <Grid container item spacing={2}>
                    {renderTable}
                    {renderException}
                </Grid>
            </Grid>
            <ContractFooter onSave={onSaveData} onContinue={onNextScreen} onBack={onBackScreen} isFinishStep />
            <ModalAddExpertise ref={refModalAddRelative} description={Languages.contract.addCreditRelationshipInformation} onSuccessPress={onAddRelative} />
            <ModalChooseException ref={refModalAddException} description={Languages.contract.addException} onSuccessPress={onChooseException} />
        </div>
    );
});

export default StepExpertiseInfo;
