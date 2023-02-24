import classNames from 'classnames/bind';
import { ItemPropsModel } from 'models/item-props-model';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styles from './check-box-select.module.scss';
import Validate from 'utils/validate';

export type CheckBoxProps = {
    title?: string,
    data: ItemPropsModel[],
    groupCheckBoxContainer?: any,
    groupInputContainer?: any,
    titleCheckBoxStyle?: any,
    onChangeText?: (event?: any) => any;
    titleContainer?: any;
};

export type CheckBoxAction = {
    getValue?: (text?: string | number) => void,
    setValue?: (text?: string) => void,
    setErrorMsg?: (text?: string) => void,
    clearValue?: () => void
};

const cx = classNames.bind(styles);

const CheckBoxSelect = forwardRef<CheckBoxAction, CheckBoxProps>(({ title, data, onChangeText, groupCheckBoxContainer, groupInputContainer, titleCheckBoxStyle, titleContainer }: CheckBoxProps, ref: any) => {
    const [arraySelect, setArraySelect] = useState<Array<string>>([]);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const orgTextInput = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');
    const [dataArray, setDataArray] = useState<ItemPropsModel[]>(data);

    // useEffect(() => {
    //     if (onChangeText && isFocus) {
    //         onChangeText?.(selectedInput, item?.ti);
    //     }
    // }, [isFocus, selectedInput]);

    const focus = useCallback(() => {
        if (orgTextInput.current) {
            orgTextInput.current?.focus();
        }
        setIsFocus(true);
    }, []);

    const clearValue = useCallback(() => {
        dataArray.forEach((item: ItemPropsModel)=>{item.status= false;});
    }, [dataArray]);

    useImperativeHandle(ref, () => ({
        getValue,
        setErrorMsg,
        clearValue
    }));

    const getValue = useCallback(() => {
        return arraySelect;
    }, [arraySelect]);

    const setErrorMsg = useCallback((msg: string) => {
        if (Validate.isStringEmpty(msg)) {
            return;
        }
        setIsFocus(false);
        setErrMsg(msg);
    }, []);

    const errorMessage = useMemo(() => {
        if (!Validate.isStringEmpty(errMsg)) {
            return (
                <div className={cx('message-error')}>
                    <span className={cx('text-err')}>{errMsg}</span>
                </div>
            );
        }
        return null;
    }, [errMsg]);

    const renderItemCheckbox = useCallback((item: ItemPropsModel, index: number) => {
        const onChange = (e: any) => {
            const arrayValue = new Array<string>;
            setErrMsg('');
            onChangeText?.(e);
            const itemData = { ...dataArray?.[index], status: e.target?.checked };
            if (dataArray?.[index]?.status !== itemData?.status) {
                const newData = dataArray?.splice(index, 1, itemData);
            }
            const result = dataArray?.filter((itemObj: ItemPropsModel) => itemObj?.status === true);
            result?.forEach(element => {
                arrayValue.push(`${element?.value}`);
            });
            setArraySelect(arrayValue);
            console.log(arrayValue);
        };
        return (
            <div className={groupInputContainer ? groupInputContainer : cx(index === dataArray?.length - 1 ? 'last-group-input-container' : 'group-input-container')} key={index}>
                <div className={cx('container')}>
                    <input
                        type="checkbox"
                        id={item?.value}
                        value={item?.value}
                        onFocus={focus}
                        onChange={onChange}
                        checked={item?.status}
                    />

                    <label htmlFor={item?.value} className={cx('check-mark')}></label>
                </div>
                <span className={titleCheckBoxStyle ? titleCheckBoxStyle : cx('title-check-box')}>{item?.title}</span>
            </div>
        );
    }, [dataArray, focus, groupInputContainer, onChangeText, titleCheckBoxStyle]);

    return (
        <div className={groupCheckBoxContainer ? groupCheckBoxContainer : cx('group-check-box-container')}>
            <span className={titleContainer ? titleContainer : cx('title-container')}>{title}</span>
            {
                dataArray?.map((item: ItemPropsModel, index: number) => {
                    return (
                        <div key={index}>
                            {renderItemCheckbox(item, index)}
                        </div>
                    );
                })
            }
            {errorMessage}
        </div>
    );
});

export default CheckBoxSelect;
