import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { dataLoanRecovery } from 'pages/__mocks__/ContractInfomation';
import React, { useCallback, useMemo, useState } from 'react';
import LoanImpactHistory from './steps-loan-impact-history';
import LoanPay from './steps-loan-pay';
import LoanPaymentPeriod from './steps-loan-payment-period';
import styles from './steps-loan-recovery-detail.module.scss';
import LoanSettlement from './steps-loan-settlement';
import LoanUpload from './steps-loan-upload';

const cx = classNames.bind(styles);

const tabs = [
    Languages.contract.paymentPeriodDetails,
    Languages.contract.pay,
    Languages.contract.settlement,
    Languages.contract.impactHistory,
    Languages.contract.uploadWaiverForm
];

const StepsLoanRecoveryDetail = () => {
    const [labelTabs, setLabelTabs] = useState<string>(Languages.contract.paymentPeriodDetails);
    const [data, setData] = useState(dataLoanRecovery);

    const renderItem = useCallback((title: string, value: string, color?: string) => {
        return (
            <Grid xs={12} className={cx('view-item')}>
                <div className={cx('item-box-one')}>
                    <span className={cx('title-item')}>{title}</span>
                    <label className={cx('label-item', `${color}`)} >{value}</label>
                </div>
            </Grid>
        );
    }, []);

    const renderViewBox = useMemo(() => {
        return (
            <Box sx={{ flexGrow: 1 }} className={cx('left-container')}>
                <Grid container spacing={2} xs={12} className={cx('grid-container')} >
                    <Grid xs={12} md={5.9} container spacing={2} className={cx('grid-child')}>
                        <div className={cx('title')}>{Languages.contract.steps.customerInformation}</div>
                        <Grid item xs={12} md={6} className={cx('grid-item')}>
                            {renderItem(Languages.contract.customerName, data.name_customer, 'color-red')}
                            {renderItem(Languages.loanInfo.loanProduct, data.loan_product)}
                            {renderItem(Languages.loanInfo.loanFormat, data.loan_format)}
                        </Grid>
                        <Grid item xs={12} md={6} className={cx('grid-item')}>
                            {renderItem(Languages.loanInfo.loanTimer, data.loan_timer)}
                            {renderItem(Languages.contract.paymentMethod, data.payment_method)}

                            <div className={cx('item-box-right')}>
                                <Button
                                    label={Languages.contract.seeActualFees}
                                    isLowerCase
                                    containButtonStyles={cx('button-container')}
                                    labelStyles={cx('label-btn')}
                                />
                                <Button
                                    label={Languages.contract.viewCode}
                                    isLowerCase
                                    containButtonStyles={cx('button-container')}
                                    labelStyles={cx('label-btn')}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={6} container spacing={2} className={cx('grid-child')}>
                        <div className={cx('title')}>{Languages.contract.debitBalanceInformation}</div>
                        <Grid item xs={12} md={6} className={cx('grid-item')}>
                            {renderItem(Languages.loanInfo.loanAmount, data.loan_amount, 'color-red')}
                            {renderItem(Languages.contract.remainingPrincipalBalance, data.remaining_principal_balance)}
                            {renderItem(Languages.contract.amountPaid, data.amount_paid)}
                            {renderItem(Languages.contract.moneyPaid, data.money_paid, 'color-green')}
                        </Grid>
                        <Grid item xs={12} md={6} className={cx('grid-item')}>
                            {renderItem(Languages.contract.moneyOwed, data.money_owed, 'color-red')}
                            {renderItem(Languages.contract.slowPeriod, data.slow_period, 'color-red')}
                            {renderItem(Languages.contract.unpaidMoney, data.unpaid_money)}
                            {renderItem(Languages.contract.overdueMoney, data.overdue_money, 'color-red')}
                            {renderItem(Languages.contract.penaltyForLatePayment, data.penalty_for_late_payment)}

                        </Grid>
                    </Grid>
                </Grid >
            </Box >
        );
    }, [data.amount_paid, data.loan_amount, data.loan_format, data.loan_product, data.loan_timer, data.money_owed, data.money_paid, data.name_customer, data.overdue_money, data.payment_method, data.penalty_for_late_payment, data.remaining_principal_balance, data.slow_period, data.unpaid_money, renderItem]);

    const renderTabs = useMemo(() => {
        return <div className={cx('view-tabs')}>
            {tabs.map((label: string, index: number) => {
                const handleChange = () => {
                    setLabelTabs(label);
                };

                return (
                    <Button
                        label={label}
                        onPress={handleChange}
                        key={index}
                        labelStyles={label === labelTabs ? cx('style-label-focus') : cx('style-label')}
                        containButtonStyles={label === labelTabs ? cx('style-container-focus') : cx('style-container')}
                        isLowerCase
                    />
                );
            })}
        </div>;
    }, [labelTabs]);

    const renderViewStep = useMemo(() => {
        switch (labelTabs) {
            case tabs[0]:
                return <LoanPaymentPeriod />;
            case tabs[1]:
                return <LoanPay />;
            case tabs[2]:
                return <LoanSettlement />;
            case tabs[3]:
                return <LoanImpactHistory />;
            case tabs[4]:
                return <LoanUpload />;
            default:
                return;
        }
    }, [labelTabs]);

    return (
        <div className={cx('container')}>
            <Box className={cx('box-container')} >
                <Grid container xs={12} className={cx('grid-box')}>
                    {renderViewBox}
                </Grid>
            </Box>
            {renderTabs}
            {renderViewStep}
        </div>
    );
};

export default StepsLoanRecoveryDetail;
