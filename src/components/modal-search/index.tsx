import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Languages from 'commons/languages';
import styles from './modal-search.module.scss';
import IcRight from 'assets/icon/ic_right.svg';
import classNames from 'classnames/bind';
import { MyTextInput } from 'components/input';
import { Button } from 'components/button';
import Modal from '@mui/material/Modal';
import { TextFieldActions } from 'components/input/types';
import formValidate from 'utils/form-validate';
import {PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import { TYPE_INPUT } from 'commons/constants';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';

const stylesContainerCenter = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;
const cx = classNames.bind(styles);
interface ModalSearchActions extends PopupBaseActions {
    setValue: (content: string) => any;
}

const arr_status = ['Active', 'New', 'Block'];

const ModalSearch = forwardRef<ModalSearchActions,PopupBaseProps>(({ description, onSuccessPress }: PopupBaseProps, ref) => {

    const [visible, setVisible] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [sdt, setSdt] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const refEmail = useRef<TextFieldActions>();
    const refName = useRef<TextFieldActions>();
    const refSdt = useRef<TextFieldActions>();
    const refPosition = useRef<TextFieldActions>();
    const [isShow, setIsShow] = useState<boolean>(false);

    const hideModal = () => {
        setVisible(false);
    };

    const showModal = () => {
        setVisible(true);
    };

    useImperativeHandle(ref, () => ({
        showModal,
        hideModal,
        setValue
    }));


    const setValue = useCallback((txt: string) => {
        switch (txt) {
            case Languages.userManagement.modal.email:
                return setEmail('');
            case Languages.userManagement.modal.name:
                return setName('');
            case Languages.userManagement.modal.phone:
                return setSdt('');
            case Languages.userManagement.modal.position:
                return setPosition('');
            case Languages.userManagement.modal.status:
                return setStatus(Languages.userManagement.modal.status);
            default:
                return;
        }
    }, []);

    const onChangeStatus = useCallback(() => {
        setIsShow(!isShow);
    }, [isShow]);

    const onValidate = useCallback((_name: string, _phone: string) => {
        const errMsgName = formValidate.userNameSearchValidate(_name);
        const errMsgPhone = formValidate.userPhoneSearchValidate(_phone);

        refName.current?.setErrorMsg(errMsgName);
        refSdt.current?.setErrorMsg(errMsgPhone);
        if (`${errMsgName}${errMsgPhone}`.length === 0) {
            return true;
        }
        return false;
    }, []);

    const handleOk = useCallback(() => {
        const _email = refEmail.current?.getValue();
        const _name = refName.current?.getValue();
        const _phone = refSdt.current?.getValue();
        const _position = refPosition.current?.getValue();

        if (onValidate(_name, _phone)) {
            onSuccessPress?.(_email, _name, _phone, _position, status);
            setVisible(false);
            setEmail(_email);
            setName(_name);
            setSdt(_phone);
            setPosition(_position);
        }

    }, [onSuccessPress, onValidate, status]);

    const handleCancel = () => {
        setVisible(false);
    };

    const renderInput = useCallback((refInput: any, value: string, placeHolder: string, inputStyle: string, containerInput: string, type: any, maxLength: number) => {
        return (
            <MyTextInput
                ref={refInput}
                type={type}
                inputStyle={inputStyle}
                containerInput={containerInput}
                placeHolder={placeHolder}
                value={value}
                maxLength={maxLength}
            />
        );
    }, []);


    const renderItem = useMemo(() => {

        return (
            <div className={cx('dropdown')}>
                {arr_status.map((_status: string, index: number) => {

                    const onChooseStatus = () => {
                        setStatus(_status);
                        setIsShow(false);
                    };
                    return (
                        <Button
                            label={_status}
                            key={index}
                            containButtonStyles={cx('container-button')}
                            labelStyles={cx('label-btn')}
                            isLowerCase
                            onPress={onChooseStatus}
                        />
                    );
                })}
            </div>
        );
    }, []);

    return (
        <Modal
            open={visible}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleCancel}
            sx={stylesContainerCenter}
        >
            {/* <div className={cx('container-modal')} onClick={handleCancel}> */}
            <div className={cx('container')}>
                <span className={cx('description')}>{description}</span>
                <div className={cx('body')}>
                    <div className={cx('group-input')}>
                        <span className={cx('title-input')}>{Languages.userManagement.modal.email}</span>
                        {renderInput(refEmail, email, Languages.userManagement.modal.inputEmail, cx('contain-input'), cx('container-input'), TYPE_INPUT.TEXT, 50)}
                    </div>
                    <div className={cx('group-input')}>
                        <span className={cx('title-input')}>{Languages.userManagement.modal.name}</span>
                        {renderInput(refName, name, Languages.userManagement.modal.inputName, cx('contain-input'), cx('container-input'), TYPE_INPUT.TEXT, 50)}
                    </div>
                    <div className={cx('group-input')}>
                        <span className={cx('title-input')}>{Languages.userManagement.modal.phone}</span>
                        {renderInput(refSdt, sdt, Languages.userManagement.modal.inputSdt, cx('contain-input'), cx('container-input'), TYPE_INPUT.TEL, 10)}
                    </div>
                    <div className={cx('group-input')}>
                        <span className={cx('title-input')}>{Languages.userManagement.modal.status}</span>
                        <Button
                            label={status !== '' ? status : Languages.userManagement.modal.status}
                            containButtonStyles={cx('btn-status')}
                            isLowerCase
                            rightIcon={IcRight}
                            labelStyles={cx('title-input')}
                            onPress={onChangeStatus}
                        />
                        {isShow && <div className={cx('view-dropdown')}>
                            {renderItem}
                        </div>}
                    </div>
                    <div className={cx('group-input')}>
                        <span className={cx('title-input')}>{Languages.userManagement.modal.position}</span>
                        {renderInput(refPosition, position, Languages.userManagement.modal.inputPosition, cx('contain-input'), cx('container-input'), TYPE_INPUT.TEXT, 50)}
                    </div>
                    <div className={cx('view-bottom')}>
                        <Button
                            label={Languages.common.continue}
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
            </div>
            {/* </div> */}
        </Modal>
    );
});

export default ModalSearch;
