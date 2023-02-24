import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames/bind';
import { UserStatusLoan } from 'commons/constants';
import Languages from 'commons/languages';
import { LoanPaymentHistory, LoanPaymentPeriodModel } from 'models/contract-detail.model';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './steps-loan-payment-period.module.scss';
const cx = classNames.bind(styles);

const name_row = [
    Languages.contract.tableLoan.paymentPeriod,
    Languages.contract.tableLoan.dateOfMaturity,
    Languages.contract.tableLoan.numberDay,
    Languages.contract.tableLoan.numberLatePaymentDate,
    Languages.contract.tableLoan.moneyPayableMonthly,
    Languages.contract.tableLoan.initialMoney,
    Languages.contract.tableLoan.profitMoney,
    Languages.contract.tableLoan.managementStorage,
    Languages.contract.tableLoan.totalPayment,
    Languages.contract.tableLoan.paid,
    Languages.contract.tableLoan.unpaid,
    Languages.contract.tableLoan.status,
    Languages.contract.tableLoan.forfeit
];

const name_row_history = [
    Languages.contract.tablePaymentHistory.stt,
    Languages.contract.tablePaymentHistory.code,
    Languages.contract.tablePaymentHistory.dateCreated,
    Languages.contract.tablePaymentHistory.dateOfPayment,
    Languages.contract.tablePaymentHistory.paymentAmount,
    Languages.contract.tablePaymentHistory.amountExemption,
    Languages.contract.tablePaymentHistory.overdueFee,
    Languages.contract.tablePaymentHistory.overdueDate,
    Languages.contract.tablePaymentHistory.renewalFee,
    Languages.contract.tablePaymentHistory.extraMoney,
    Languages.contract.tablePaymentHistory.updater,
    Languages.contract.tablePaymentHistory.paymentType,
    Languages.contract.tablePaymentHistory.status,
    Languages.contract.tablePaymentHistory.notePGD,
    Languages.contract.tablePaymentHistory.accountingNotes

];

function mockDataTable() {

    let _contract: LoanPaymentPeriodModel[] = [];

    for (let index = 0; index < 15; index++) {
        _contract.push({
            payment_period: `${index}`,
            date_of_maturity: '04/12/2021',
            number_day: 30,
            number_late_payment_date: 0,
            money_payable_monthly: '2,050,200',
            initial_money: '1,184,965',
            profit_money: '225,000',
            management_storage: '675,000',
            total_payment: '2,050,200',
            paid: '2,050,200',
            unpaid: '2,483,476',
            status: Object.values(UserStatusLoan)[Math.floor(Math.random() * Object.values(UserStatusLoan).length)],
            forfeit: '433,276'
        });
    }

    _contract.push({
        payment_period: 'Tổng',
        date_of_maturity: '',
        number_day: 100,
        number_late_payment_date: 0,
        money_payable_monthly: '2,050,232,200',
        initial_money: '1,184,965,1232',
        profit_money: '225,000,132',
        management_storage: '675,000,1323',
        total_payment: '2,050,200,132',
        paid: '2,050,200,1323',
        unpaid: '2,483,476,3123',
        status: '',
        forfeit: '433,276,1,23'
    });

    return _contract;
}

function mockDataTableHistory() {

    let _history: LoanPaymentHistory[] = [];

    for (let index = 0; index < 8; index++) {
        _history.push({
            stt: `${index}`,
            code: 'PT_20211005_615bb9720a641',
            date_created: '05/10/2021 09:33:21	',
            date_of_payment: '05/10/2021 09:33:21	',
            payment_amount: '2,050,200',
            amount_exemption: '1,184,965',
            overdue_fee: '225,000',
            overdue_date: '05/10/2021',
            renewal_fee: '50,200',
            extra_money: '50,200',
            updater: 'Duy Bùi',
            paymentType: 'Thanh toán - Kỳ',
            status: Object.values(UserStatusLoan)[Math.floor(Math.random() * Object.values(UserStatusLoan).length)],
            note: 'Thanh toán đủ kỳ 1',
            accounting_notes: 'Thành công'
        });
    }

    _history.push({
        stt: 'Tổng',
        code: '',
        date_created: '',
        date_of_payment: '',
        payment_amount: '2,050,200',
        amount_exemption: '1,184,965',
        overdue_fee: '225,000',
        overdue_date: '',
        renewal_fee: '50,200',
        extra_money: '50,200',
        updater: '',
        paymentType: '',
        status: '',
        note: '',
        accounting_notes: ''
    });

    return _history;
}

const red = ['number_late_payment_date', 'total_payment'];

const LoanPaymentPeriod = () => {
    const [dataTable, setDataTable] = useState<LoanPaymentPeriodModel[]>([]);
    const [dataTableHistory, setDataTableHistory] = useState<LoanPaymentHistory[]>([]);

    useEffect(() => {
        setDataTable(mockDataTable());
        setDataTableHistory(mockDataTableHistory());
    }, []);

    const renderTableTop = useMemo(() => {
        return (
            <div className={cx('container-table')}>
                <span className={cx('txt-group-table')}>{Languages.contract.paymentPeriod}</span>
                <TableContainer component={Paper} className={cx('table-container')} >
                    <Table aria-label="simple table" className={cx('table')}>
                        <TableHead className={cx('table-head')}>
                            <TableRow
                                className={cx('table-row')}
                            >
                                {name_row.map((label: string) => {
                                    return (
                                        <TableCell
                                            key={label}
                                            align="center"
                                            className={cx('txt-tableCell')}
                                        >{label}</TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody
                            className={cx('table-body')}
                        >
                            {dataTable
                                .map((row: LoanPaymentPeriodModel, index: number) => {

                                    return (
                                        <TableRow
                                            key={index}
                                            className={index % 2 === 0 ? cx('table-body-row-white') : cx('table-body-row-gray')}
                                        >
                                            {Object.keys(row).map((key: string) => {
                                                const style = () => {
                                                    if (index === dataTable.length - 1) {
                                                        if (red.filter(color => color === key).length > 0) {
                                                            return cx('text-table', 'font-bold', 'color-red');
                                                        }
                                                        else return cx('text-table', 'font-bold');
                                                    } else {
                                                        if (red.filter(color => color === key).length > 0) return cx('text-table', 'color-red');
                                                        else if (key === 'status') {
                                                            switch (row[key]) {
                                                                case UserStatusLoan.BAD_DEBT_GROUP:
                                                                    return cx('text-table', 'color-red');
                                                                case UserStatusLoan.NOT_TIME_TO_PAY:
                                                                    return cx('text-table', 'color-green');
                                                                case UserStatusLoan.PAID:
                                                                    return cx('text-table', 'color-green');
                                                                case UserStatusLoan.UNPAID:
                                                                    return cx('text-table', 'color-blue');
                                                                default:
                                                                    return cx('text-table');
                                                            }
                                                        }
                                                        else return cx('text-table');
                                                    }
                                                };
                                                return (
                                                    <TableCell
                                                        align="center"
                                                        className={style()}
                                                        key={key}
                                                    >{row[key]}</TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }, [dataTable]);

    const renderTableBottom = useMemo(() => {
        return (
            <div className={cx('container-table')}>
                <span className={cx('txt-group-table')}>{Languages.contract.paymentHistory}</span>
                <TableContainer component={Paper} className={cx('table-container')} >
                    <Table aria-label="simple table" className={cx('table')}>
                        <TableHead className={cx('table-head')}>
                            <TableRow
                                className={cx('table-row')}
                            >
                                {name_row_history.map((label: string) => {
                                    return (
                                        <TableCell key={label} align="center" className={cx('txt-tableCell')}>{label}</TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody
                            className={cx('table-body')}
                        >
                            {dataTableHistory
                                .map((row: LoanPaymentHistory, index: number) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            className={index % 2 === 0 ? cx('table-body-row-white') : cx('table-body-row-gray')}
                                        >
                                            {Object.keys(row).map((key) => {
                                                return (
                                                    <TableCell
                                                        align="center"
                                                        className={index === dataTableHistory.length - 1 ? cx('text-table', 'font-bold') : cx('text-table')}
                                                        key={key}
                                                    >
                                                        {row[key]}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }, [dataTableHistory]);

    return (
        <div className={cx('container')}>
            {renderTableTop}
            {renderTableBottom}
        </div>
    );
};

export default LoanPaymentPeriod;
