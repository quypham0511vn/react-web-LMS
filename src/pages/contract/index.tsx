
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import IcArrow from 'assets/icon/ic_arrow_bottom.svg';
import IcSelect from 'assets/icon/ic_select.svg';
import IcSuccessContract from 'assets/icon/ic_success_create_contract.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import DirectoryPath from 'components/directory-path';
import ModalSuccess from 'components/modal-success';
import { ModalSuccessActions } from 'components/modal-success/types';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import sessionManager from 'managers/session-manager';
import { observer } from 'mobx-react';
import { ContractModel } from 'models/contract-model';
import { PopupBaseActions } from 'models/modal-model';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './contract.module.scss';
import StepCustomerInfo from './step-custom-info/step-customer-info';
import StepDisbursementInfo from './step-disbursement-info/step-disbursement-info';
import StepExpertiseInfo from './step-expertise-info/step-expertise-info';
import StepLoanInfo from './step-loan-info/step-loan-info';
import { ContractActions } from './types';

export enum KEY_CONTRACT {
    custom_info = 'customer_info',
    expertise_info = 'expertise_info',
    loan = 'loan',
    disbursement_info = 'disbursement_info'
}

export type InfoSteps = {
    name: string;
    info_child: InfoChild[];
}

export type InfoChild = {
    title: string;
    value: string | InfoChild[];
    id?: number;
    status?: boolean,
    isActive?: boolean
}

const cx = classNames.bind(styles);

const steps = [
    Languages.contract.steps.customerInformation,
    Languages.contract.steps.loanInfo,
    Languages.contract.steps.disbursementInformation,
    Languages.contract.steps.appraisalInformation
];

const Contract = observer(() => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [dataContract, setDataContract] = useState<ContractModel>(sessionManager.contractInfo || {});
    const currentStepRef = useRef<ContractActions>(null);
    const refModalPopupCenter = useRef<PopupBaseActions>(null);
    const refModalSuccess = useRef<ModalSuccessActions>(null);
    const [stepsInfo, setStepsInfo] = useState<InfoSteps[]>([
        { name: Languages.contract.steps.customerInformation, info_child: sessionManager.contractInfo?.[0]?.info_child || [] },
        { name: Languages.contract.steps.loanInfo, info_child: sessionManager.contractInfo?.[1]?.info_child || [] },
        { name: Languages.contract.steps.disbursementInformation, info_child: sessionManager.contractInfo?.[2]?.info_child || [] },
        { name: Languages.contract.steps.appraisalInformation, info_child: sessionManager.contractInfo?.[3]?.info_child || [] }
    ]);

    const [toggle, setToggle] = useState<boolean>(false);

    const [skipped, setSkipped] = useState(new Set<number>());

    useEffect(() => {
        const length = sessionManager.stepsInfoContract?.length;
        if (length && sessionManager.stepsInfoContract && length > 0) {
            setStepsInfo(sessionManager.stepsInfoContract);
        }
    }, []);

    const isStepSkipped = useCallback((step: number) => {
        return skipped.has(step);
    }, [skipped]);

    const onBackScreen = useCallback(() => {
        setActiveStep(activeStep - 1);
    }, [activeStep]);

    const getCurrentStep = () => {
        return currentStepRef.current;
    };

    const setInfoStep = useCallback((infoChild: InfoChild[]) => {
        setStepsInfo(last => {
            if (infoChild) {
                last[activeStep].info_child = infoChild;
            }
            setToggle(!toggle);
            sessionManager.setStepsInfoContract(last);
            return last;
        });

    }, [activeStep, toggle]);

    const fillDataContract = useCallback((_data: any, key: string) => {
        if (_data) {
            setDataContract(
                (last) => {
                    const newObj = last;
                    if (key) {
                        newObj[key] = _data;
                    }
                    sessionManager.setContractInfo(newObj);
                    return newObj;
                }
            );
        }
    }, []);

    const onConfirmContract = useCallback(() => {
        refModalPopupCenter.current?.hideModal();
        setTimeout(() => {
            refModalSuccess.current?.showModal();
        }, 2000);
    }, []);

    const onContinue = useCallback((data: any, key: string, info_step: InfoChild[]) => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        console.log('xxxx=== ', getCurrentStep()?.validate());

        if (getCurrentStep() && getCurrentStep()?.validate()) {
            if (activeStep < 3) {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);
                if (info_step) {
                    info_step?.sort((firstItem, secondItem) => { return Number(firstItem?.id) - Number(secondItem?.id); });
                }
            } else {
                refModalPopupCenter.current?.showModal();
            }
            setInfoStep(info_step);
            fillDataContract(data, key);
        }
    }, [activeStep, fillDataContract, isStepSkipped, setInfoStep, skipped]);

    const renderViewTabs = useMemo(() => {
        return (
            <div className={cx('box-group')}>
                <div className={cx('stepper')}>
                    <div className={cx('stepper-start')}>
                        {steps.slice(0, steps.length - 1).map((label, index) => {
                            return (
                                <div key={index} className={cx('step-group')}>
                                    {
                                        index < (steps.length - 1) && <div className={activeStep === index ?
                                            cx('step-active') : index < activeStep ? cx('step-before') : cx('step')}>
                                            <Button
                                                containButtonStyles={activeStep > index || activeStep === index ? cx('step-button-active') : cx('step-button')}
                                                label={activeStep < (index + 1) ? ` ${index + 1}` : undefined}
                                                rightIcon={index < activeStep && IcSelect}
                                                rightIconStyles={cx('icon-right')}
                                            />
                                            <svg className={index < activeStep || index === activeStep ? cx('svg-green') : cx('svg')}>
                                                <line />
                                            </svg>
                                        </div>
                                    }
                                </div>
                            );
                        })}
                    </div>
                    <div className={activeStep === (steps.length - 1) ?
                        cx('step-active') : activeStep < (steps.length - 1) ? cx('step') : cx('step-before')}>
                        <Button
                            containButtonStyles={activeStep > steps.length - 2 ? cx('step-button-active') : cx('step-button')}
                            label={(steps.length - 1) < activeStep ? undefined : `${steps.length}`}
                            rightIcon={steps.length === activeStep && IcSelect}
                            rightIconStyles={cx('icon-right')}
                        />
                    </div>
                </div>
                <div className={cx('label-group')}>
                    {steps.map((label, index) => {
                        return (
                            <div key={index} className={activeStep > index || activeStep === index ? cx('label-step-active') : cx('label-step')}>
                                <span>{label}</span>
                            </div>
                        );
                    })}
                </div>
            </div >
        );
    }, [activeStep]);

    const renderStepContent = useMemo(() => {
        switch (activeStep) {
            case 0:
                return <StepCustomerInfo ref={currentStepRef} onContinue={onContinue} />;
            case 1:
                return <StepLoanInfo ref={currentStepRef} onBack={onBackScreen} onContinue={onContinue} />;
            case 2:
                return <StepDisbursementInfo ref={currentStepRef} onBack={onBackScreen} onContinue={onContinue} />;
            case 3:
            default:
                return <StepExpertiseInfo ref={currentStepRef} onBack={onBackScreen} onContinue={onContinue} />;
        }
    }, [activeStep, onBackScreen, onContinue]);

    // ['tex1', 'text2', 'tex3'] . map => renderViewButton => oncick={onChange => setSteps[index], viewBottom => swictch(steps) case : 1 => return renđerView1, 2=> renderView2}

    const renderIconCollapse = useMemo(() => {
        return (
            <img src={IcArrow} />
        );
    }, []);

    const renderAccordionDetails = useCallback((stepInfo: InfoChild[]) => {
        return <>
            {stepInfo?.map((item: InfoChild) => {
                return (
                    <div key={`${item?.id}`}>
                        {item?.value && <div className={typeof item?.value !== 'string' ? cx('container-accordion') : cx('view-accordion')} key={item?.title}>
                            <span className={cx('title-accordion', 'txt-accordion')}>{item?.title}</span>
                            {typeof item?.value !== 'string' ? renderAccordionDetails(item?.value) : <span className={cx(item?.status ? 'txt-red-accordion' : 'txt-accordion')}>{item?.value}</span>}
                        </div>}
                    </div>
                );
            })}
        </>;
    }, []);

    const renderCollapse = useMemo(() => {
        return (
            <div className={cx('dropdown-right-container')}>
                {stepsInfo.map((item: InfoSteps, index: number) => {
                    return (
                        <Accordion className={cx('form-container-right')} key={index}>
                            <AccordionSummary expandIcon={renderIconCollapse} className={cx('title-container')}>
                                <span className={cx('title-collapse')}>{item?.name}</span>
                            </AccordionSummary>
                            <AccordionDetails className={cx('form-container-detail')}>
                                {renderAccordionDetails(item?.info_child)}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </div>
        );
    }, [stepsInfo, renderIconCollapse, renderAccordionDetails, toggle]);

    return (
        <div className={cx('root-container')}>
            <div className={cx('indicator-container')}>
                <span className={cx('title')}>{Languages.contract.createLoanContract}</span>
                <DirectoryPath />
                <div className={cx('view-tabs')}>
                    {renderViewTabs}
                </div>
            </div>

            <div className={cx('content-container')}>
                <div className={cx('content-left-container')}>
                    {renderStepContent}
                </div>
                {renderCollapse}
            </div>
            <PopupBaseCenterScreen  ref={refModalPopupCenter} labelSuccess={Languages.common.agree} hasTwoButton title={Languages.contract.confirmCreate} description={Languages.contract.descriptionCreate}
                onSuccessPress={onConfirmContract}
            />
            <ModalSuccess ref={refModalSuccess} image={IcSuccessContract} description={Languages.contract.createSuccess}/>
        </div>
    );
});

export default Contract;
