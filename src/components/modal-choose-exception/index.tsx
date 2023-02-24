import Modal from '@mui/material/Modal';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { Exception, ExceptionChild } from 'models/contract-expertise-model';
import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import { ExceptionMock } from 'pages/__mocks__/Exception';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styles from './modal-choose-exception.module.scss';
import IcRight from 'assets/icon/ic_right.svg';
import IcDown from 'assets/icon/ic_down.svg';
import { Checkbox, FormControlLabel } from '@mui/material';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const cx = classNames.bind(styles);

const stylesContainerCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

const ModalChooseException = forwardRef<PopupBaseActions, PopupBaseProps>(({ description, onSuccessPress }: PopupBaseProps, ref) => {

    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<Exception[]>(ExceptionMock);
    const expandedFlow = useRef<Exception[]>([]);
    const [choose, setChoose] = useState<string>('');
    const [toggle, setToggle] = useState<boolean>(false);

    const hideModal = () => {
        setVisible(false);
    };

    const showModal = (_data?: Exception[]) => {
        if (_data && _data.length > 0) {
            setData(_data);
            setToggle(last => !last);
        } else {
            setData(ExceptionMock);
        }
        setVisible(true);
    };

    const handleOk = useCallback(() => {
        onSuccessPress?.(data);
        setVisible(false);
    }, [data, onSuccessPress]);


    const handleCancel = () => {
        setVisible(false);
    };

    const renderDepartment = useCallback((item: Exception, level: number) => {
        const hasChild = (item?.child?.length || 0) > 0;

        const onClickItem = () => {
            setChoose(item.id);
            if (!hasChild) {
                setVisible(false);
            } else {
                if (expandedFlow.current.length < 1) expandedFlow.current.push(item);
                else {
                    if (expandedFlow.current.filter(_expandedFlow => _expandedFlow.id === item.id).length > 0) {
                        expandedFlow.current = expandedFlow.current.filter((_expanded) => _expanded.id !== item.id);
                    } else {
                        expandedFlow.current.push(item);
                    }
                }

            }
            setToggle(!toggle);
        };

        const paddingLeft = level * 20;

        return item ? <>
            <Button
                label={item.name}
                key={item.id}
                containButtonStyles={choose === item.id ? cx('container-button-green') : cx('container-button')}
                customStyles={{ 'paddingLeft': paddingLeft }}
                labelStyles={cx('label-btn')}
                isLowerCase
                rightIcon={hasChild && expandedFlow.current.filter(_expandedFlow => _expandedFlow.id === item.id).length > 0 ? IcDown : IcRight}
                rightIconStyles={cx('right-icon')}
                onPress={onClickItem}
            />

            {hasChild && expandedFlow.current.filter(_expandedFlow => _expandedFlow.id === item.id).length > 0 &&
                item?.child?.map((_item: ExceptionChild) => {
                    const onClickCheckbox = () => {
                        setData(last => {
                            const currentState = last.filter(_last => _last.id === item.id)[0].child.filter(_child => _child.id === _item.id)[0].is_select;
                            last.filter(_last => _last.id === item.id)[0].child.filter(_child => _child.id === _item.id)[0].is_select = !currentState;
                            return last;
                        });
                        setToggle(!toggle);
                    };
                    return (
                        <FormControlLabel
                            key={_item.id}
                            label={_item.name}
                            className={cx('check-box')}
                            onClick={onClickCheckbox}
                            control={
                                <Checkbox
                                    checked={_item?.is_select || false}
                                    color='success'
                                    className={cx('form-control')}
                                />
                            }
                        />
                    );
                })}
        </> : <></>;
    }, [choose, expandedFlow, toggle]);

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal
    }));

    const renderViewBody = useMemo(() => {
        return (
            <div className={cx('view-body-container')}>
                {data.map((item: Exception, index: number) => {
                    return (
                        <div key={index} className={cx('department')}>
                            {renderDepartment(item, 0)}
                        </div>
                    );
                })}
            </div>
        );
    }, [data, renderDepartment]);


    return (
        <Modal
            open={visible}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleCancel}
            sx={stylesContainerCenter}
        >
            <div className={cx('container')}>
                <span className={cx('description')}>{description}</span>
                <div className={cx('body')}>
                    {renderViewBody}
                </div>
                <div className={cx('view-bottom')}>
                    <Button
                        label={Languages.common.add}
                        isLowerCase
                        containButtonStyles={cx('button-continue')}
                        labelStyles={cx('label-continue')}
                        onPress={handleOk}
                    />
                    <Button
                        label={Languages.common.cancel}
                        isLowerCase
                        containButtonStyles={cx('button-cancel')}
                        labelStyles={cx('label-cancel')}
                        onPress={handleCancel}
                    />
                </div>
            </div>
        </Modal>
    );
});

export default ModalChooseException;
