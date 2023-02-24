import Languages from 'commons/languages';
import React, { memo } from 'react';
import styles from './footer.module.scss';

function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerContainerLeft}>
                <div className={styles.textTienNgay}>
                    <span>{`${Languages.common.tienNgayVn}`}</span>
                    <span className={styles.textVn}>{Languages.common.vn}</span>
                </div>

                <div className={styles.textCopyRight}>
                    <span>{`${Languages.footer.copyRight}`}</span>
                </div>
            </div>
            <div className={styles.footerContainerRight}>
                <span className={styles.textErrAccess}>
                    {Languages.footer.contactAccessIfErr}
                </span>
                <span className={styles.textSdtIfErrAccess}>
                    {Languages.common.sdtIfErrAccess}
                </span>
            </div>

        </div>
    );
}

export default memo(Footer);
