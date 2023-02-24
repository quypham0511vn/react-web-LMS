import Modal from '@mui/material/Modal';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { PopupBaseProps, PopupBaseActions } from 'models/modal-model';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle, useState
} from 'react';
import styles from './dialog-cart.module.scss';

const cx = classNames.bind(styles);
const ModalCart = forwardRef<PopupBaseActions, PopupBaseProps>(
    ({ description, onSuccessPress, onBackdropPress }: PopupBaseProps, ref) => {
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

        const onOk = useCallback(() => {
            onSuccessPress?.();
            setVisible(false);
        }, [onSuccessPress]);

        const onCancel = () => {
            setVisible(false);
            onBackdropPress?.();
        };
       
        return (
            <Modal
                open={visible}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={onCancel}
            >
                <>
                    <div className={cx('container')}>
                        <div className={cx('group-input')}>
                            <h1>{description}</h1>
                        </div>
                        <div className={cx('view-bottom')}>
                            <Button
                                label={Languages.common.continue}
                                isLowerCase
                                containButtonStyles={cx('button-continue')}
                                labelStyles={cx('label-continue')}
                                onPress={onOk}
                            />
                            <Button
                                label={Languages.common.cancel}
                                isLowerCase
                                containButtonStyles={cx('button-cancel')}
                                labelStyles={cx('label-cancel')}
                                onPress={onCancel}
                            />
                        </div>
                    </div>
                </>
            </Modal>
        );
    }
);

export default ModalCart;
