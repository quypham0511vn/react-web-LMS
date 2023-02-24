
import classNames from 'classnames/bind';
import React, { useCallback, useRef, useMemo } from 'react';
import style from './header.module.scss';

import Languages from 'commons/languages';
import { useAppStore } from 'hooks';
import Marquee from 'react-fast-marquee';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

import { Badge } from '@mui/material';
import IcCart from 'assets/icon/menu/cart.svg';
import IcLogo from 'assets/icon/menu/logo.svg';
import IcNotification from 'assets/icon/menu/notification.svg';
import IcTelegram from 'assets/icon/menu/telegram.svg';
import IcTelephone from 'assets/icon/menu/telephone.svg';

import ModalCart from './dialog-header-cart';
import ModalNotification from './dialog-header-notification';
import ModalTelegram from './dialog-header-telegram';
import ModalTelephone from './dialog-header-telephone';
import ModalLogin from './dialog-header-login';
import { PopupBaseActions } from 'models/modal-model';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import IcCancel from 'assets/icon/ic_red_cancel_input_phone.svg';
import PopupBaseAnchorComponent from 'components/popup-base-anchor-component';

const cx = classNames.bind(style);

function Header() {
    const { userManager } = useAppStore();
    const refModalNotification = useRef<PopupBaseActions>(null);
    const refModalCart = useRef<PopupBaseActions>(null);
    const refModalTelegram = useRef<PopupBaseActions>(null);
    const refModalTelephone = useRef<PopupBaseActions>(null);
    const refModalLogin = useRef<PopupBaseActions>(null);


    const showModalNotify = useCallback(() => {
        refModalNotification.current?.showModal();
    }, []);

    const showModalCart = useCallback(() => {
        refModalCart.current?.showModal();
    }, []);

    const showModalTelegram = useCallback(() => {
        refModalTelegram.current?.showModal();
    }, []);

    const showModalTelephone = useCallback(() => {
        refModalTelephone.current?.showModal();
    }, []);

    const showModalLogin = useCallback(() => {
        refModalLogin.current?.showModal();
    }, []);

    const renderPopupTelegram = useMemo(() => {
        return (
            <PopupBaseCenterScreen ref={refModalTelegram}
                icon={IcCancel}
                hasTwoButton
            />
        );
    }, []);

    const renderPopupCart = useMemo(() => {
        return (
            <PopupBaseAnchorComponent ref={refModalCart} hasTwoButton icon={IcCancel} />
        );
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('innerLeft')}>
                <img src={IcLogo} className={cx('icon-tienngay')} />
            </div>
            <div className={cx('innerCenter')}>
                <Marquee pauseOnHover gradient={false}>
                    <div className={cx('textContent')}>
                        <span>{Languages.header.textCenter}</span>
                        <span>{Languages.header.textCenter1}</span>
                    </div>
                </Marquee>
            </div>
            <div className={cx('innerRight')}>
                <div className={cx('innerRightItem')}>
                    <div className={cx('icons')}>
                        <Badge

                            color="secondary"
                            badgeContent={99}
                            className={cx('icon')}
                            onClick={showModalNotify}
                        >
                            <img src={IcNotification} />
                        </Badge>

                        <div>
                            <Badge
                                color="secondary"
                                badgeContent={99}
                                className={cx('icon')}
                                onClick={showModalCart}
                            >
                                <img src={IcCart} />
                            </Badge>
                            {renderPopupCart}
                        </div>
                        <Badge
                            color="secondary"
                            badgeContent={99}
                            className={cx('icon')}
                            onClick={showModalTelegram}
                        >
                            <img src={IcTelegram} />
                        </Badge>
                        <Badge
                            color="secondary"
                            badgeContent={99}
                            className={cx('icon')}
                            onClick={showModalTelephone}
                        >
                            <img src={IcTelephone} />
                        </Badge>
                    </div>
                    <div className={cx('avatarLogin')} onClick={showModalLogin}>
                        <AvatarGroup>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </AvatarGroup>
                        <div className={cx('textContainer')}>
                            <span className={cx('txtName')}>{userManager?.userInfo?.name}</span>
                            <span className={cx('txtTitle')}>{userManager?.userInfo?.position?.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ModalNotification ref={refModalNotification} />
            {renderPopupTelegram}
            <ModalTelephone ref={refModalTelephone} />
            <ModalLogin ref={refModalLogin} />
        </div>
    );
}

export default Header;
