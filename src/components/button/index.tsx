import React, { useCallback, useMemo } from 'react';
import { ButtonProps, BUTTON_STYLES } from './types';
import styles from './button.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export const Button = ({
    label,
    isLoading,
    onPress,
    disabled,
    isLowerCase,
    leftIcon,
    tag,
    buttonStyle,
    containButtonStyles,
    customStyles,
    width,
    labelStyles,
    rightIcon,
    rightIconStyles
}: ButtonProps) => {

    const _onPress = useCallback(() => {
        onPress?.(tag || label);
    }, [label, onPress, tag]);

    const containerStyle = useMemo<any>(() => {
        let style: string;

        switch (buttonStyle) {

            case BUTTON_STYLES.RED:
                style = styles.btn_red;
                break;
            case BUTTON_STYLES.BLUE:
                style = styles.btn_blue;
                break;
            case BUTTON_STYLES.GREEN:
                style = styles.btn_green;
                break;
            case BUTTON_STYLES.GRAY:
            default:
                style = styles.btn_gray;
                break;
        }
        return `${style}`;
    }, [buttonStyle]);

    return (
        <button
            disabled={isLoading || disabled}
            className={cx(`${containerStyle} ${containButtonStyles ? containButtonStyles : ''}`)}
            style={{ ...customStyles, width: width + '%' }}
            onClick={_onPress}
        >
            {leftIcon}
            {
                label && <span className={labelStyles ? cx(`${labelStyles}`) : cx('txt-label')}>
                    {isLowerCase ? label : `${label}`.toUpperCase()}
                </span>
            }
            {rightIcon &&
                <img
                    src={rightIcon}
                    className={rightIconStyles ? cx(`${rightIconStyles}`) : cx('icon-right-styles')}
                />}
        </button>
    );
};


