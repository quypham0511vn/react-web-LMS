import Modal from '@mui/material/Modal';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import React, {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState
} from 'react';
import styles from './dialog-telephone.module.scss';
import { telephoneData } from 'pages/__mocks__/TestApiProductUnivest';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { PopupBaseActions, PopupBaseProps } from 'models/modal-model';
import IcCancel from 'assets/icon/ic_red_cancel_input_phone.svg';
import { SxProps } from '@mui/system/styleFunctionSx/styleFunctionSx';
import { ItemPropsModel } from 'models/item-props-model';

const cx = classNames.bind(styles);
interface ModalTelephoneProps extends PopupBaseProps {
    value?: string;
    onHistoryCall?: any;
}

const MAX_LENGTH = 10;

const dialogCenterContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
} as SxProps;

const ModalTelephone = forwardRef<PopupBaseActions, ModalTelephoneProps>(
    ({ onSuccessPress, value, onHistoryCall }: ModalTelephoneProps, ref) => {
        const [visible, setVisible] = useState<boolean>(false);
        const refInput = useRef<TextFieldActions>(null);

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
            refInput.current?.setValue('');
            onSuccessPress?.();
            setVisible(false);
        }, [onSuccessPress]);

        const onBackDrop = () => {
            setVisible(false);
            refInput.current?.setValue('');
        };

        const onCancel = useCallback(() => {
            const currentValue = refInput.current?.getValue();
            const newValue = currentValue.slice(0, currentValue.length - 1) || '';
            refInput.current?.setValue(newValue);
        }, []);

        const onHistoryCalling = useCallback(() => {
            onHistoryCall?.();
            hideModal();
        }, [onHistoryCall]);

        const renderInput = useCallback(
            (
                refs: any,
                _value: string,
                placeHolder: string,
                inputStyle: string,
                type: any,
                maxLength: number
            ) => {
                return (
                    <MyTextInput
                        ref={refs}
                        type={type}
                        inputStyle={cx(inputStyle)}
                        placeHolder={placeHolder}
                        value={_value}
                        maxLength={maxLength}
                    />
                );
            },
            []
        );

        const onClickItemButtonPhone = useCallback((_item: string) => {
            const currentValue = refInput.current?.getValue();
            let newValue = '';
            if (currentValue.length === MAX_LENGTH) {
                newValue = `${currentValue}`;
            } else newValue = `${currentValue}${_item}`;

            refInput.current?.setValue(newValue);
        }, []);

        const renderItemPhone = useCallback((_item: string) => {
            const onClick = () => {
                onClickItemButtonPhone(_item);
            };
            return (
                <button className={cx('form-item')} onClick={onClick}>
                    <span className={cx('label-item-phone')}>
                        {_item}
                    </span>
                </button>
            );
        }, [onClickItemButtonPhone]);

        const renderInputPhone = useCallback((_item: ItemPropsModel[]) => {

            return (
                <Grid container spacing={3}>
                    {_item?.map((itemPhone: ItemPropsModel, index: number) => {
                        return (
                            <Grid item md={4} key={index}>
                                {renderItemPhone(itemPhone?.title)}
                            </Grid>
                        );
                    })}
                </Grid>
            );
        }, [renderItemPhone]);

        return (
            <Modal
                open={visible}
                onClose={onBackDrop}
                sx={dialogCenterContainer}
            >
                <>
                    <div className={cx('container')}>
                        <div className={cx('group-input')}>
                            {renderInput(
                                refInput,
                                value || '',
                                Languages.common.phoneNumber,
                                'inputItem',
                                'tel',
                                MAX_LENGTH
                            )}
                        </div>
                        <Box sx={{ width: '70%', alignSelf: 'center' }}>
                            {renderInputPhone(telephoneData)}
                        </Box>
                        <div className={cx('view-bottom')}>
                            <Button
                                label={Languages.common.callPhone}
                                isLowerCase
                                containButtonStyles={cx('button-continue')}
                                labelStyles={cx('label-continue')}
                                onPress={onOk}
                            />
                            <Button
                                isLowerCase
                                containButtonStyles={cx('button-cancel')}
                                labelStyles={cx('label-cancel')}
                                onPress={onCancel}
                                rightIcon={IcCancel}
                                rightIconStyles={cx('icon-cancel-style')}
                            />
                        </div>
                        <button className={cx('view-history-call-wrap')} onClick={onHistoryCalling}>
                            {Languages.common.historyCall}
                        </button>
                    </div>
                </>
            </Modal>
        );
    }
);

export default ModalTelephone;
