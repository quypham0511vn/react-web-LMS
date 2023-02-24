import Modal from '@mui/material/Modal';
import classNames from 'classnames/bind';
import React, {
    forwardRef, useCallback, useImperativeHandle, useState
} from 'react';
import styles from './dialog-notification.module.scss';
import { notificationsData } from 'pages/__mocks__/TestApiProductUnivest';
import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import Languages from 'commons/languages';
import { NotificationModel } from 'models/notifications-model';
import IcArrow from 'assets/icon/ic_arrow_right_notify_header.svg';
const cx = classNames.bind(styles);

const dialogCenterContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

interface PopupNotifyProps extends PopupBaseProps {
    dataList?: NotificationModel[];
    onPressItem?: any;
    onShowAllNotify?: any;
}


const ModalNotification = forwardRef<PopupBaseActions, PopupNotifyProps>(({ onBackdropPress, onPressItem, onShowAllNotify }: PopupNotifyProps, ref) => {
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

    const onCancel = useCallback(() => {
        setVisible(false);
        onBackdropPress?.();
    }, [onBackdropPress]);

    const handleAllNotify = useCallback(() => {
        setVisible(false);
        onShowAllNotify?.();
    }, [onShowAllNotify]);

    const renderItemNotify = useCallback((item: NotificationModel) => {
        const onPressItemList = (
        ) => {
            setVisible(false);
            onPressItem?.();
        };

        return (
            <div className={cx(`${item?.state ? 'notify-container' : 'notify-unread-container'}`)} onClick={item?.state ? onPressItemList : undefined}>
                <div className={cx('header-notify-container')}>
                    <span className={cx(`${item?.state ? 'contract-text' : 'contract-unread-text'}`)}>{item?.id_contract}</span>
                    <span className={cx('date-text')}>{item?.date}</span>
                </div>
                <div className={cx(`${item?.state ? 'content-text' : 'content-unread-text'}`)}>
                    <span>{item?.content}</span>
                </div>
            </div>
        );
    }, [onPressItem]);

    const renderListItemNoti = useCallback((itemList: NotificationModel[]) => {
        return (
            <>
                {itemList.map((item: NotificationModel, index: number) => {
                    return (
                        <div key={index}>
                            {renderItemNotify(item)}
                        </div>
                        
                    );
                })}
            </>

        );
    }, [renderItemNotify]);

    return (
        <Modal
            open={visible}
            onClose={onCancel}
            sx={dialogCenterContainer}
        >
            <div className={cx('container')}>
                {renderListItemNoti(notificationsData)}
                <div className={cx('show-all-notify-container')} onClick={handleAllNotify}>
                    <div className={cx('all-notify-text')}>{Languages.common.showAllNotify}</div>
                    <img src={IcArrow} />
                </div>
            </div>
        </Modal>
    );
});

export default ModalNotification;
