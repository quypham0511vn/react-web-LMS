import { Popover } from '@mui/material';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import styles from './popup-base-anchor-component.module.scss';

const cx = classNames.bind(styles);

const PopupBaseAnchorComponent = forwardRef<PopupBaseActions, PopupBaseProps>(
    ({ onSuccessPress, onClose, onBackdropPress, description, icon, title, labelSuccess, labelCancel, hasTwoButton, hasOneButton,
        popupContainerStyle, describeContainerStyle, textDescribeStyle, buttonContainerStyle, textTitleStyle, iconLeft, iconRight,
        iconLeftStyle, iconRightStyle, buttonAgreeStyle, buttonCancelStyle, textAgreeStyle, textCancelStyle, titleContainerStyle
    }: PopupBaseProps, ref) => {
        const refVal = useRef<any>(null);

        const hideModal = useCallback(() => {
            setAnchorEl(null);
        }, []);

        const showModal = useCallback(() => {
            setAnchorEl(refVal.current);
        }, []);

        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);

        useImperativeHandle(ref, () => ({
            showModal,
            hideModal
        }));

        const onbackDrop = useCallback(() => {
            setAnchorEl(null);
            onBackdropPress?.();
        }, [onBackdropPress]);

        const onAgree = useCallback(() => {
            onSuccessPress?.();
            setAnchorEl(null);
        }, [onSuccessPress]);

        const onCancel = useCallback(() => {
            onClose?.();
            setAnchorEl(null);
        }, [onClose]);

        return (
            <div>
                <div onClick={showModal}
                    ref={refVal}
                />
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={onbackDrop}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left'
                    }}
                >
                    <div className={popupContainerStyle ? popupContainerStyle : cx('container')}>

                        {icon && <img src={icon} className={cx('icon-main')} />}

                        <div className={titleContainerStyle ? titleContainerStyle : cx('wrap-title')}>
                            <span className={textTitleStyle ? textTitleStyle : cx('text-title')}>{title || Languages.common.notification}</span>
                        </div>

                        <div className={describeContainerStyle ? describeContainerStyle : cx('wrap-describe')}>
                            <span className={textDescribeStyle ? textDescribeStyle : cx('text-describe')}>{description || Languages.popup.description}</span>
                        </div>

                        {hasTwoButton &&
                            <div className={cx(buttonContainerStyle ? buttonContainerStyle : 'two-button-container')}>
                                <Button
                                    label={Languages.common.continue || labelSuccess}
                                    isLowerCase
                                    containButtonStyles={buttonAgreeStyle ? buttonAgreeStyle : cx('warp-button-agree')}
                                    labelStyles={textAgreeStyle ? textAgreeStyle : cx('text-agree')}
                                    onPress={onAgree}
                                    rightIcon={iconLeft}
                                    rightIconStyles={iconLeftStyle}
                                />
                                <Button
                                    label={Languages.common.cancel || labelCancel}
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
                                    label={Languages.common.continue || labelSuccess}
                                    isLowerCase
                                    containButtonStyles={buttonAgreeStyle ? buttonAgreeStyle : cx('warp-one-button-agree')}
                                    labelStyles={textAgreeStyle ? textAgreeStyle : cx('text-one-agree')}
                                    onPress={onAgree}
                                    rightIcon={iconLeft}
                                    rightIconStyles={iconLeftStyle}
                                />
                            </div>}
                    </div>
                </Popover>
            </div>

        );
    }
);

export default PopupBaseAnchorComponent;
