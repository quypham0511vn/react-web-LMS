import { Checkbox, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import IcRight from 'assets/icon/ic_right.svg';
import IcSave from 'assets/icon/ic_save.svg';
import IcSearch from 'assets/icon/ic_search.svg';
import classNames from 'classnames/bind';
import { TYPE_INPUT, TYPE_TOAST, UserManagementStatus } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import DirectoryPath from 'components/directory-path';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import ModalChoosePosition from 'components/modal-choose-position';
import { ModalChoosePositionActions } from 'components/modal-choose-position/types';
import { DataToast, Toast } from 'components/toast';
import { useAppStore } from 'hooks';
import sessionManager from 'managers/session-manager';
import { PermissionGroupModel } from 'models/permission-group-model';
import { PermissionModel } from 'models/permission-model';
import { PositionModel } from 'models/position-model';
import { permissionMock } from 'pages/__mocks__/PermissionGroups';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import styles from './create-position.module.scss';

const cx = classNames.bind(styles);

export type Location = {
    status: string;
    data?: DataModel;
}

export type DataModel = {
    position?: PositionModel;
    permissionGroup?: PermissionGroupModel;
}

const arr_room_manage = [
    Languages.positionManagement.noManage,
    Languages.positionManagement.manageOnlyOneRoom,
    Languages.positionManagement.manageMultipleRoom
];

const CreatePosition = () => {
    const location = useLocation();
    const { commonManager } = useAppStore();
    const [position, setPosition] = useState<PositionModel>({
        id: 'front-end',
        name: '',
        type: 3
    });
    const [valueSearch, setValueSearch] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [permissionGroup, setPermissionGroup] = useState<PermissionModel[]>(permissionMock);
    const [permissionChooseGroup, setPermissionChooseGroup] = useState<PermissionModel[]>([]);
    const [isShow, setIsShow] = useState<boolean>(false);
    const refToast = useRef<any>(null);
    const refNamePosition = useRef<TextFieldActions>(null);
    const refChooseManager = useRef<ModalChoosePositionActions>(null);
    const refInputSearch = useRef<TextFieldActions>(null);

    useEffect(() => {
        const _location = location.state as Location;
        if (_location.data && _location.data.permissionGroup && _location.data.position && _location.status === UserManagementStatus.EDIT) {
            const _permission = _location.data?.permissionGroup?.permissions as PermissionModel[];
            const _position = _location.data?.position as PositionModel;
            for (let i = 0; i < _permission.length; i++) {
                setPermissionGroup(last => [...last].map((_item) => {
                    if (_item.id === _permission[i].id) {
                        _item.selected = true;
                    }
                    return _item;
                }));
            }
            setPermissionChooseGroup(_permission);
            console.log('_position ==', _position);
            setPosition(_position);
        } else {
            setPermissionGroup(last => last.map(item => {
                item.selected = false;
                return item;
            }));
        }
        setStatus(_location.status);
    }, [commonManager.pathGroups, location.state]);

    useEffect(() => {
        const data = permissionMock;
        if (valueSearch.length > 0) {
            const _permission = data?.filter(_agent => _agent.name.includes(valueSearch) === true);
            setPermissionGroup(_permission);
        } else {
            setPermissionGroup(data);
        }
    }, [valueSearch]);

    const onChangeTextInput = useCallback((value: string, tag?: string) => {
        switch (tag) {
            case Languages.userManagement.search:
                setValueSearch(value);
                break;
            case Languages.positionManagement.inputNamePosition:
                setPosition(last => {
                    last.name = value;
                    return last;
                });
                break;
            default:
                break;
        }
    }, []);

    const userPositionValidate = (userName: string | undefined) => {
        let errMsg = '';
        if (userName === undefined || userName === null || userName === '') {
            return errMsg = Languages.errorMsg.nameRequired;
        }
        return errMsg;
    };

    const onValidate = useCallback(() => {
        const errMsgName = userPositionValidate(position?.name);
        refNamePosition.current?.setErrorMsg(errMsgName);
        if (`${errMsgName}`.length === 0) {
            return true;
        }
        return true;
    }, [position?.name]);

    const onSave = useCallback(() => {
        if (onValidate()) {
            if (permissionChooseGroup.length < 1) {
                const _data = { type: TYPE_TOAST.ERROR, title: TYPE_TOAST.ERROR, describe: Languages.errorMsg.positionRequired };
                refToast.current?.showToast(_data);
            } else {
                const data = {
                    position: position,
                    permissions: permissionChooseGroup
                };
                console.log('data ===', data);
            }
        }
    }, [onValidate, position, permissionChooseGroup]);

    const onUpdate = useCallback(() => {
        if (onValidate()) {
            if (permissionChooseGroup.length < 1) {
                const _data = { type: TYPE_TOAST.ERROR, title: TYPE_TOAST.ERROR, describe: Languages.errorMsg.positionRequired };
                refToast.current?.showToast(_data);
            } else {
                const data = {
                    position: position,
                    permissions: permissionChooseGroup
                };
                console.log('data ===', data);
                if (sessionManager?.permissionGroups && sessionManager?.permissionGroups?.filter(item => item.id === data.position?.id).length > 0) {
                    const _permissionGroup = sessionManager?.permissionGroups?.filter(item => item.id !== data.position?.id);
                    const _permission = { id: data.position?.id, name: data.position?.name, type: data.position?.name, permissions: data.permissions } as unknown as PermissionGroupModel;
                    _permissionGroup.push(_permission);
                    commonManager.setPermissionGroups(_permissionGroup);
                    sessionManager.setPermissionGroups(_permissionGroup);
                }
            }
        }
    }, [onValidate, position, permissionChooseGroup, commonManager]);

    const renderViewTop = useMemo(() => {

        return (
            <div className={cx('view-top')}>
                <div className={cx('view-top-left')}>
                    <span className={cx('txt-management')}>{
                        status !== UserManagementStatus.CREATE ? Languages.positionManagement.updatePosition : Languages.positionManagement.createPosition}
                    </span>
                    <div className={cx('txt-address')}>
                        <DirectoryPath />
                    </div>
                </div>
                <div className={cx('button-right')}>
                    <Button
                        containButtonStyles={cx('btn-news-position')}
                        label={status !== UserManagementStatus.CREATE ? Languages.positionManagement.saveEdit : Languages.positionManagement.save}
                        rightIcon={IcSave}
                        rightIconStyles={cx('right-icon')}
                        labelStyles={cx('label-btn')}
                        isLowerCase
                        onPress={status === UserManagementStatus.CREATE ? onSave : onUpdate}
                    />
                </div>
            </div>
        );
    }, [onSave, onUpdate, status]);

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
                    inputStyle={cx('input-styles')}
                    placeHolder={placeHolder}
                    onChangeText={onChangeTextInput}
                    value={value}
                    maxLength={maxLength}
                />
            </div>
        );
    }, [onChangeTextInput]);

    const onChooseManager = useCallback(() => {
        refChooseManager.current?.showModal(false);
    }, []);

    const onPositionPicked = useCallback(({ data }: { data: PositionModel }) => {
        const _position = { ...position, parent_id: data.id, parent_name: data.name } as PositionModel;
        setPosition(_position);
    }, [position]);

    const renderPermissions = useMemo(() => {
        return (
            <>
                {permissionGroup.map((permissionItem: PermissionModel, index: number) => {
                    const onClickCheckbox = () => {
                        setPermissionGroup(last => [...last].map(group => {
                            if (group.id === permissionItem?.id) {
                                const currentState = group.selected;
                                group.selected = !currentState;
                            }
                            return group;
                        }));

                        if (permissionChooseGroup.filter(_permissionChooseGroup => _permissionChooseGroup.id === permissionItem.id).length > 0) {
                            setPermissionChooseGroup(permissionChooseGroup.filter(_permissionChooseGroup => _permissionChooseGroup.id !== permissionItem.id));
                        } else {
                            setPermissionChooseGroup(last => [...last, { id: permissionItem.id, name: permissionItem.name, type: '2' }]);
                        }
                    };

                    return (
                        <div key={index}>
                            {/* <Grid item xs={4} lg={3} > */}
                            <div className={cx('check-box')}>
                                <Checkbox
                                    checked={permissionItem.selected || false}
                                    color='success'
                                    onClick={onClickCheckbox}
                                />
                                <span>{permissionItem.name}</span>
                            </div>
                            {/* </Grid> */}
                        </div>
                    );
                })}
            </>
        );
    }, [permissionChooseGroup, permissionGroup]);

    const renderInfoPosition = useMemo(() => {
        return (
            <div className={cx('group-info')}>
                <div className={cx('box-group-info')}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1}>
                            {permissionChooseGroup.map((permissionItem: PermissionModel, index: number) => {
                                const onClickCheckbox = () => {
                                    setPermissionChooseGroup(last => [...last].map(group => {
                                        if (group.id === permissionItem?.id) {
                                            const currentState = group.selected;
                                            group.selected = !currentState;
                                            group.type = group.selected ? '1' : '2';
                                        }
                                        return group;
                                    }));
                                };
                                return (
                                    <div key={index}>
                                        {/* <Grid item xs={3} lg={3} md={4}> */}
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
                                                />
                                            }
                                        />
                                        {/* </Grid> */}
                                    </div>
                                );
                            })}
                        </Grid>
                    </Box>
                </div>
            </div>
        );
    }, [permissionChooseGroup]);

    const renderListPosition = useMemo(() => {
        return (
            <div className={cx('group-list')}>
                <MyTextInput
                    ref={refInputSearch}
                    rightIcon={IcSearch}
                    type={TYPE_INPUT.TEXT}
                    styleIconRight={cx('right-icon-input')}
                    inputStyle={cx('input-styles')}
                    containerInput={cx('container-input-styles')}
                    placeHolder={Languages.userManagement.search}
                    styleGroup={cx('input-group')}
                    value={valueSearch}
                    onChangeText={onChangeTextInput}
                    maxLength={50}
                />
                <div className={cx('box-group')}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={1} xs={12}>
                            {renderPermissions}
                        </Grid>
                    </Box>
                </div>
            </div>
        );
    }, [onChangeTextInput, renderPermissions, valueSearch]);

    const onChoosePGD = useCallback(() => {
        setIsShow(!isShow);
    }, [isShow]);

    const renderItem = useMemo(() => {

        return (
            <div className={cx('dropdown')}>
                {arr_room_manage.map((item: string, index: number) => {
                    const onChoose = () => {
                        switch (item) {
                            case Languages.positionManagement.noManage:
                                setPosition(last => {
                                    if (last) {
                                        last.type = 3;
                                    }
                                    return last;
                                });
                                setIsShow(false);
                                return;
                            case Languages.positionManagement.manageOnlyOneRoom:
                                setPosition(last => {
                                    if (last) {
                                        last.type = 1;
                                    }
                                    return last;
                                });
                                setIsShow(false);
                                return;
                            case Languages.positionManagement.manageMultipleRoom:
                                setPosition(last => {
                                    if (last) {
                                        last.type = 2;
                                    }
                                    return last;
                                });
                                setIsShow(false);
                                return;
                            default:
                                return;
                        }
                    };
                    return (
                        <Button
                            label={item}
                            key={index}
                            containButtonStyles={cx('container-button')}
                            labelStyles={cx('label-btn')}
                            isLowerCase
                            onPress={onChoose}
                        />
                    );
                })}
            </div>
        );
    }, []);

    const renderViewBodyLeft = useMemo(() => {
        return (
            <div className={cx('view-body-left')}>
                <span className={cx('txt-group')}>{Languages.positionManagement.infoPosition}</span>
                <div className={cx('txt-input')}>
                    {renderInput(refNamePosition, Languages.positionManagement.namePosition, position?.name, Languages.positionManagement.inputNamePosition, TYPE_INPUT.TEXT, 50)}
                    <div className={cx('group-input')}>
                        <span className={cx('title-input')}>{Languages.positionManagement.manager}
                            <span className={cx('color-star')}>{Languages.formUser.star}</span>
                        </span>

                        <Button
                            label={position.parent_name ? position.parent_name : Languages.positionManagement.chooseManager}
                            containButtonStyles={cx('btn-status')}
                            isLowerCase
                            rightIcon={IcRight}
                            labelStyles={cx('title-input')}
                            onPress={onChooseManager}
                        />
                    </div>
                    <div className={cx('group-input')}>
                        <span className={cx('title-input')}>{Languages.formUser.transaction}
                            <span className={cx('color-star')}>{Languages.formUser.star}</span>
                        </span>

                        <Button
                            label={position?.type === 2 ?
                                Languages.positionManagement.manageMultipleRoom : position?.type === 1 ?
                                    Languages.positionManagement.manageOnlyOneRoom : Languages.positionManagement.noManage
                            }
                            containButtonStyles={cx('btn-status')}
                            isLowerCase
                            rightIcon={IcRight}
                            disabled={status === UserManagementStatus.EDIT}
                            labelStyles={cx('title-input')}
                            onPress={onChoosePGD}
                        />
                        {isShow && <div className={cx('view-dropdown')}>
                            {renderItem}
                        </div>}
                    </div>
                </div>
            </div >
        );
    }, [position, renderInput, onChooseManager, status, onChoosePGD, isShow, renderItem]);

    return (
        <div className={cx('container')}>
            {renderViewTop}
            <div className={cx('view-body')}>
                {renderViewBodyLeft}
                <div className={cx('view-body-right')}>
                    <span className={cx('txt-author')}>{Languages.formUser.authorizationInformation}</span>
                    <div className={cx('body-info-position')}>
                        <div className={cx('info-position')}>
                            <span className={cx('txt-info')}>{Languages.positionManagement.informationPosition}</span>
                            {renderInfoPosition}
                        </div>
                        <div className={cx('list-position')}>
                            <span className={cx('txt-info')}>{Languages.positionManagement.listPosition}</span>
                            {renderListPosition}
                        </div>
                    </div>
                </div>
            </div>
            <ModalChoosePosition
                ref={refChooseManager}
                description={Languages.formUser.listPosition}
                onConfirm={onPositionPicked}
            />
            <Toast ref={refToast} />
        </div>
    );
};

export default CreatePosition;
