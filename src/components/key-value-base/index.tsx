import classNames from 'classnames/bind';
import React from 'react';
import styles from './key-value-base.module.scss';

const cx = classNames.bind(styles);

const KeyValueBase = ({ labelLeft, labelRight,
    iconLeft, keyContainerStyle, iconRight, iconLeftStyle,
    iconRightStyle, labelLeftStyle, labelRightStyle, onPress }:
    {
        labelLeft?: string, labelRight?: string
        iconLeft?: any, iconRight?: any, keyContainerStyle?: string, iconLeftStyle?: string,
        onPress?: any, iconRightStyle?: string, labelLeftStyle?: string, labelRightStyle?: string
    }) => {

    return (
        <button className={keyContainerStyle ? keyContainerStyle : cx('container')} onClick={onPress}>
            {iconLeft && <img src={iconLeft} className={iconLeftStyle ? iconLeftStyle : ''} />}
            {labelLeft && <span className={labelLeftStyle ? labelLeftStyle : cx('label-left-view')}>
                {labelLeft}
            </span>}
            {labelRight && <span className={labelRightStyle ? labelRightStyle : cx('label-right-view')}>
                {labelRight}
            </span>}
            {iconRight && <img src={iconLeft} className={iconRightStyle ? iconRightStyle : ''} />}
        </button>

    );
};

export default KeyValueBase;
