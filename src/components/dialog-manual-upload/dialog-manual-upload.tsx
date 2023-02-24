import Modal from '@mui/material/Modal';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import Ic_Warn from 'assets/icon/ic_red_warning_contract.svg';
import Ic_Close from 'assets/icon/ic_black_close_contract.svg';

import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import { InfoChild, InfoSteps } from 'pages/contract';
import { ManualUploadData } from 'pages/__mocks__/ContractInfomation';
import parse from 'html-react-parser';

import React, {
    forwardRef,
    useCallback,
    useImperativeHandle, useState
} from 'react';
import styles from './dialog-manual-upload.module.scss';

const popupCenterContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

const cx = classNames.bind(styles);

const DialogManualUpload = forwardRef<PopupBaseActions, PopupBaseProps>(
    ({ onClose, onBackdropPress
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
                <div className={cx('container')}>
                    <div  className={cx('clear-container')}>
                        <span className={cx('clear-user-text')}>{Languages.contract.clearUser}</span>
                        <img src={Ic_Close}  className={cx('close-img')} onClick={onCancel}/>
                    </div>
                   
                    <div className={cx('notice-container')}>
                        <img src={Ic_Warn}/>
                        <span className={cx('notice-text')}>{parse(Languages.contract.noticeUpload)}</span>
                    </div>
                    {ManualUploadData.map((item: InfoSteps, index: number) => {
                        return (
                            <div key={index}>
                                <span className={cx('title-item-text')}>{item?.name}</span>
                                {item?.info_child.map((itemChild: InfoChild) => {
                                    return (
                                        <div key={itemChild?.id}>
                                            <span className={cx('title-item-child-text')}>{itemChild?.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}

                </div>
            </Modal>
        );
    }
);

export default DialogManualUpload;
