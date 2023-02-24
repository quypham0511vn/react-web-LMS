import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IcAdd from 'assets/icon/ic_add.svg';
import IcDelete from 'assets/icon/ic_delete.svg';
import IcDetail from 'assets/icon/ic_detail.svg';
import IcRight from 'assets/icon/ic_right.svg';
import IcSearch from 'assets/icon/ic_search.svg';
import classNames from 'classnames/bind';
import { PAGE_SIZE } from 'commons/configs';
import { UserManagementStatus, UserStatus } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import DirectoryPath from 'components/directory-path';
import ModalSearch from 'components/modal-search';
import PaginationRounded from 'components/pagination-rounded';
import RightsGroupComponent, { RightsGroupActions } from 'components/rights-group';
import { useAppStore } from 'hooks';
import sessionManager from 'managers/session-manager';
import { toJS } from 'mobx';
import { AgentGroupModel, AgentModel } from 'models/agent-model';
import { PermissionGroupModel } from 'models/permission-group-model';
import { PositionModel } from 'models/position-model';
import { UserInfoModel } from 'models/user-model';
import { permissionGroupsMock } from 'pages/__mocks__/PermissionGroups';
import { positionsMock } from 'pages/__mocks__/Positions';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './user-management.module.scss';

const cx = classNames.bind(styles);

export type dataTable = {
    stt: number,
    email: string,
    name: string,
    phone: string,
    date: string,
    status: string,
    position: string
}

function mockUsers() {
    const mockPosition: PositionModel = {
        id: 'asm_1',
        name: 'ASM',
        type: 3
    };

    let _users: UserInfoModel[] = [];

    for (let index = 0; index < 50; index++) {
        _users.push({
            id: `${index}`,
            email: 'Duyadbx@tienngay.vn',
            name: 'Duádasdasy',
            phone: '0862319100',
            cmt: '071053275',
            updated_at: '08-08-2021',
            status: Object.values(UserStatus)[Math.floor(Math.random() * Object.values(UserStatus).length)],
            avatar: 'https://ci4.googleusercontent.com/proxy/73xT76DOVwgBOIRERRm7_gIWOIKHrqtjOGz20WCGSl3qGms40y9n9N6NgKOSXfm3oY4cpN6zO5_jjgKuJ3RKaFOLu56RsSTLhHSXAFRfaT7uR-mvIYzEJQTYi7mVlykGa36IZ2i7whXSyrsm2g=s0-d-e1-ft#https://service.tienngay.vn/uploads/avatar/1645690960-c015e46b3dd17f6a9f03b449ed4f9257.jpg',
            position: mockPosition
        });
    }

    return _users;
}

function mockUsersTPGD() {
    const mockPosition: PositionModel = {
        id: 'kd_1',
        name: 'Trưởng phòng giao dịch',
        type: 2
    };

    const mockAgent: AgentModel[] = [{
        id: '1',
        name: '901 giải phóng',
        type: 1,
        address: '901 giải phóng, Hà Nội'
    }];

    const mockAgentGroup: AgentGroupModel = {
        type: 2,
        agent: mockAgent
    };

    let _users: UserInfoModel[] = [];

    for (let index = 0; index < 50; index++) {
        _users.push({
            id: `${index}`,
            email: 'Dung@tienngay.vn',
            name: 'Dung',
            phone: '08622564545',
            cmt: '02455752',
            updated_at: '01-01-2021',
            status: Object.values(UserStatus)[Math.floor(Math.random() * Object.values(UserStatus).length)],
            avatar: 'https://ci4.googleusercontent.com/proxy/73xT76DOVwgBOIRERRm7_gIWOIKHrqtjOGz20WCGSl3qGms40y9n9N6NgKOSXfm3oY4cpN6zO5_jjgKuJ3RKaFOLu56RsSTLhHSXAFRfaT7uR-mvIYzEJQTYi7mVlykGa36IZ2i7whXSyrsm2g=s0-d-e1-ft#https://service.tienngay.vn/uploads/avatar/1645690960-c015e46b3dd17f6a9f03b449ed4f9257.jpg',
            position: mockPosition,
            agent_group: mockAgentGroup
        });
    }

    return _users;
}

export type ExpandedFlow = {
    id: string;
    level: number;
    name: string;
    path?: string;
}

const UserManagement = () => {
    const navigate = useNavigate();
    const { commonManager } = useAppStore();
    const [pathGroups, setPathGroups] = useState<ExpandedFlow[]>();
    const [pages, setPage] = useState<number>(1);
    const [users, setUsers] = useState<UserInfoModel[]>([]);

    const refModalSearch = useRef<any>(null);
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [position, setPosition] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [expandedFlow, setExpandedFlow] = useState<string[]>([positionsMock.id]); // track user expand flow
    const [permGroups, setPermGroups] = useState<PermissionGroupModel[]>([]);

    const isAdditionPermGroupRef = useRef<boolean>(false);
    const positionRef = useRef<RightsGroupActions>(null);
    const PAGES_COUNT = Math.ceil(users?.length / PAGE_SIZE);

    useEffect(() => {
        setPathGroups(toJS(commonManager.pathGroups?.children));
        setUsers(mockUsers());
    }, [commonManager.pathGroups]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };

    const handleSearch = useCallback(() => {
        refModalSearch?.current?.showModal();
    }, []);

    const onNavigateCreate = useCallback(() => {
        const _pathGroups = pathGroups;
        if (_pathGroups?.filter(_path => _path.id === 'create').length === 0) {
            _pathGroups.push({ id: 'create', name: 'Tạo User', path: '/createUser', level: _pathGroups[_pathGroups.length - 1].level + 1 });
        }
        console.log('_pathGroups==', _pathGroups);
        const _path = { children: _pathGroups || [] };
        if (_path && _path.children && commonManager.pathGroupStack) {
            sessionManager.setPathGroups(_path);
            commonManager.setPathGroups(_path);
            commonManager.setPathGroupStack([...commonManager.pathGroupStack, _path]);
            sessionManager.setPathGroupStack([...commonManager.pathGroupStack, _path]);
        } else {
            commonManager.setPathGroupStack([_path]);
            sessionManager.setPathGroupStack([_path]);
        }
        navigate('/createUser', { state: { data: [], status: UserManagementStatus.CREATE } });
    }, [commonManager, navigate, pathGroups]);

    const renderViewTop = useMemo(() => {
        return (
            <div className={cx('view-top')}>
                <div className={cx('view-top-left')}>
                    <span className={cx('txt-management')}>{Languages.userManagement.userManagement}</span>
                    <div className={cx('txt-address')}>
                        <DirectoryPath />
                    </div>
                </div>
                <Button
                    containButtonStyles={cx('btn-news-user')}
                    onPress={onNavigateCreate}
                    label={Languages.userManagement.createUser}
                    labelStyles={cx('label-btn-create')}
                    rightIcon={IcAdd}
                    isLowerCase
                />
            </div>
        );
    }, [onNavigateCreate]);

    const onPositionPicked = useCallback(({ data, isAdditionPermGroup }: { data: PositionModel, isAdditionPermGroup: boolean }) => {
        const relevantPermGroup = permissionGroupsMock.find(item => item.id === data.id);

        if (isAdditionPermGroup) {
            if (relevantPermGroup && !permGroups.find(item => item.id === relevantPermGroup.id)) {
                setPermGroups(last => [...last, relevantPermGroup]);
            }
        } else {
            setPermGroups(relevantPermGroup ? [relevantPermGroup] : []);
        }
    }, [permGroups]);

    const renderDepartment = useCallback((positionItem: PositionModel, level: number) => {
        const hasChild = (positionItem?.children?.length || 0) > 0;

        const onClickItem = () => {
            if (!hasChild) {
                onPositionPicked({ data: positionItem, isAdditionPermGroup: isAdditionPermGroupRef.current });
            } else {
                if (expandedFlow.includes(positionItem.id)) {
                    setExpandedFlow(last => last.slice(0, last.indexOf(positionItem.id)));
                } else {
                    setExpandedFlow(last => [...last, positionItem.id]);
                }
            }

            if (!positionItem?.children || positionItem?.children === undefined) {
                setUsers(mockUsersTPGD());
            }
        };

        const paddingLeft = level * 20; // padding for each level

        return positionItem ? <>
            <Button
                label={positionItem.name}
                key={positionItem.id}
                containButtonStyles={cx('container-button')}
                customStyles={{ 'paddingLeft': paddingLeft }}
                labelStyles={cx('label-btn')}
                isLowerCase
                rightIcon={hasChild && IcRight}
                rightIconStyles={cx('right-icon')}
                onPress={onClickItem}
            />
            {hasChild && expandedFlow.includes(positionItem.id) &&
                positionItem?.children?.map(item => renderDepartment(item, level + 1))}
        </> : <></>;
    }, [expandedFlow, onPositionPicked]);

    const renderViewTable = useMemo(() => {

        return (
            <TableContainer component={Paper} className={cx('table-container')} >
                <Table aria-label="simple table" className={cx('table')}>
                    <TableHead className={cx('table-head')}>
                        <TableRow
                            className={cx('table-row')}
                        >
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.userManagement.table.stt}</TableCell>
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.userManagement.table.email}</TableCell>
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.userManagement.table.name}</TableCell>
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.userManagement.table.sdt}</TableCell>
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.userManagement.table.date}</TableCell>
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.userManagement.table.status}</TableCell>
                            <TableCell align="center" className={cx('txt-tableCell')}>{Languages.userManagement.table.position}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        className={cx('table-body')}
                    >
                        {users
                            .slice((pages - 1) * PAGE_SIZE, (pages - 1) * PAGE_SIZE + PAGE_SIZE)
                            .map((row: UserInfoModel, index: number) => {

                                const onNavigate = () => {
                                    const _pathGroups = pathGroups;
                                    if (_pathGroups?.filter(_path => _path.id === 'create').length === 0) {
                                        _pathGroups.push({ id: 'create', name: 'Detail', path: '/createUser', level: _pathGroups[_pathGroups.length - 1].level + 1 });
                                    }
                                    const _path = { children: _pathGroups || [] };
                                    if (_path && _path.children && commonManager.pathGroupStack) {
                                        sessionManager.setPathGroups(_path);
                                        commonManager.setPathGroups(_path);
                                        commonManager.setPathGroupStack([...commonManager.pathGroupStack, _path]);
                                        sessionManager.setPathGroupStack([...commonManager.pathGroupStack, _path]);
                                    } else {
                                        commonManager.setPathGroupStack([_path]);
                                        sessionManager.setPathGroupStack([_path]);
                                    }
                                    navigate('/createUser', { state: { data: row, status: UserManagementStatus.DETAIL } });
                                };

                                return (
                                    <TableRow
                                        key={index}
                                        className={index % 2 === 0 ? cx('table-body-row-white') : cx('table-body-row-gray')}
                                    >
                                        <TableCell align="center" className={cx('text-table')}>{(pages - 1) * PAGE_SIZE + index + 1}</TableCell>
                                        <TableCell align="center" className={cx('text-table')}>{row.email}</TableCell>
                                        <TableCell align="center" className={cx('text-table')}>{row.name}</TableCell>
                                        <TableCell align="center" className={cx('text-table')}>{row.phone}</TableCell>
                                        <TableCell align="center" className={cx('text-table')}>{row.updated_at}</TableCell>
                                        <TableCell
                                            align="center"
                                            onClick={() => console.log('assaas')}
                                            className={row?.status === UserStatus.ACTIVE ? cx('status-active') : row?.status === UserStatus.BLOCK ? cx('status-block') : cx('status-new')}
                                        >
                                            <div className={cx('view-status')}>
                                                {row.status}
                                            </div>
                                        </TableCell>
                                        <TableCell align="center" onClick={onNavigate} className={cx('text-detail')}>
                                            {Languages.userManagement.table.detail}
                                            <img src={IcDetail} className={cx('img-detail')} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }, [commonManager, navigate, pages, pathGroups, users]);

    const renderItemSearch = useCallback((text: string, title: string) => {

        const onClose = () => {
            refModalSearch.current?.setValue(title);
            switch (title) {
                case Languages.userManagement.modal.email:
                    return setEmail('');
                case Languages.userManagement.modal.name:
                    return setName('');
                case Languages.userManagement.modal.phone:
                    return setPhone('');
                case Languages.userManagement.modal.position:
                    return setPosition('');
                case Languages.userManagement.modal.status:
                    return setStatus('');
                default:
                    return;
            }
        };

        return (
            <div className={cx('item-search-container')}>
                <span className={cx('label')}>{text}</span>
                <img src={IcDelete} className={cx('img-delete')} onClick={onClose} />
            </div>
        );
    }, []);

    const renderViewSearch = useMemo(() => {
        return (
            <div className={cx('view-search-table')}>
                {email.length > 0 && renderItemSearch(email, Languages.userManagement.modal.email)}
                {name.length > 0 && renderItemSearch(name, Languages.userManagement.modal.name)}
                {phone.length > 0 && renderItemSearch(phone, Languages.userManagement.modal.phone)}
                {position.length > 0 && renderItemSearch(position, Languages.userManagement.modal.position)}
                {status.length > 0 && renderItemSearch(status, Languages.userManagement.modal.status)}
            </div>
        );
    }, [email, name, phone, position, renderItemSearch, status]);

    const onContinue = useCallback((_email: string, _name: string, _phone: string, _position: string, _status: string) => {
        setEmail(_email);
        setName(_name);
        setPhone(_phone);
        setPosition(_position);
        setStatus(_status);
    }, []);

    return (
        <div className={cx('container')}>
            {renderViewTop}
            <div className={cx('view-body')}>
                <RightsGroupComponent dataGroups={positionsMock} ref={positionRef} />
                <div className={cx('view-body-right')}>
                    <div className={cx('view-body-right-group')}>
                        <span className={cx('txt-group-table')}>{Languages.userManagement.userManagement}</span>
                        <div className={cx('view-search-body-right')}>{renderViewSearch}</div>
                        <Button
                            containButtonStyles={cx('view-body-right-button')}
                            label={Languages.userManagement.search}
                            labelStyles={cx('button-group-right')}
                            rightIcon={IcSearch}
                            rightIconStyles={cx('icon-right')}
                            isLowerCase
                            onPress={handleSearch}
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
            <ModalSearch ref={refModalSearch} description={Languages.userManagement.searchUser} onSuccessPress={onContinue} />
        </div>
    );
};

export default UserManagement;
