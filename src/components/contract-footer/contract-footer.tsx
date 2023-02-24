import IcBack from 'assets/icon/ic_circle.svg';
import IcSave from 'assets/icon/ic_docs.svg';
import IcTick from 'assets/icon/ic_white_tick_contract.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import React, { useCallback } from 'react';
import styles from './contract-footer.module.scss';

import IcContinous from 'assets/icon/ic_white_continous_contract.svg';

const cx = classNames.bind(styles);

const ContractFooter = ({ onContinue, onBack, onSave, footerContainer, isFinishStep }: {
    onContinue?: () => any, onBack?: () => any, onSave?: () => any, footerContainer?: string, isFinishStep?: boolean
}) => {
    const renderButton = useCallback((title: string, onCallBack: any, labelStyle?: string, btnContainer?: string, iconRight?: any) => {
        return (
            <Button onPress={onCallBack}
                label={title}
                labelStyles={cx(labelStyle)}
                isLowerCase
                rightIcon={iconRight}
                containButtonStyles={cx(btnContainer)} />
        );
    }, []);

    return (
        <div className={footerContainer ? footerContainer : cx('root-container')}>
            <div className={cx('left-container')}>
                {renderButton(Languages.contract.save, onSave, 'save-text', 'save-wrap', IcSave)}
                {!!onBack && renderButton(Languages.contract.back, onBack, 'back-text', 'back-wrap', IcBack)}
            </div>
            <div className={cx('right-container')}>
                {renderButton(isFinishStep ? Languages.contract.createContract : Languages.common.continue, onContinue, 'continous-text', 'continous-wrap', isFinishStep ? IcTick : IcContinous)}
            </div>
        </div>
    );
};

export default ContractFooter;
