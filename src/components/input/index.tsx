import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from 'react';
import Validate from 'utils/validate';
import styles from './input.module.scss';
import { TextFieldActions, TextFieldProps } from './types';
import parse from 'html-react-parser';
import { TYPE_CAPITALIZE, TYPE_INPUT } from 'commons/constants';
import utils from 'utils/utils';

const cx = classNames.bind(styles);

export const MyTextInput = forwardRef<TextFieldActions, TextFieldProps>(
    (
        {
            label,
            value,
            placeHolder,
            type,
            maxLength,
            disabled,
            containerInput,
            inputStyle,
            styleDisable,
            styleGroup,
            onKeyPress,
            rightIcon,
            onChangeText,
            styleIconRight,
            important,
            onClickRightIcon,
            onRightCallback,
            max,
            min,
            labelRight,
            capitalize,
            spellCheck
        }: TextFieldProps,
        ref?: any
    ) => {
        useImperativeHandle(ref, () => ({
            setValue,
            fillValue,
            getValue,
            focus,
            blur,
            setErrorMsg
        }));
        const [textfieldVal, setTextfieldVal] = useState<any>(`${value}`);
        const [errMsg, setErrMsg] = useState<string>('');
        const [isFocus, setIsFocus] = useState<boolean>(false);
        const orgTextInput = useRef<HTMLInputElement>(null);

        const _onChangeText = useCallback((e?: any) => {
            setErrMsg('');
            if (capitalize === TYPE_CAPITALIZE.SENTENCES) {
                setTextfieldVal?.(utils.capitalizeFirstLetter(e.target?.value));
            } else { setTextfieldVal?.(e.target?.value); }
        }, [capitalize]);

        const getValue = useCallback(() => {
            switch (capitalize) {
                case TYPE_CAPITALIZE.WORDS:
                    return utils.formatForEachWordCase(textfieldVal?.trim()) || '';
                case TYPE_CAPITALIZE.CHARACTERS:
                    return utils.formatUpperCaseCharacter(textfieldVal?.trim()) || '';
                case TYPE_CAPITALIZE.SENTENCES:
                    return utils.capitalizeFirstLetter(textfieldVal?.trim()) || '';
                default:
                    return textfieldVal?.trim() || '';
            }
        }, [capitalize, textfieldVal]);

        const setValue = useCallback((text: any) => {
            if (text) {
                if (capitalize === TYPE_CAPITALIZE.SENTENCES) {
                    setTextfieldVal?.(utils.capitalizeFirstLetter(text));
                } else { setTextfieldVal?.(text); }
                setTextfieldVal?.(text);
            } else {
                setTextfieldVal?.('');
            }
        }, [capitalize]);

        const fillValue = useCallback(
            (text: any) => {
                setValue(text);
            },
            [setValue]
        );

        useEffect(() => {
            if (onChangeText && isFocus) {
                onChangeText(textfieldVal, placeHolder);
            }
        }, [isFocus, placeHolder, textfieldVal, value]);

        useEffect(() => {
            if (!Validate.isEmpty(value)) {
                setValue(value);
            }
        }, [setValue, value]);

        const focus = useCallback(() => {
            if (orgTextInput.current) {
                orgTextInput.current?.focus();
                // if (type === 'date') {
                //     orgTextInput.current?.showPicker();
                // }
            }
            setIsFocus(true);
        }, []);

        const blur = useCallback(() => {
            if (orgTextInput.current) {
                orgTextInput.current?.blur();
            }
            setIsFocus(false);
        }, []);

        const setErrorMsg = useCallback((msg: string) => {
            if (Validate.isStringEmpty(msg)) {
                return setErrMsg('');
            }
            setIsFocus(false);
            setErrMsg(msg);
        }, []);

        const errorMessage = useMemo(() => {
            if (!Validate.isStringEmpty(errMsg)) {
                return (
                    <div className={cx('messageError')}>
                        <span className={cx('text-err')}>{errMsg}</span>
                    </div>
                );
            }
            return null;
        }, [errMsg]);

        const handleClick = useCallback(() => {
            onClickRightIcon?.('');
        }, [onClickRightIcon]);

        const handleOnInput = useCallback((event: any) => {
            let maxNum = 0;
            if (event.target.value.length > maxNum && type === TYPE_INPUT.NUMBER) {
                event.target.value = event.target.value.slice(0, maxLength);
            }
        }, [maxLength, type]);

        return (
            <div className={cx(`${styles.boxGroupInput} ${styleGroup}`)}>
                <div className={cx('label-container')}>
                    {label ? (
                        <label className={cx(styles.label)}>
                            {label}
                            {important && parse(Languages.contract.star)}
                        </label>
                    ) : ('')}
                    {labelRight && (
                        <span className={cx('label-right-text')}>{labelRight}</span>
                    )}
                </div>

                <div className={cx(`${containerInput}`, isFocus ? 'focus-input-container' : (errMsg ? 'error-input-container' : 'select-container'))}>
                    <input
                        ref={orgTextInput}
                        type={type || 'text'}
                        onChange={_onChangeText}
                        placeholder={placeHolder}
                        value={textfieldVal}
                        maxLength={maxLength}
                        disabled={disabled}
                        readOnly={disabled}
                        autoCapitalize={capitalize || 'none'}
                        onFocus={focus}
                        spellCheck={spellCheck || false}
                        onBlur={blur}
                        onKeyUp={onKeyPress}
                        max={max}
                        min={min}
                        onInput={handleOnInput}
                        className={cx(
                            `${inputStyle ? inputStyle : 'input-style'}`, `${!disabled ? '' : 'disable-input-container'}`
                        )}
                        required={!textfieldVal && type === 'date'}
                    />
                    {/* {
                        errMsg && <div className={styles.ic_error}><img src={IcError} alt="ic_error" /></div>
                    }
                    {
                        isIcon ? isFocus && <div className={styles.ic_error}><img src={IcSuccess} alt="ic_success" /></div> : ''
                    } */}
                    {rightIcon && (
                        <img
                            src={rightIcon}
                            className={
                                styleIconRight ? cx(`${styleIconRight}`) : cx('icon-right')
                            }
                            onClick={handleClick}
                        />
                    )}

                </div>
                {errorMessage}
            </div>
        );
    }
);
