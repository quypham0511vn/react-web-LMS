import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './select-modal.module.scss';
import { Button } from 'components/button';
import IcRight from 'assets/icon/ic_right.svg';
import IcDown from 'assets/icon/ic_down.svg';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import { TYPE_INPUT } from 'commons/constants';

const cx = classNames.bind(styles);

export type SelectActions = {
    onShow?: () => any;
    onHide?: () => any;
}

type SelectProps = {
    title?: string;
    labelSearch: string;
    data: any;
    keys: string;
    placeholder: string;
    containerStyles?: string;
    containerStylesInput?: string;
    labelStyles?: string;
    onPress?: (text: string, keys: string) => any;
}

const SelectModal = forwardRef<SelectActions, SelectProps>((
    {
        placeholder,
        labelSearch,
        title,
        onPress,
        data,
        keys,
        containerStyles,
        containerStylesInput,
        labelStyles }: SelectProps, ref) => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [label, setLabel] = useState<string>(labelSearch);
    const refInput = useRef<TextFieldActions>(null);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [dataSelect, setDataSelect] = useState<any>(data);

    useEffect(() => {
        const _data = data;
        if (valueSearch.length > 0) {
            const data_select = _data?.filter(item => item.name.includes(valueSearch) === true);
            setDataSelect(data_select);
        } else {
            setDataSelect(_data);
        }
    }, [data, valueSearch]);

    const onShow = useCallback(() => {
        setIsShow(true);
    }, []);

    const onHide = useCallback(() => {
        setIsShow(false);
    }, []);

    const onChangeTextInput = useCallback((value: string) => {
        setValueSearch(value);
    }, []);

    useImperativeHandle(ref, () => ({
        onHide,
        onShow
    }));

    const renderItem = useMemo(() => {
        return (
            <div className={cx('dropdown')}>
                {dataSelect?.map((item: any, index: number) => {

                    const onChooseStatus = () => {
                        setLabel(item.name);
                        onPress?.(item.name, keys);
                        setIsShow(false);
                    };
                    return (
                        <Button
                            label={item.name}
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
    }, [dataSelect, keys, onPress]);

    return (
        <div className={cx('container')}>
            <span className={cx('title')}>{title}</span>
            {isShow ?
                <MyTextInput
                    ref={refInput}
                    type={TYPE_INPUT.TEXT}
                    inputStyle={containerStylesInput ? `${containerStylesInput},${labelStyles}` : cx('input')}
                    containerInput={cx('container-input')}
                    placeHolder={placeholder}
                    value={label}
                    maxLength={50}
                    onChangeText={onChangeTextInput}
                    rightIcon={IcDown}
                    onClickRightIcon={onHide}
                    styleIconRight={cx('right-icon-input')}
                />
                :
                <Button
                    label={label !== '' ? label : placeholder}
                    containButtonStyles={containerStyles ? `${containerStyles}` : cx('btn')}
                    isLowerCase
                    rightIcon={IcRight}
                    rightIconStyles={cx('right-icon')}
                    labelStyles={label !== '' ? (labelStyles ? `${labelStyles}` : cx('title-input')) : cx('placeholder')}
                    onPress={onShow}
                />
            }
            {isShow && <div className={cx('view-dropdown')}>
                {renderItem}
            </div>}
        </div>
    );
});

export default SelectModal;
