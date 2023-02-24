import Modal from '@mui/material/Modal';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import styles from './modal-delete.module.scss';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const stylesContainerCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

const cx = classNames.bind(styles);

const ModalDelete = forwardRef<PopupBaseActions, PopupBaseProps>(({ description, content, onConfirm }: PopupBaseProps, ref) => {

    const [visible, setVisible] = useState(false);

    const hideModal = () => {
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true);
    };

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal
    }));



    const onClickConfirm = useCallback(() => {
        onConfirm?.();
        setVisible(false);
    }, [onConfirm]);

    const onClickCancel = () => {
        setVisible(false);
    };

    return (
        <Modal
            open={visible}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={onClickCancel}
            sx={stylesContainerCenter}
        >
            <>
                <div className={cx('container')}>
                    <div className={cx('group-input')}>
                        <h1>{description}</h1>
                    </div>
                    <div className={cx('group-input')}>
                        <p>{content}</p>
                    </div>
                    <div className={cx('view-bottom')}>
                        <Button
                            label={Languages.common.agree}
                            isLowerCase
                            containButtonStyles={cx('button-continue')}
                            labelStyles={cx('label-continue')}
                            onPress={onClickConfirm}
                        />
                        <Button
                            label={Languages.common.cancel}
                            isLowerCase
                            containButtonStyles={cx('button-cancel')}
                            labelStyles={cx('label-cancel')}
                            onPress={onClickCancel}
                        />
                    </div>
                </div>
            </>
        </Modal>
    );
});

export default ModalDelete;
