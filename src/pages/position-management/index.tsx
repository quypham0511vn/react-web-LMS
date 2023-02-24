import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IcAdd from 'assets/icon/ic_add.svg';
import IcUpdate from 'assets/icon/ic_edit.svg';
import classNames from 'classnames/bind';
import { PAGE_SIZE } from 'commons/configs';
import { UserManagementStatus, UserStatus } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import DirectoryPath from 'components/directory-path';
import PaginationRounded from 'components/pagination-rounded';
import RightsGroupComponent, { RightsGroupActions } from 'components/rights-group';
import { useAppStore } from 'hooks';
import { PermissionGroupModel } from 'models/permission-group-model';
import { PositionModel } from 'models/position-model';
import { positionsMock } from 'pages/__mocks__/Positions';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './position-management.module.scss';

const cx = classNames.bind(styles);

export type UserPosition = {
    id: string;
    name: string;
    depict: string;
    status: string;
};

function mockUserPosition() {

    let _userPosition: UserPosition[] = [];

    for (let index = 0; index < 50; index++) {
        _userPosition.push({
            id: `${index}`,
            name: 'Dung',
            depict: 'Chức năng xem hợp đồng',
            status: Object.values(UserStatus)[Math.floor(Math.random() * Object.values(UserStatus).length)]
        });
    }

    return _userPosition;
}

const PositionManagement = () => {
    const { commonManager } = useAppStore();
    const [userPosition, setUserPosition] = useState<UserPosition[]>([]);
    const [position, setPosition] = useState<PositionModel>(positionsMock);
    const [permissionGroup, setPermissionGroup] = useState<PermissionGroupModel>();
    const [pages, setPage] = useState<number>(1);

    const positionRef = useRef<RightsGroupActions>(null);
    const navigate = useNavigate();

    const PAGES_COUNT = Math.ceil(userPosition?.length / PAGE_SIZE);

    useEffect(() => {
        setUserPosition(mockUserPosition());
    }, [commonManager.pathGroups]);

    const onAddPosition = useCallback(() => {
        navigate('/createPosition', { state: { status: UserManagementStatus.CREATE } });
    }, [navigate]);

    const onNavigateEdit = useCallback(() => {
        navigate('/createPosition', { state: { status: UserManagementStatus.EDIT, data: { permissionGroup: permissionGroup, position: position } } });
    }, [navigate, permissionGroup, position]);

    const renderViewTop = useMemo(() => {
        return (
            <div className={cx('view-top')}>
                <div className={cx('view-top-left')}>
                    <span className={cx('txt-management')}>{Languages.positionManagement.positionManagement}</span>
                    <div className={cx('txt-address')}>
                        <DirectoryPath />
                    </div>
                </div>
                <Button
                    containButtonStyles={cx('btn-news-position')}
                    onPress={onAddPosition}
                    label={Languages.positionManagement.createPosition}
                    labelStyles={cx('label-btn-create')}
                    rightIcon={IcAdd}
                    isLowerCase
                />
            </div>
        );
    }, [onAddPosition]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };

    const renderViewTable = useMemo(() => {

        return (
            <TableContainer component={Paper} className={cx('table-container')} >
                <Table aria-label="simple table" className={cx('table')}>
                    <TableHead className={cx('table-head')}>
                        <TableRow
                            className={cx('table-row')}
                        >
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.userManagement.table.stt}</TableCell>
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.positionManagement.nameDecentralized}</TableCell>
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.positionManagement.depict}</TableCell>
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.positionManagement.status}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        className={cx('table-body')}
                    >
                        {userPosition
                            .slice((pages - 1) * PAGE_SIZE, (pages - 1) * PAGE_SIZE + PAGE_SIZE)
                            .map((row: UserPosition, index: number) => {
                                return (
                                    <TableRow
                                        key={index}
                                        className={index % 2 === 0 ? cx('table-body-row-white') : cx('table-body-row-gray')}
                                    >
                                        <TableCell align="center" className={cx('text-table')}>{(pages - 1) * PAGE_SIZE + index + 1}</TableCell>
                                        <TableCell align="center" className={cx('text-table')}>{row.name}</TableCell>
                                        <TableCell align="center" className={cx('text-table')}>{row.depict}</TableCell>
                                        <TableCell
                                            align="center"
                                            className={row?.status === UserStatus.ACTIVE ? cx('status-active') : row?.status === UserStatus.BLOCK ? cx('status-block') : cx('status-new')}
                                        >
                                            <div className={cx('view-status')}>
                                                {row.status}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }, [pages, userPosition]);

    const onChoosePosition = useCallback((_position: PositionModel, _permission: PermissionGroupModel) => {
        setPosition(_position);
        setPermissionGroup(_permission);
    }, []);

    return (
        <div className={cx('container')}>
            {renderViewTop}
            <div className={cx('view-body')}>
                <RightsGroupComponent onPress={onChoosePosition} dataGroups={positionsMock} ref={positionRef} />
                <div className={cx('view-body-right')}>

                    <div className={cx('view-body-right-group')}>
                        <span className={cx('txt-group-table')}>{Languages.positionManagement.decentralizedManagement}</span>
                        <Button
                            containButtonStyles={cx('view-body-right-button')}
                            label={Languages.positionManagement.updatePosition}
                            labelStyles={cx('button-group-right')}
                            rightIcon={IcUpdate}
                            isLowerCase
                            rightIconStyles={cx('icon-right-update')}
                            onPress={onNavigateEdit}
                        />
                    </div>
                    {renderViewTable}
                    <PaginationRounded
                        count={PAGES_COUNT}
                        page={pages}
                        onPress={handleChangePage}
                        containerStyle={cx('pagination-contain')}
                    />
                </div>
            </div>
        </div>
    );
};

export default PositionManagement;
