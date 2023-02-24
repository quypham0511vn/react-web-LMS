import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { infoCustomer, infoRelative } from 'pages/__mocks__/TestApiProductUnivest';
import React, { useCallback } from 'react';
import style from './stepsContractDetail.module.scss';

const cx = classNames.bind(style);
const StepsContractDetail = () => {
    const boxOne = useCallback((data: any) => {
        return (
            <Box sx={{ flexGrow: 1 }} className={cx('left-container')}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx('title')}>{Languages.contract.steps.customerInformation}</div>
                    </Grid>
                    <Grid item xs={6}>
                        {data.map((item: any, index: number) => {
                            return (
                                <div key={index}>
                                    <div className={cx('info-customer')}>{item.title}</div>
                                    {item?.Children.map((items: any, id: number) => {
                                        return (
                                            <div className={cx('info-1')} key={id}>
                                                <span className={cx('text-title')}>{items.title}</span>
                                                <label htmlFor="">{items.label}</label>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </Grid>
                    <Grid item xs={6}>
                        <div className={cx('info-relative')}>{Languages.contract.relativeInformation}</div>
                        {infoRelative.map((item, index) => {
                            return (
                                <div className={cx('info-2')} key={index}>
                                    <span className={cx('font-text')}>{item.title}</span>
                                    <label htmlFor="">{item.label}</label>
                                </div>
                            );
                        })}

                    </Grid>
                </Grid>
            </Box>
        );
    }, []);

    return (
        <Box sx={{ flexGrow: 1, padding: 0, margin: '0px 15px' }} >
            <Grid container spacing={2}>
                <Grid item xs={5} md={5} className={cx('box-one')}>
                    {boxOne(infoCustomer)}
                </Grid>
                <Grid item xs={5} md={5} className={cx('box-one')}>
                    {boxOne(infoCustomer)}
                </Grid>
                <Grid item xs={2}>
                    {boxOne(infoCustomer)}
                </Grid>
            </Grid>
        </Box>
    );
};

export default StepsContractDetail;
