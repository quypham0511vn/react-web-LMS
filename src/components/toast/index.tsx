import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { TYPE_TOAST } from 'commons/constants';
import React, { useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import styles from './toast.module.scss';

const cx = classNames.bind(styles);

export type DataToast = {
    type: string;
    title: string;
    describe: string;
}

export type ToastActions = {
    showToast: (content?: any) => any;
}

export type ToastProps = {
    dataToast?: DataToast[];
}

export const Toast = React.forwardRef<ToastActions, ToastProps>(({ dataToast }: ToastProps, ref) => {
    const [show, setShow] = React.useState(false);
    const [toggle, setToggle] = React.useState(false);
    const [data, setData] = useState<DataToast[]>();

    useImperativeHandle(ref, () => ({
        showToast
    }));

    useEffect(() => {
        setData(dataToast);
    }, [dataToast]);

    const showToast = useCallback((_data: DataToast) => {
        const dataErr = data || [] as DataToast[];
        dataErr?.push(_data);
        setData(dataErr);
        setShow(true);
        setToggle(lasts => !lasts);
        setTimeout(() => {
            data?.shift();
            setToggle(lasts => !lasts);
            console.log('data ===', data);
        }, 4000);
        if (data?.length === 1 || data === undefined) {
            console.log('asass');
            setTimeout(() => {
                setData([]);
                setShow(false);
            }, 8000);
        }
    }, [data]);

    const renderView = useCallback((item: DataToast) => {
        switch (item.type) {
            case TYPE_TOAST.SUCCESS:
                return <Stack sx={{ width: '100%' }} spacing={2} className={cx('stack')}>
                    <Alert severity={'success'}>
                        <AlertTitle className={cx('alertTitle')}>{item?.title}</AlertTitle>
                        <span className={cx('describe')}>{item?.describe}</span>
                    </Alert>
                </Stack>;

            case TYPE_TOAST.INFO:
                return <Stack sx={{ width: '100%' }} spacing={2} className={cx('stack')}>
                    <Alert severity={'info'}>
                        <AlertTitle className={cx('alertTitle')}>{item?.title}</AlertTitle>
                        <span className={cx('describe')}>{item?.describe}</span>
                    </Alert>
                </Stack>;
            case TYPE_TOAST.ERROR:
                return <Stack sx={{ width: '100%' }} spacing={2} className={cx('stack')}>
                    <Alert severity={'error'}>
                        <AlertTitle className={cx('alertTitle')}>{item?.title}</AlertTitle>
                        <span className={cx('describe')}>{item?.describe}</span>
                    </Alert>
                </Stack>;
            case TYPE_TOAST.WARNING:
                return <Stack sx={{ width: '100%' }} spacing={2} className={cx('stack')}>
                    <Alert severity={'warning'}>
                        <AlertTitle className={cx('alertTitle')}>{item?.title}</AlertTitle>
                        <span className={cx('describe')}>{item?.describe}</span>
                    </Alert>
                </Stack>;
            default:
                return;
        }

    }, []);

    const renderViewErrMsg = useMemo(() => {
        return (
            <div className={cx('toast')}>
                {data?.map((item, index) => {
                    return (
                        <div key={index}>
                            {renderView(item)}
                        </div>);
                })}
            </div>
        );
    }, [data, renderView, toggle]);

    return (
        <>
            {show && renderViewErrMsg}
        </>
    );
});


