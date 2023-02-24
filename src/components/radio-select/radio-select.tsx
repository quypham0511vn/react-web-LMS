import classNames from 'classnames/bind';
import { ItemPropsModel } from 'models/item-props-model';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styles from './radio-select.module.scss';
import Validate from 'utils/validate';

export type RadioProps = {
    title?: string,
    data?: ItemPropsModel[],
    defaultValue?: any,
    groupRadioContainer?: any,
    groupItemRadioContainer?: any,
    groupInputContainer?: any,
    titleRadioStyle?: any,
    onChangeText?: any,
    hasStar?: boolean,
};

export type RadioAction = {
    getValue?: (text?: string | number) => void,
    setValue?: (text?: string) => void,
    setErrorMsg?: (text?: string) => void
};

const cx = classNames.bind(styles);

const RadioSelect = forwardRef<RadioAction, RadioProps>(({ 
    data, 
    onChangeText, 
    defaultValue, 
    groupRadioContainer,
    groupItemRadioContainer,
    groupInputContainer, 
    titleRadioStyle ,
    title,
    hasStar
}: RadioProps, ref: any) => {

    const [selectedInput, setSelectedInput] = useState<string>(defaultValue);
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const orgTextInput = useRef<HTMLInputElement>(null);
    const [errMsg, setErrMsg] = useState<string>('');

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

    useImperativeHandle(ref, () => ({
        getValue,
        setValue,
        setErrorMsg
    }));

    const getValue = useCallback(() => {
        return selectedInput?.trim() || '';
    }, [selectedInput]);

    const setValue = useCallback((text: any) => {
        if (text) {
            setSelectedInput?.(text);
        } else {
            setSelectedInput?.('');
        }
    }, []);

    const onChange = useCallback((e?: any) => {
        onChangeText?.(e);
        const { id } = e.currentTarget;
        setSelectedInput(id);
        
    }, [onChangeText]);
    

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

    return (
        <div className={groupRadioContainer ? groupRadioContainer : cx('group-radio-container')}>
            {title && <label className={cx('label-radio-group')}>
                {title}
                {hasStar &&  <span className={cx('star')}>{'*'}</span>}
            </label>}
            <div className={groupItemRadioContainer ? groupItemRadioContainer : cx('group-item-radio-container')}>
                {
                    data?.map((item: ItemPropsModel, index: number) => {
                        return (
                            <div className={groupInputContainer ? groupInputContainer : cx(title?'group-input-container-has-title' : 'group-input-container')} key={index}>
                                <div className={cx('container')}>
                                    <input
                                        type="radio"
                                        id={item?.value}
                                        value={item?.value}
                                        checked={selectedInput === item?.value}
                                        onFocus={focus}
                                        onChange={onChange} />
                                    <label htmlFor={item?.value} className={cx('check-mark')}></label>
                                </div>
                                <span className={titleRadioStyle ? titleRadioStyle : cx('title-radio')}>{item?.title}</span>
                            </div>
                        );
                    })
                }
            </div>
            {errorMessage}
        </div>
    );
});

export default RadioSelect;
