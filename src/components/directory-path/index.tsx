import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import classNames from 'classnames/bind';
import { useAppStore } from 'hooks';
import sessionManager from 'managers/session-manager';
import React, { useEffect, useMemo, useState } from 'react';
import styles from './directory-paths.module.scss';
import { DirectoryPathActions, DirectoryPathProps, PathGroups } from './types';

const cx = classNames.bind(styles);

const DirectoryPath = React.forwardRef<DirectoryPathActions, DirectoryPathProps>((
    { labelStyles, containStyles }: DirectoryPathProps
) => {

    const { commonManager } = useAppStore();
    const [paths, setPaths] = useState<PathGroups>();
    let home = {
        id: '0',
        level: 0,
        name: 'Home',
        path: '/'
    };

    useEffect(() => {
        if (commonManager?.pathGroups) {
            setPaths(commonManager?.pathGroups);
        }
    }, [commonManager?.pathGroups]);

    useEffect(() => {
        // action goBack,goForward
        window.onpopstate = (event: any) => {
            if (commonManager?.pathGroups && commonManager?.pathGroupStack) {
                for (let i = commonManager?.pathGroupStack?.length - 1; i >= 0; i--) {
                    // save web path to local when pressing - event.target.location.pathname: destination path 
                    if (commonManager?.pathGroupStack[i].children[commonManager?.pathGroupStack[i].children.length - 1].path === event.target.location.pathname) {
                        commonManager.setPathGroups(commonManager.pathGroupStack[i]);
                        sessionManager.setPathGroups(commonManager.pathGroupStack[i]);
                        return;
                    }
                }
            }
        };
    }, [commonManager]);

    const renderPath = useMemo(() => {
        return (
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link
                    underline="hover"
                    key='1'
                    color="inherit"
                    href={home.path}
                    className={cx(`${containStyles}`, 'container')}
                >
                    <span className={cx(`${labelStyles}`, 'label-styles')}>{home.name}</span>
                </Link>
                {paths?.children?.map((_dataPaths, index) => {

                    const onNavigate = () => {
                        if (commonManager?.pathGroups && commonManager.pathGroups?.children.filter(_expandedFlow => _expandedFlow.id === _dataPaths.id).length > 0 && commonManager.pathGroups) {
                            commonManager.setPathGroups({ children: commonManager.pathGroups?.children.slice(0, commonManager.pathGroups?.children.findIndex(_expanded => _expanded.id === _dataPaths.id) + 1) });
                            sessionManager.setPathGroups({ children: commonManager.pathGroups?.children.slice(0, commonManager.pathGroups?.children.findIndex(_expanded => _expanded.id === _dataPaths.id) + 1) });
                        }
                    };

                    return (
                        <Link
                            underline="hover"
                            key={index}
                            color="inherit"
                            href={_dataPaths.path}
                            className={cx(`${containStyles}`, 'container')}
                            onClick={_dataPaths.path ? onNavigate : () => console.log('paths null')}
                        >
                            <span className={cx(`${labelStyles}`, 'label-styles')}>{_dataPaths.name}</span>
                        </Link>
                    );
                })}
            </Breadcrumbs>
        );
    }, [commonManager, containStyles, home.name, home.path, labelStyles, paths?.children]);

    return (
        <Stack spacing={2}>
            {renderPath}
        </Stack>
    );
});

export default DirectoryPath;
