import React, { useMemo , useState} from 'react';
import classNames from 'classnames/bind';
import styles from './contract-detail.module.scss';
import { observer } from 'mobx-react';
import Languages from 'commons/languages';
import DirectoryPath from 'components/directory-path';
import { Button } from 'components/button';
import IcLicense from 'assets/icon/ic_license.svg';
import StepsContractDetail from './steps-contract-detail';
import StepsLoanRecoveryDetail from './steps-loan-recovery-detail';
import StepsSeeLicense from './steps-see-license';


const cx = classNames.bind(styles);
const tabs = [Languages.contract.contractDetail, Languages.contract.loanRecoveryDetails, Languages.contract.seeLicense];
// {id: 1, name: 2} => item =
const ContractDetail = observer(() => { 
    const [labelTabs, setLabelTabs] = useState<string>(Languages.contract.contractDetail);

    const renderTab = useMemo(()=>{
      
        return (
            <div className={cx('button')}>   
                {tabs.map((label) => {

                    const handleChange = () => {
                        setLabelTabs(label);
                    };

                    return(
                        <Button
                            label={label}
                            onPress={handleChange}     
                            key={label}
                            labelStyles={label === labelTabs ?  cx('style-label-focus') : cx('style-label')}
                            containButtonStyles={label === labelTabs ? cx('style-container-focus') : cx('style-container')}
                            isLowerCase
                        />
                    );

                })} 
            </div>         
        );
    }, [labelTabs]);

    const renderViewTop = useMemo(() => {
        return (
            <div className={cx('container-top')}>
                <div className={cx('container-top-left')}>
                    <span className={cx('title')}>{Languages.contract.contractDetail}</span>
                    <DirectoryPath labelStyles={cx('label-path')} />
                </div>
                <Button
                    label={Languages.contract.seeLicense}
                    isLowerCase
                    containButtonStyles={cx('container-btn-add')}
                    labelStyles={cx('label-btn-add')}
                    rightIcon={IcLicense}
                    rightIconStyles={cx('icon-right-btn')}
                />
            </div>
        );
    }, []);

    const renderViewStep = useMemo(() => {
        switch(labelTabs) {
            case tabs[0]:
                return <StepsContractDetail/>;
            case tabs[1]:
                return <StepsLoanRecoveryDetail/>;
            case tabs[2]:
                return <StepsSeeLicense/>;
            default:
                return;
        }
    }, [labelTabs]);

    return (
        <div className={cx('container')}>
            {renderViewTop}
            {renderTab} 
            {renderViewStep}
        </div>
    );
});

export default ContractDetail;
