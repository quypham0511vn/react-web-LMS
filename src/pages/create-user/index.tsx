import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import IcAddPermissions from 'assets/icon/ic_add_permissions.svg';
import IcClose from 'assets/icon/ic_close.svg';
import IcUpdate from 'assets/icon/ic_edit.svg';
import IcRight from 'assets/icon/ic_right.svg';
import IcSave from 'assets/icon/ic_save.svg';
import IcSearch from 'assets/icon/ic_search.svg';
import classNames from 'classnames/bind';
import { POSITION_TYPE, TYPE_INPUT, UserManagementStatus, UserStatus } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import DirectoryPath from 'components/directory-path';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import ModalChoosePosition from 'components/modal-choose-position';
import { ModalChoosePositionActions } from 'components/modal-choose-position/types';
import ModalDelete from 'components/modal-delete';
import { useAppStore } from 'hooks';
import sessionManager from 'managers/session-manager';
import { AgentGroupModel, AgentModel } from 'models/agent-model';
import { PopupBaseActions } from 'models/modal-model';
import { PermissionGroupModel } from 'models/permission-group-model';
import { PermissionModel } from 'models/permission-model';
import { PositionModel } from 'models/position-model';
import { UserInfoModel } from 'models/user-model';
import { agentGroupMock, agentsMock } from 'pages/__mocks__/Agents';
import { permissionGroupsMock } from 'pages/__mocks__/PermissionGroups';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import formValidate from 'utils/form-validate';
import styles from './create-user.module.scss';

const cx = classNames.bind(styles);

export type DataUser = {
    data: UserInfoModel,
    status: string
}

export type User = {
    email: string,
    name: string,
    phone: string,
    cmt: string,
}

const CreateUser = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { commonManager } = useAppStore();
    const [permGroups, setPermGroups] = useState<PermissionGroupModel[]>([]);
    const [agentGroups, setAgentGroup] = useState<AgentGroupModel>(sessionManager.userInfo?.agent_group || agentGroupMock);
    const refEmail = useRef<TextFieldActions>();
    const refName = useRef<TextFieldActions>();
    const refPhone = useRef<TextFieldActions>();
    const refCMT = useRef<TextFieldActions>();
    const [status, setStatus] = useState<string>(UserManagementStatus.DETAIL);
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        phone: '',
        cmt: ''
    });
    const [valueSearch, setValueSearch] = useState<string>('');
    const refModalChoose = useRef<ModalChoosePositionActions>(null);
    const refModalDelete = useRef<PopupBaseActions>(null);

    const [position, setPosition] = useState<PositionModel>();
    const [agents, setAgents] = useState<AgentModel[]>(agentsMock);
    const userInfo = useRef<UserInfoModel>();
    const refSearch = useRef<TextFieldActions>(null);

    useEffect(() => {
        const _location = location.state as DataUser;
        setStatus(_location ? _location.status : UserManagementStatus.DETAIL);
        if (_location?.status === UserManagementStatus.DETAIL && sessionManager.userInfo) {
            const data = sessionManager.userInfo;
            console.log('data = ', sessionManager.userInfo);
            const _email = data?.email;
            const _name = data?.name;
            const _phone = data?.phone;
            const _cmt = data?.cmt;
            const _data = data?.position_group as PermissionGroupModel[];
            const _agent = data?.agent_group as AgentGroupModel;
            setPosition(data?.position);
            setPermGroups(_data);
            setAgentGroup(_agent || agentGroupMock);
            setUser({ email: _email || '', name: _name || '', phone: _phone || '', cmt: _cmt || '' });
        }
    }, [commonManager.pathGroups, location.state]);

    useEffect(() => {
        const data = sessionManager.userInfo?.agent_group || agentGroupMock;
        if (valueSearch.length > 0) {
            const _agentGroup = data?.agent.filter(_agent => _agent.name.includes(valueSearch) === true);
            setAgentGroup({ type: data.type, agent: _agentGroup });
        } else {
            setAgentGroup(data);
        }
    }, [valueSearch]);

    const renderTitle = useMemo(() => {
        switch (status) {
            case UserManagementStatus.CREATE:
                return <span className={cx('txt-management')}>{Languages.formUser.createUser}</span>;
            case UserManagementStatus.DETAIL:
                return <span className={cx('txt-management')}>{Languages.formUser.userDetails}</span>;
            case UserManagementStatus.EDIT:
                return <span className={cx('txt-management')}>{Languages.formUser.updateUser}</span>;
            default:
                return;
        }
    }, [status]);

    const onUpdateUser = useCallback(() => {
        setStatus(UserManagementStatus.EDIT);
    }, []);

    const onValidate = useCallback((_email: string, _name: string, _phone: string, _cmt: string) => {
        const errMsgEmail = formValidate.emailValidate(_email);
        const errMsgName = formValidate.userNameValidate(_name);
        const errMsgPhone = formValidate.passConFirmPhone(_phone);
        const errMsgCmt = formValidate.cardValidate(_cmt);
        refEmail.current?.setErrorMsg(errMsgEmail);
        refName.current?.setErrorMsg(errMsgName);
        refPhone.current?.setErrorMsg(errMsgPhone);
        refCMT.current?.setErrorMsg(errMsgCmt);
        if (`${errMsgEmail}${errMsgName}${errMsgPhone}${errMsgCmt}`.length === 0) {
            return true;
        }
        return false;
    }, []);

    const onSave = useCallback(() => {
        const _email = refEmail.current?.getValue();
        const _name = refName.current?.getValue();
        const _phone = refPhone.current?.getValue();
        const _cmt = refCMT.current?.getValue();

        if (onValidate(_email, _name, _phone, _cmt) && position) {
            userInfo.current = {
                id: '1',
                email: _email,
                name: _name,
                phone: _phone,
                cmt: _cmt,
                updated_at: '01-01-2021',
                status: Object.values(UserStatus)[Math.floor(Math.random() * Object.values(UserStatus).length)],
                avatar: 'https://ci4.googleusercontent.com/proxy/73xT76DOVwgBOIRERRm7_gIWOIKHrqtjOGz20WCGSl3qGms40y9n9N6NgKOSXfm3oY4cpN6zO5_jjgKuJ3RKaFOLu56RsSTLhHSXAFRfaT7uR-mvIYzEJQTYi7mVlykGa36IZ2i7whXSyrsm2g=s0-d-e1-ft#https://service.tienngay.vn/uploads/avatar/1645690960-c015e46b3dd17f6a9f03b449ed4f9257.jpg',
                position: position,
                position_group: permGroups,
                agent_group: (position?.type === POSITION_TYPE.OO_M || position?.type === POSITION_TYPE.OO_O) ? agentGroups : undefined
            };
            console.log('user = ', userInfo.current);
            sessionManager.setUserInfo(userInfo.current);
            navigate(-1);
        }
    }, [agentGroups, navigate, onValidate, permGroups, position]);

    const renderViewTopRight = useMemo(() => {
        switch (status) {
            case UserManagementStatus.CREATE:
                return <Button
                    containButtonStyles={cx('btn-news-user')}
                    label={Languages.formUser.save}
                    rightIcon={IcSave}
                    rightIconStyles={cx('right-icon')}
                    labelStyles={cx('label-btn')}
                    isLowerCase
                    onPress={onSave}
                />;
            case UserManagementStatus.DETAIL:
                return <>
                    <Button
                        containButtonStyles={cx('btn-news-user')}
                        label={Languages.formUser.updateUser}
                        rightIcon={IcUpdate}
                        rightIconStyles={cx('right-icon')}
                        labelStyles={cx('label-btn')}
                        isLowerCase
                        onPress={onUpdateUser}
                    />
                    {/* <Button
                            containButtonStyles={cx('btn-delete-user')}
                            label={Languages.formUser.deleteUser}
                            rightIcon={IcDelete}
                            rightIconStyles={cx('right-icon')}
                            labelStyles={cx('label-btn')}
                            isLowerCase
                            onPress={onDeleteUser}
                        /> */}
                </>;
            case UserManagementStatus.EDIT:
                return <Button
                    containButtonStyles={cx('btn-news-user')}
                    label={Languages.formUser.saveUpdate}
                    rightIcon={IcSave}
                    rightIconStyles={cx('right-icon')}
                    labelStyles={cx('label-btn')}
                    isLowerCase
                    onPress={onSave}
                />;
            default:
                return;
        }
    }, [onSave, onUpdateUser, status]);

    const renderViewTop = useMemo(() => {
        return (
            <div className={cx('view-top')}>
                <div className={cx('view-top-left')}>
                    {renderTitle}
                    <div className={cx('txt-address')}>
                        <DirectoryPath />
                    </div>
                </div>
                <div className={cx('button-right')}>
                    {renderViewTopRight}
                </div>
            </div>
        );
    }, [renderTitle, renderViewTopRight]);

    const renderInput = useCallback((refInput: any, title: string, value: string, placeHolder: string, type: any, maxLength: number) => {
        return (
            <div className={cx('group-input')}>
                <span className={cx('title-input')}>
                    {title}
                    <span className={cx('color-star')}>{Languages.formUser.star}</span>
                </span>
                <MyTextInput
                    ref={refInput}
                    type={type}
                    containerInput={cx('contain-input')}
                    inputStyle={cx('input-styles')}
                    placeHolder={placeHolder}
                    value={value}
                    maxLength={maxLength}
                    disabled={status === UserManagementStatus.DETAIL}
                />
            </div>
        );
    }, [status]);

    const updatePosition = useCallback(() => {
        refModalChoose.current?.showModal(false);
    }, []);

    const addPosition = useCallback(() => {
        refModalChoose.current?.showModal(true);
    }, []);

    const onPositionPicked = useCallback(({ data, isAdditionPermGroup }: { data: PositionModel, isAdditionPermGroup: boolean }) => {
        const relevantPermGroup = permissionGroupsMock.find(item => item.id === data.id);
        if (isAdditionPermGroup && permGroups) {
            if (relevantPermGroup && !permGroups.find(item => item.id === relevantPermGroup.id)) {
                setPermGroups(last => [...last, relevantPermGroup]);
            }
        } else {
            setPosition(data);
            if (sessionManager?.userInfo?.position_group && sessionManager?.userInfo?.position.id === data.id && !isAdditionPermGroup) {
                setPermGroups(sessionManager?.userInfo?.position_group);
            } else {
                setPermGroups(relevantPermGroup ? [relevantPermGroup] : []);
            }
        }
    }, [permGroups]);

    const renderViewBodyLeft = useMemo(() => {
        return (
            <div className={cx('view-body-left')}>
                <span className={cx('txt-group')}>{Languages.formUser.personalInformation}</span>
                <div className={cx('txt-input')}>
                    {renderInput(refEmail, Languages.common.email, user?.email, Languages.common.inputEmail, TYPE_INPUT.TEXT, 50)}
                    {renderInput(refName, Languages.common.name, user?.name, Languages.common.inputName, TYPE_INPUT.TEXT, 50)}
                    {renderInput(refPhone, Languages.common.sdt, user?.phone, Languages.common.inputPhone, TYPE_INPUT.TEL, 10)}
                    {renderInput(refCMT, Languages.common.cmt, user?.cmt, Languages.common.inputCMT, TYPE_INPUT.TEL, 50)}
                    <div className={cx('group-input')}>
                        <span className={cx('title-input')}>
                            {Languages.common.position}
                            <span className={cx('color-star')}>{Languages.formUser.star}</span>
                        </span>
                        <Button
                            label={position?.name || Languages.formUser.positionHint}
                            containButtonStyles={cx('contain-btn')}
                            labelStyles={cx('label-btn-position')}
                            disabled={status === UserManagementStatus.DETAIL}
                            isLowerCase
                            rightIcon={status !== UserManagementStatus.DETAIL ? IcRight : null}
                            onPress={updatePosition}
                        />
                    </div>
                </div>
            </div>
        );
    }, [renderInput, user?.email, user?.name, user?.phone, user?.cmt, position?.name, status, updatePosition]);

    const renderPermissions = useCallback((permGroupItem: PermissionGroupModel, groupIndex: number) => {
        return (
            <>
                {permGroupItem.permissions.map((permissionItem: PermissionModel, _index: number) => {
                    const onClickCheckbox = () => {
                        setPermGroups(last => [...last].map(group => {
                            if (group.id === permGroupItem.id) {
                                // double check for group
                                let isGroupSelectedAll = true;
                                for (let index = 0; index < group.permissions.length; index++) {
                                    let currentPerm = group.permissions[index];
                                    if (currentPerm.id === permissionItem.id) {
                                        currentPerm.selected = !currentPerm.selected;
                                    }

                                    if (!currentPerm.selected) {
                                        isGroupSelectedAll = false;
                                    }
                                }
                                group.selected = isGroupSelectedAll;
                            }

                            return group;
                        }));
                    };
                    return (
                        <div key={_index}>
                            {/* <Grid
                                item
                                xs={(position?.type === POSITION_TYPE.OO_M || position?.type === POSITION_TYPE.OO_O) ? 4 : 3}
                                lg={(position?.type === POSITION_TYPE.OO_M || position?.type === POSITION_TYPE.OO_O) ? 4 : 3}
                            > */}
                            <FormControlLabel
                                key={permissionItem.id}
                                label={permissionItem.name}
                                className={cx('check-box')}
                                onClick={onClickCheckbox}
                                control={
                                    <Checkbox
                                        checked={permissionItem.selected || false}
                                        color='success'
                                        className={cx('form-control')}
                                        disabled={status === UserManagementStatus.DETAIL || (permissionItem.type === '1' && groupIndex === 0)}
                                    />
                                }
                            />
                            {/* </Grid> */}
                        </div>
                    );
                })}
            </>
        );
    }, [position?.type, status]);

    const renderPermissionGroup = useMemo(() => {
        return (
            <div className={cx('container-group-checkbox')}>
                {permGroups?.map((group: PermissionGroupModel, groupIndex: number) => {

                    const onDeleteGroup = () => {
                        refModalDelete.current?.showModal();
                    };

                    const onConfirmDelete = () => {
                        setPermGroups(last => last.filter(_item => group.id !== _item.id));
                    };

                    const onCheckPermGroup = () => {
                        setPermGroups(last => [...last].map(_group => {
                            if (_group.id === group.id) {
                                const currentState = _group.selected;
                                _group.selected = !currentState;
                                _group.permissions.map(permission => {
                                    permission.selected = !currentState;
                                    return permission;
                                });
                            }
                            return _group;
                        }));
                    };

                    const isIndeterminate = () => {
                        if (group.selected) {
                            return false;
                        }
                        let indeterminate = false;
                        let firstSelected = group.permissions[0].selected;
                        for (let index = 1; index < group.permissions.length; index++) {
                            if (firstSelected !== group.permissions[index].selected) {
                                indeterminate = true;
                                break;
                            }
                        }
                        return indeterminate;
                    };

                    return (
                        <div key={group?.id}>
                            <div className={cx('view-item-child')}>
                                <div className={cx('label-group')}>
                                    <FormControlLabel
                                        label={group?.name}
                                        className={cx('form-group')}
                                        onClick={onCheckPermGroup}
                                        control={
                                            <Checkbox
                                                checked={group.selected || false}
                                                indeterminate={isIndeterminate()}
                                                className={cx('form-control')}
                                                color='success'
                                                disabled={status === UserManagementStatus.DETAIL}
                                            />
                                        }
                                    />
                                    {groupIndex > 0 && status !== UserManagementStatus.DETAIL && <div className={cx('bg-img-close-position')}>
                                        <img
                                            src={IcClose}
                                            className={cx('img-close')}
                                            onClick={onDeleteGroup}
                                        />
                                    </div>}
                                </div>
                                {/* permission details */}
                                <div className={cx('group-checkbox')} >
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={1}>
                                            {renderPermissions(group, groupIndex)}
                                        </Grid>
                                    </Box>
                                </div>
                            </div >
                            <ModalDelete
                                ref={refModalDelete}
                                description={Languages.formUser.removePermissions}
                                content={`${Languages.formUser.user} ${user.email} ${Languages.formUser.content}`}
                                onConfirm={onConfirmDelete}
                            />
                        </div>
                    );
                })}
                {status !== UserManagementStatus.DETAIL && <div className={cx('btn-add')}>
                    <Button
                        label={Languages.formUser.addPermissions}
                        isLowerCase
                        disabled={!position}
                        containButtonStyles={cx('container-btn-add-permissions')}
                        labelStyles={cx('label-btn-add')}
                        rightIcon={IcAddPermissions}
                        onPress={addPosition}
                    />
                </div>}
            </div>
        );
    }, [permGroups, status, position, addPosition, renderPermissions, user.email]);

    const renderPermissionGroups = useMemo(() => {
        return (
            <div className={cx('view-item')}>
                {renderPermissionGroup}
            </div>
        );
    }, [renderPermissionGroup]);

    const renderCheckBox = useMemo(() => {
        return (
            <>
                {agentGroups?.agent?.map((item) => {

                    const onClickCheckBox = () => {
                        setAgents(last => [...last].map(_group => {
                            if (_group.id === item.id) {
                                const currentState = _group.selected;
                                _group.selected = !currentState;
                            }
                            return _group;
                        }));
                        setAgentGroup({ type: 2, agent: agents });
                    };

                    return (
                        <div className={cx('form-control')} key={item?.id}>
                            <Checkbox
                                color="success"
                                className={cx('form-control-radio')}
                                disabled={status === UserManagementStatus.DETAIL}
                                checked={(item.selected && agentGroups?.type === 2) || false}
                                onClick={onClickCheckBox}
                            />
                            <span>{item.name}</span>
                        </div>
                    );
                })}
            </>
        );
    }, [agentGroups?.agent, agentGroups?.type, agents, status]);

    const renderRadio = useMemo(() => {
        return (
            <FormControl
                className={cx('form-control-group')}
            >
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    color="success"
                >
                    {agentGroups.agent?.map((item, index) => {
                        const onClickRadio = () => {
                            setAgents(last => [...last].map(_group => {
                                if (_group.id === item.id) {
                                    _group.selected = true;
                                } else {
                                    _group.selected = false;
                                }
                                return _group;
                            }));

                            setAgentGroup({ type: 1, agent: agents });
                        };


                        return (
                            <div key={index}
                                className={cx('form-control')}
                            >
                                <Radio
                                    color="success"
                                    className={cx('form-control-radio')}
                                    disabled={status === UserManagementStatus.DETAIL}
                                    checked={(item.selected && agentGroups?.type === 1)}
                                    onClick={onClickRadio}
                                />
                                <span>{item.name}</span>
                            </div>
                        );
                    })}
                </RadioGroup>
            </FormControl>
        );
    }, [agentGroups.agent, agentGroups?.type, status, agents]);

    const onChangeTextSearch = useCallback(() => {
        const _search = refSearch.current?.getValue();
        setValueSearch(_search);
    }, []);

    const renderAgents = useMemo(() => {
        return (
            <Box className={cx('box-group')}>
                <span className={cx('title-box-group')}>{Languages.formUser.transaction}</span>
                <MyTextInput
                    ref={refSearch}
                    rightIcon={IcSearch}
                    type={TYPE_INPUT.TEXT}
                    inputStyle={cx('view-body-left-input')}
                    containerInput={cx('container-input')}
                    placeHolder={Languages.userManagement.search}
                    styleGroup={cx('input-group')}
                    value={valueSearch}
                    onChangeText={onChangeTextSearch}
                    maxLength={50}
                    disabled={status === UserManagementStatus.DETAIL}
                />
                <Box className={cx('check-item')}>
                    {position?.type === POSITION_TYPE.OO_O ? renderRadio : renderCheckBox}
                </Box>
            </Box>
        );
    }, [valueSearch, onChangeTextSearch, status, position?.type, renderRadio, renderCheckBox]);

    return (
        <div className={cx('container')}>
            {renderViewTop}
            <div className={cx('view-body')}>
                {renderViewBodyLeft}
                {(position?.type === POSITION_TYPE.OO_M || position?.type === POSITION_TYPE.OO_O) && <Box className={cx('list-checkbox')}>
                    {renderAgents}
                </Box>}
                <div className={cx('view-body-right')}>
                    <h2 className={cx('txt-author')}>{Languages.formUser.authorizationInformation}</h2>
                    {renderPermissionGroups}
                </div>
            </div>

            <ModalChoosePosition
                ref={refModalChoose}
                description={Languages.formUser.listPosition}
                onConfirm={onPositionPicked}
            />
        </div>
    );
};

export default CreateUser;
