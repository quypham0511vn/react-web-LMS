import React from 'react';
import Pagination from '@mui/material/Pagination';
import { PaginationProps } from './types';
import classNames from 'classnames/bind';
import styles from './pagination-rounded.module.scss';
import Languages from 'commons/languages';

const cx = classNames.bind(styles);

const PaginationRounded = ({
    count,
    page,
    onPress,
    containerStyle
}: PaginationProps) => {

    return (
        <div className={cx(`${cx('container')} ${containerStyle ? containerStyle : ''}`)}>
            <span>{Languages.userManagement.paginationStart}{' '}{count}{' '}{Languages.userManagement.paginationEnd} </span>
            <Pagination
                count={count}
                page={page}
                showFirstButton={true}
                showLastButton={true}
                shape="rounded"
                variant="outlined"
                onChange={onPress}
                className={cx('pagination')}
            />
        </div>
    );
};

export default PaginationRounded;
