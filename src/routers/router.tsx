import Footer from 'components/footer';
import Header from 'components/header';
import MenuGroup from 'components/menu';
import { useAppStore } from 'hooks';
import OverlayLoader from 'pages/common/overlay-loader';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { publicRoutes, RouteProps } from './configs';
import styles from '../assets/scss/common.module.scss';
import { AppStoreProvider } from 'providers/app-provider';

const RouteWrapper = ({ ...props }: RouteProps): ReactElement => {
    const navigate = useNavigate();
    const { userManager } = useAppStore();

    useEffect(() => {
        window.scrollTo(0, 0);

        const isLoggedIn = !!userManager.userInfo;

        console.log(isLoggedIn);

        // if (!isLoggedIn && props.needAuth) {
        //     navigate(Paths.login);
        //     return;
        // }
    }, [navigate, props.needAuth, userManager.userInfo]);

    return (
        <Suspense fallback={<OverlayLoader />}>
            <div className={styles.body}>
                {props.hasHeader && <Header />}
                <div className={styles.content}>
                    {props.menu ? <MenuGroup component={<props.page />} /> : <props.page />}
                </div>
                {props.hasFooter && <Footer />}
            </div>
        </Suspense>
    );
};

const Router = () => {
    return (

        <BrowserRouter>
            <AppStoreProvider>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={<RouteWrapper {...route} />}
                            />
                        );
                    })}
                </Routes>
            </AppStoreProvider>
        </BrowserRouter>
    );
};
export default Router;
