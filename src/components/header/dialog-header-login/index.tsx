import { Avatar } from '@mui/material';
import Modal from '@mui/material/Modal';
import IcOut from 'assets/icon/ic_out.svg';
import IcPeople from 'assets/icon/ic_people.svg';
import IcSetting from 'assets/icon/ic_small_setting_header.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import KeyValueBase from 'components/key-value-base';
import { useAppStore } from 'hooks';
import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import styles from './dialog-login.module.scss';

const cx = classNames.bind(styles);
interface PopupLoginProps extends PopupBaseProps {
    onPressUserInfo?: any;
    onPressSettingAcc?: any;
    onPressLogout?: any;
}

const ModalLogin = forwardRef<PopupBaseActions, PopupLoginProps>(
    ({ onPressUserInfo, onPressSettingAcc, onPressLogout }: PopupLoginProps, ref) => {
        const { userManager } = useAppStore();

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

        const handleCancel = () => {
            setVisible(false);
        };

        const handleUserInfo = useCallback(() => {
            hideModal();
            onPressUserInfo?.();
        }, [onPressUserInfo]);

        const handleSettingAcc = useCallback(() => {
            hideModal();
            onPressSettingAcc?.();
        }, [onPressSettingAcc]);

        const handleLogout = useCallback(() => {
            hideModal();
            onPressLogout?.();
        }, [onPressLogout]);

        const renderNavigateUserInfo = useCallback((iconLeft: any, label: string, onPressItem: any) => {
            return (
                <KeyValueBase
                    labelLeft={iconLeft}
                    iconLeft={label}
                    onPress={onPressItem}
                    keyContainerStyle={cx('key-container-style')}
                    labelLeftStyle={cx('label-wrap')}
                />
            );
        }, []);

        return (
            <Modal
                open={visible}
                onClose={handleCancel}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div className={cx('container')}>
                    <div className={cx('intro-container')}>
                        <Avatar
                            alt= ""
                            src={userManager?.userInfo?.avatar ? userManager?.userInfo?.avatar : ''}
                            className={cx('icon-view')}
                        />
                        <div className={cx('intro-user-view')}>
                            <span className={cx('name-user-text')}>{userManager?.userInfo?.name}</span>
                            <span className={cx('role-user-text')}>{userManager?.userInfo?.position?.name}</span>
                        </div>
                    </div>
                    <div className={cx('popup-content')}>
                        {renderNavigateUserInfo(Languages.header.personalInformation, IcPeople, handleUserInfo)}
                        {renderNavigateUserInfo(Languages.header.setting, IcSetting, handleSettingAcc)}
                    </div>
                    {renderNavigateUserInfo(Languages.header.logout, IcOut, handleLogout)}
                </div>
            </Modal>
        );
    }
);

export default ModalLogin;
