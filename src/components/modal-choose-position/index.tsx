import Modal from '@mui/material/Modal';
import IcRight from 'assets/icon/ic_right.svg';
import classNames from 'classnames/bind';
import { Button } from 'components/button';
import { PositionModel } from 'models/position-model';
import { positionsMock } from 'pages/__mocks__/Positions';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import styles from './modal-choose-position.module.scss';
import { ModalChoosePositionActions, ModalChoosePositionProps } from './types';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const stylesContainerCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

const cx = classNames.bind(styles);

const ModalChoosePosition = forwardRef<ModalChoosePositionActions, ModalChoosePositionProps>((
    { description, onConfirm }: ModalChoosePositionProps, ref) => {

    const [visible, setVisible] = useState(false);
    const [department] = useState(positionsMock);
    const [expandedFlow, setExpandedFlow] = useState<string[]>([positionsMock.id]); // track user expand flow

    const isAdditionPermGroupRef = useRef<boolean>(false);

    const hideModal = () => {
        isAdditionPermGroupRef.current = false;
        setVisible(false);
    };

    const showModal = useCallback((isAdditionPermGroup: boolean) => {
        isAdditionPermGroupRef.current = isAdditionPermGroup;
        setVisible(true);
    }, []);

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal
    }));

    const handleCancel = () => {
        setVisible(false);
    };

    const renderDepartment = useCallback((positionItem: PositionModel, level: number) => {
        const hasChild = (positionItem?.children?.length || 0) > 0;

        const onClickItem = () => {
            if (!hasChild) {
                onConfirm?.({ data: positionItem, isAdditionPermGroup: isAdditionPermGroupRef.current });
                setVisible(false);
            } else {
                if (expandedFlow.includes(positionItem.id)) {
                    setExpandedFlow(last => last.slice(0, last.indexOf(positionItem.id)));
                } else {
                    setExpandedFlow(last => [...last, positionItem.id]);
                }
            }
        };

        const paddingLeft = level * 20; // padding for each level

        return positionItem ? <>
            <Button
                label={positionItem.name}
                key={positionItem.id}
                containButtonStyles={cx('container-button')}
                customStyles={{ 'paddingLeft': paddingLeft }}
                labelStyles={cx('label-btn')}
                isLowerCase
                rightIcon={hasChild && IcRight}
                onPress={onClickItem}
            />
            {hasChild && expandedFlow.includes(positionItem.id) &&
                positionItem?.children?.map((item, index) => {
                    return (
                        <div key={index}>
                            {renderDepartment(item, level + 1)}
                        </div>);
                })}
        </> : <></>;
    }, [expandedFlow, onConfirm]);

    return (
        <Modal
            open={visible}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleCancel}
            sx={stylesContainerCenter}
        >
            <div className={cx('container')}>
                <div className={cx('group-input')}>
                    <span>{description}</span>
                </div>
                <div className={cx('group-button')}>
                    {renderDepartment(department, 0)}
                </div>
            </div>
        </Modal>
    );
});

export default ModalChoosePosition;
