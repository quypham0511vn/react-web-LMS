// Layouts

// Pages
import CreateUser from 'pages/create-user';
import Login from 'pages/auth/login';
import NotFound from 'pages/common/not-found';
import Contract from 'pages/contract';
import Profile from 'pages/profile';
import UserManagement from 'pages/user-management';
import { Paths } from './paths';
import PositionManagement from 'pages/position-management';
import CreatePosition from 'pages/position-management/create-position';
import ContractList from 'pages/contract/contract-list';
import ContractDetail from 'pages/contract/contract-detail';
export interface RouteProps {
    path: string;
    page: () => JSX.Element;
    hasHeader?: boolean;
    hasFooter?: boolean;
    needAuth?: boolean;
    menu?: boolean;
}

// Public routes
const publicRoutes = [
    //common
    { path: Paths.home, page: Login, hasHeader: true, hasFooter: true,menu: true },
    { path: Paths.any, page: NotFound, menu: true },

    //auth
    // { path: Paths.login, page: Login, hasHeader: true, menu: true },

    //contract
    { path: Paths.contract, page: Contract, hasHeader: true, hasFooter: true, menu: true },
    { path: Paths.profile, page: Profile, hasHeader: true, menu: true },
    { path: Paths.userManagement, page: UserManagement, hasHeader: true, hasFooter: true, menu: true },
    { path: Paths.createUser, page: CreateUser, hasHeader: true, hasFooter: true, menu: true },
    { path: Paths.positionManagement, page: PositionManagement, hasHeader: true, hasFooter: true, menu: true },
    { path: Paths.createPosition, page: CreatePosition, hasHeader: true, hasFooter: true, menu: true },
    { path: Paths.contractList, page: ContractList, hasHeader: true, hasFooter: true, menu: true },
    { path: Paths.contractDetail, page: ContractDetail, hasHeader: true, hasFooter: true, menu: true }
] as RouteProps[];

const privateRoutes = [];

export {
    publicRoutes,
    privateRoutes
};
