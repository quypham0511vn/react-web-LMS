import Modal from '@mui/material/Modal';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import Ic_Close from 'assets/icon/ic_black_close_contract.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle, useState
} from 'react';
import styles from './popup-base-center-screen.module.scss';

const popupCenterContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

const cx = classNames.bind(styles);

const PopupBaseCenterScreen = forwardRef<PopupBaseActions, PopupBaseProps>(
    ({ onSuccessPress, onClose, onBackdropPress, description, icon, title, labelSuccess, labelCancel, hasTwoButton, hasOneButton,
        popupContainerStyle, describeContainerStyle, textDescribeStyle, buttonContainerStyle, textTitleStyle, iconLeft, iconRight,
        iconLeftStyle, iconRightStyle, buttonAgreeStyle, buttonCancelStyle, textAgreeStyle, textCancelStyle, titleContainerStyle, customerContent, hasCloseIc
    }: PopupBaseProps, ref) => {
        const [visible, setVisible] = useState(false);

        const hideModal = useCallback(() => {
            setVisible(false);
        }, []);

        const showModal = useCallback(() => {
            setVisible(true);
        }, []);

        useImperativeHandle(ref, () => ({
            showModal,
            hideModal
        }));

        const onBackDrop = useCallback(() => {
            setVisible(false);
            onBackdropPress?.();
        }, [onBackdropPress]);

        const onAgree = useCallback(() => {
            onSuccessPress?.();
            setVisible(false);
        }, [onSuccessPress]);

        const onCancel = useCallback(() => {
            setVisible(false);
            onClose?.();
        }, [onClose]);

        return (
            <Modal
                open={visible}
                onClose={onBackDrop}
                sx={popupCenterContainer}
            >
                <div className={popupContainerStyle ? popupContainerStyle : cx('container')}>

                    { hasCloseIc && <img src={Ic_Close} className={cx('icon-close')} onClick={onBackDrop}/>}

                    {icon && <img src={icon} className={cx('icon-main')}/>}

                    <div className={titleContainerStyle ? titleContainerStyle : cx('wrap-title')}>
                        <span className={textTitleStyle ? textTitleStyle : cx('text-title')}>{title || Languages.common.notification}</span>
                    </div>

                    {description && <div className={describeContainerStyle ? describeContainerStyle : cx('wrap-describe')}>
                        <span className={textDescribeStyle ? textDescribeStyle : cx('text-describe')}>{description || Languages.popup.description}</span>
                    </div>}

                    {customerContent}

                    {hasTwoButton &&
                        <div className={cx(buttonContainerStyle ? buttonContainerStyle : 'two-button-container')}>
                            <Button
                                label={labelSuccess || Languages.common.continue}
                                isLowerCase
                                containButtonStyles={buttonAgreeStyle ? buttonAgreeStyle : cx('warp-button-agree')}
                                labelStyles={textAgreeStyle ? textAgreeStyle : cx('text-agree')}
                                onPress={onAgree}
                                rightIcon={iconLeft}
                                rightIconStyles={iconLeftStyle}
                            />
                            <Button
                                label={labelCancel || Languages.common.cancel}
                                isLowerCase
                                containButtonStyles={buttonCancelStyle ? buttonCancelStyle : cx('wrap-button-cancel')}
                                labelStyles={textCancelStyle ? textCancelStyle : cx('text-cancel')}
                                onPress={onCancel}
                                rightIcon={iconRight}
                                rightIconStyles={iconRightStyle}
                            />
                        </div>}
                    {hasOneButton &&
                        <div
                            className={buttonContainerStyle ? buttonContainerStyle : cx('one-button-container')}
                        >
                            <Button
                                label={labelSuccess || Languages.common.continue}
                                isLowerCase
                                containButtonStyles={buttonAgreeStyle ? buttonAgreeStyle : cx('warp-one-button-agree')}
                                labelStyles={textAgreeStyle ? textAgreeStyle : cx('text-one-agree')}
                                onPress={onAgree}
                                rightIcon={iconLeft}
                                rightIconStyles={iconLeftStyle}
                            />
                        </div>}
                </div>
            </Modal>
        );
    }
);

export default PopupBaseCenterScreen;
