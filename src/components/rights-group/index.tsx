import IcRight from 'assets/icon/ic_right.svg';
import IcSearch from 'assets/icon/ic_search.svg';
import classNames from 'classnames/bind';
import { TYPE_INPUT } from 'commons/constants';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import sessionManager from 'managers/session-manager';
import { PositionModel } from 'models/position-model';
import React, { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import styles from './rights-group.module.scss';

const cx = classNames.bind(styles);

export type ExpandedFlow = {
    id: string;
    level: number;
    name: string;
    path?: string;
}

export type RightsGroupActions = {
    onClickSearch: () => any;
}

export type RightsGroupProps = {
    dataGroups?: any;
    onPress?: any;
}

const RightsGroupComponent = forwardRef<RightsGroupActions, RightsGroupProps>(
    ({ onPress, dataGroups }: RightsGroupProps) => {
        const refInputSearch = useRef<TextFieldActions>(null);
        const [valueSearch, setValueSearch] = useState<string>('');
        const [department] = useState(dataGroups);
        const [expandedFlow, setExpandedFlow] = useState<string[]>([dataGroups.id]); // track user expand flow
        const [choose, setChoose] = useState<string>('');


        const onClickSearch = useCallback(() => {
            const _value = refInputSearch.current?.getValue();
            setValueSearch(_value);
        }, []);

        const onPositionPicked = useCallback(({ data }: { data: PositionModel }) => {
            const relevantPermGroup = sessionManager.permissionGroups?.find(item => item.id === data.id);
            if (onPress) {
                onPress?.(data, relevantPermGroup);
            }
            console.log('data === ', data, 'relevantPermGroup ===', relevantPermGroup);
        }, [onPress]);

        const renderDepartment = useCallback((positionItem: PositionModel, level: number) => {
            const hasChild = (positionItem?.children?.length || 0) > 0;

            const onClickItem = () => {
                setChoose(positionItem.id);
                if (!hasChild) {
                    onPositionPicked({ data: positionItem });
                } else {
                    if (expandedFlow.includes(positionItem.id)) {
                        setExpandedFlow(last => last.slice(0, last.indexOf(positionItem.id)));
                    } else {
                        setExpandedFlow(last => [...last, positionItem.id]);
                    }
                }
            };

            const paddingLeft = level * 20; // padding for each level

            return positionItem ? <>
                <Button
                    label={positionItem.name}
                    key={positionItem.id}
                    containButtonStyles={choose === positionItem.id ? cx('container-button-green') : cx('container-button')}
                    customStyles={{ 'paddingLeft': paddingLeft }}
                    labelStyles={cx('label-btn')}
                    isLowerCase
                    rightIcon={hasChild && IcRight}
                    rightIconStyles={cx('right-icon')}
                    onPress={onClickItem}
                />
                {hasChild && expandedFlow.includes(positionItem.id) &&
                    positionItem?.children?.map((item, index) => {
                        return (
                            <div key={index}>
                                {renderDepartment(item, level + 1)}
                            </div>
                        );
                    })}
            </> : <></>;
        }, [choose, expandedFlow, onPositionPicked]);

        const renderViewBodyLeftBottom = useMemo(() => {
            return (
                <div className={cx('body-left-bottom-container')}>
                    <div className={cx('group-button')}>
                        {renderDepartment(department, 0)}
                    </div>
                </div>
            );
        }, [department, renderDepartment]);

        return (
            <div className={cx('view-body-left')}>
                <div className={cx('view-body-left-group')}>
                    <span className={cx('txt-group')}>{Languages.userManagement.groupUser}</span>
                    <MyTextInput
                        ref={refInputSearch}
                        rightIcon={IcSearch}
                        type={TYPE_INPUT.TEXT}
                        styleIconRight={cx('right-icon-input')}
                        inputStyle={cx('input-styles')}
                        containerInput={cx('container-input')}
                        placeHolder={Languages.userManagement.search}
                        styleGroup={cx('input-group')}
                        value={valueSearch}
                        maxLength={50}
                        onClickRightIcon={onClickSearch}
                    />
                </div>
                {renderViewBodyLeftBottom}
            </div>
        );
    });

export default RightsGroupComponent;
