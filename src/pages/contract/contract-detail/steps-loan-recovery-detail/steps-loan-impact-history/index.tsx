import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { LoanImpactHistory } from 'models/contract-detail.model';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './steps-loan-impact-history.module.scss';
const cx = classNames.bind(styles);

const name_row_history = [
    Languages.contract.tableImpactHistory.stt,
    Languages.contract.tableImpactHistory.time,
    Languages.contract.tableImpactHistory.performer,
    Languages.contract.tableImpactHistory.result,
    Languages.contract.tableImpactHistory.paymentAppointmentDate,
    Languages.contract.tableImpactHistory.amountPaymentAppointment,
    Languages.contract.tableImpactHistory.note
];

function mockDataTableHistory() {

    let _history: LoanImpactHistory[] = [];

    for (let index = 1; index < 15; index++) {
        _history.push({
            stt: `${index}`,
            time: '05/10/2021 09:33:21	',
            performer: 'Nguyễn Đình Dũng',
            result: 'Thành công',
            payment_appointment_date: '05/10/2021',
            amount_payment_appointment: '50,200',
            note: 'Đã thanh toán đủ'
        });
    }

    return _history;
}

const LoanPaymentPeriod = () => {
    const [dataTableHistory, setDataTableHistory] = useState<LoanImpactHistory[]>([]);

    useEffect(() => {
        setDataTableHistory(mockDataTableHistory());
    }, []);

    const renderTableBottom = useMemo(() => {
        return (
            <div className={cx('container-table')}>
                <span className={cx('txt-group-table')}>{Languages.contract.impactHistory}</span>
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
                                .map((row: LoanImpactHistory, index: number) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            className={index % 2 === 0 ? cx('table-body-row-white') : cx('table-body-row-gray')}
                                        >
                                            {Object.keys(row).map((key) => {
                                                return (
                                                    <TableCell
                                                        align="center"
                                                        className={cx('text-table')}
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
            {renderTableBottom}
        </div>
    );
};

export default LoanPaymentPeriod;
