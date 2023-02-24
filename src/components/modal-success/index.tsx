import React, { forwardRef, useImperativeHandle, useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import Modal from '@mui/material/Modal';
import styles from './modal-success.module.scss';
import { ModalSuccessActions, ModalSuccessProps } from './types';
import IcClose from 'assets/icon/ic_close.svg';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const stylesContainerCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

const cx = classNames.bind(styles);

const ModalSuccess = forwardRef<ModalSuccessActions, ModalSuccessProps>(({
    image,
    description,
    stylesImg,
    stylesDescription }: ModalSuccessProps, ref: any) => {
    const [visible, setVisible] = useState(false);

    const hideModal = useCallback(() => {
        setVisible(false);
    }, []);

    const showModal = useCallback(() => {
        setVisible(true);
    }, []);

    const onClose = useCallback(() => {
        hideModal?.();
    }, [hideModal]);

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal
    }));

    return (
        <Modal
            open={visible}
            sx={stylesContainerCenter}
            onClose={onClose}
        >
            <div className={cx('body')}>
                <div className={cx('container')}>
                    <img
                        src={IcClose}
                        className={cx('img-close')}
                        onClick={onClose}
                    />
                    <img src={image} className={stylesImg ? cx(`${stylesImg}`) : cx('img')} />
                    <span className={stylesDescription ? cx(`${stylesDescription}`) : cx('styles-description')}>{description}</span>
                </div>
            </div>
        </Modal>
    );
});

export default ModalSuccess;



