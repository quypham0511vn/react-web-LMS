import Modal from '@mui/material/Modal';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { PopupBaseActions,PopupBaseProps } from 'models/modal-model';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import styles from './dialog-telegram.module.scss';
// import formValidate from 'utils/form-validate';

const cx = classNames.bind(styles);

const ModalTelegram = forwardRef<PopupBaseActions, PopupBaseProps>(
    ({ description, onSuccessPress }: PopupBaseProps, ref) => {
        const [visible, setVisible] = useState(false);
        const refEmail = useRef<TextFieldActions>();
        const refName = useRef<TextFieldActions>();
        const refSdt = useRef<TextFieldActions>();
        const refPosition = useRef<TextFieldActions>();

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
            // const _email = refEmail.current?.getValue();
            // const _name = refName.current?.getValue();
            // const _phone = refSdt.current?.getValue();
            // const _position = refPosition.current?.getValue();
            onSuccessPress?.();
            setVisible(false);
        }, []);

        const onCancel = () => {
            setVisible(false);
        };

        const renderInput = useCallback(
            (
                refInput: any,
                value: string,
                placeHolder: string,
                inputStyle: string,
                type: any,
                maxLength: number
            ) => {
                return (
                    <MyTextInput
                        ref={refInput}
                        type={type}
                        inputStyle={inputStyle}
                        placeHolder={placeHolder}
                        value={value}
                        maxLength={maxLength}
                    />
                );
            },
            []
        );
        return (
            <>
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
            </>
        );
    }
);

export default ModalTelegram;
