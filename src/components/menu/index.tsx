import IcMenu from 'assets/icon/ic_menu.svg';
import IcPin from 'assets/icon/ic_pin.svg';
import IcRight from 'assets/icon/ic_right.svg';
import IcSetting from 'assets/icon/ic_setting.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { useAppStore } from 'hooks';
import sessionManager from 'managers/session-manager';
import { toJS } from 'mobx';
import { MenuModel } from 'models/menu-model';
import { menuMock } from 'pages/__mocks__/Menus';
import React, { ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './menu.module.scss';

const cx = classNames.bind(styles);

export type ModalProps = {
    component?: ReactElement
};

export type ModalAction = {
    toggleCollapsed?: () => any
};

export type DirectoryPath = {
    name: string;
    path: string;
}

export type ExpandedFlow = {
    id: string;
    level: number;
    name: string;
    path?: string;
}

export type ShowDropdown = {
    name: string;
}

const MenuGroup = ({ component }: ModalProps) => {
    const { commonManager } = useAppStore();
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [toggle, setToggle] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const navigate = useNavigate();
    const [department] = useState(menuMock);
    const expandedFlow = useRef<ExpandedFlow[]>([]);
    const [nameShow, setNameShow] = useState<string>('');
    const [choose, setChoose] = useState<string>('');

    useEffect(() => {
        //  action onbeforeunload: block add path to pathGroupStack
        window.onbeforeunload = function () {
            if (commonManager.pathGroupStack) {
                const _pathGroup = commonManager.pathGroupStack.slice(0, commonManager.pathGroupStack.length);
                commonManager.setPathGroupStack(_pathGroup);
                sessionManager.setPathGroupStack(_pathGroup);
            }
        };

        return () => {
            window.onbeforeunload = null;
        };
    }, [commonManager]);

    const toggleCollapsed = useCallback(() => {
        setCollapsed(last => !last);
    }, []);

    const onNavigate = useCallback((path: any) => {
        navigate(path);

        if (show) {
            setCollapsed(show);
        }

    }, [navigate, show]);

    const renderDepartment = useCallback((menuItem: MenuModel, level: number) => {
        const hasChild = (menuItem?.children?.length || 0) > 0;

        const onClickItem = () => {
            setChoose(menuItem.id);
            if (expandedFlow.current.filter(_expandedFlow => _expandedFlow.id === menuItem.id).length > 0 && hasChild) {
                expandedFlow.current = expandedFlow.current.slice(0, expandedFlow.current.findIndex(_expanded => _expanded.id === menuItem.id));
            }
            else if (expandedFlow.current.filter(_expandedFlow => _expandedFlow.level === menuItem.level).length > 0) {

                expandedFlow.current = expandedFlow.current.slice(0, expandedFlow.current.findIndex(_expanded => _expanded.level === menuItem.level));
                expandedFlow.current.push({ id: menuItem.id, level: menuItem.level, name: menuItem.name, path: menuItem?.path });
            }
            else {
                expandedFlow.current.push({ id: menuItem.id, level: menuItem.level, name: menuItem.name, path: menuItem?.path });
            }
            setToggle(!toggle);
            if (!hasChild) {
                onNavigate(menuItem?.path);
                const _path = { children: expandedFlow.current };
                commonManager.setPathGroups(_path);
                sessionManager.setPathGroups(_path);
                if (commonManager.pathGroupStack && commonManager.pathGroupStack?.length > 0 && commonManager.pathGroups && commonManager.pathGroupStack?.length > 0) {
                    // add path to pathGroupStack when not have
                    if (commonManager.pathGroupStack.filter(path => path.children[path.children?.length - 1]?.id === menuItem?.id).length < 1) {
                        commonManager.setPathGroupStack([...commonManager.pathGroupStack, _path]);
                        sessionManager.setPathGroupStack([...commonManager.pathGroupStack, _path]);
                    }
                } else {
                    commonManager.setPathGroupStack([_path]);
                    sessionManager.setPathGroupStack([_path]);
                }
                setNameShow('');
            }
        };

        const paddingLeft = level * 20; // padding for each level

        return menuItem ? <>
            <Button
                label={menuItem.name}
                key={menuItem.id}
                containButtonStyles={choose === menuItem.id ? cx('container-button-green') : cx('container-button')}
                customStyles={{ 'paddingLeft': paddingLeft }}
                labelStyles={cx('label-btn')}
                isLowerCase
                rightIcon={hasChild && IcRight}
                rightIconStyles={cx('right-icon')}
                onPress={onClickItem}
            />
            {hasChild && expandedFlow.current.filter(_expandedFlow => _expandedFlow.id === menuItem.id).length > 0 &&
                menuItem?.children?.map((item, index) => {
                    return (
                        <div key={index}>
                            {renderDepartment(item, level + 1)}
                        </div>
                    );
                }

                )}
        </> : <></>;
    }, [choose, commonManager, onNavigate, toggle]);

    const onClickDropDown = useCallback((item: MenuModel, index: number) => {
        const hasChild = (item?.children?.length || 0) > 0;
        const onNavigateItem = (() => {
            setChoose(item.id);
            if (expandedFlow.current.length < 1) expandedFlow.current.push({ id: item.id, level: item.level, name: item.name, path: item?.path });
            if (expandedFlow.current.filter(_expandedFlow => _expandedFlow.level === item.level).length > 0) {
                expandedFlow.current = expandedFlow.current.slice(0, expandedFlow.current.findIndex(_expanded => _expanded.level === item.level));
                expandedFlow.current.push({ id: item.id, level: item.level, name: item.name, path: item?.path });
            }
            else {
                expandedFlow.current.push({ id: item.id, level: item.level, name: item.name, path: item?.path });
            }
            if (!hasChild) {
                const _path = { children: expandedFlow.current };
                commonManager.setPathGroups(_path);
                sessionManager.setPathGroups(_path);
                if (commonManager.pathGroupStack && commonManager.pathGroupStack?.length > 0 && commonManager.pathGroups && commonManager.pathGroupStack?.length > 0) {
                    if (commonManager.pathGroupStack.filter(path => path.children[path.children?.length - 1]?.id === item?.id).length < 1) {
                        commonManager.setPathGroupStack([...commonManager.pathGroupStack, _path]);
                        sessionManager.setPathGroupStack([...commonManager.pathGroupStack, _path]);
                    }
                } else {
                    commonManager.setPathGroupStack([_path]);
                    sessionManager.setPathGroupStack([_path]);
                }
                onNavigate(item.path);
            }
            if (nameShow === item?.name) {
                setNameShow('');
            } else {
                setNameShow(item.name);
            }
        }
        );

        return (
            <div className={cx('container-dropdown')}>
                <Button
                    containButtonStyles={nameShow === item.name ? cx('btn-item-green') : cx('btn-item')}
                    key={`${item.id}${index}`}
                    onPress={onNavigateItem}
                    label={item.name}
                    labelStyles={cx('txt-item')}
                    rightIcon={IcRight}
                    rightIconStyles={cx('img-right')}
                    isLowerCase
                />
                {item.name === nameShow && hasChild && <div className={cx('dropdown')}>
                    {item.children?.map((_item, _index) => {
                        return (
                            <div key={_index}>
                                {renderDepartment(_item, 1)}
                            </div>
                        );
                    })}
                </div>
                }
            </div>
        );

    }, [commonManager, nameShow, onNavigate, renderDepartment]);

    const onPin = useCallback(() => {
        setShow(last => !last);
    }, []);

    const renderViewBodyLeftBottom = useMemo(() => {
        return (
            <div className={cx('body-left-bottom-container')}>
                <div className={cx('group-button')}>
                    {department?.map((_department, index) => {
                        return (
                            <div key={index}>
                                {renderDepartment(_department, 0)}
                            </div>
                        );
                    })}
                </div>
                <div className={cx('view-icon-bottom')}>
                    <img src={IcSetting} className={cx('icon-bottom')} />
                    <img src={IcPin} className={cx('icon-bottom')} onClick={onPin} />
                </div>
            </div>
        );
    }, [department, onPin, renderDepartment]);

    console.log('path_group === ', toJS(commonManager.pathGroupStack));

    return (
        <div className={cx('container')}>
            <div className={cx('view-btn-menu')}>
                <Button
                    label={Languages.menu.menu}
                    labelStyles={cx('txt-menu')}
                    containButtonStyles={cx('btn-menu')}
                    onPress={toggleCollapsed}
                    disabled={show}
                    rightIcon={IcMenu}
                    isLowerCase
                />
                <div className={cx('view-dropdown')}>
                    {menuMock?.map((item, index) => {
                        return (
                            <div key={index}>
                                {onClickDropDown(item, index)}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={cx('view-row')}>
                {collapsed ? renderViewBodyLeftBottom : null}
                <div className={collapsed ? cx('page-collapsed') : cx('page-contain')}>
                    {component}
                </div>
            </div>
        </div>
    );
};

export default MenuGroup;





