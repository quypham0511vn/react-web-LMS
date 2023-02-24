import { StorageKeys } from 'commons/constants';
import { PathGroups } from 'components/directory-path/types';
import { ContractModel } from 'models/contract-model';
import { PermissionGroupModel } from 'models/permission-group-model';
import { UserInfoModel } from 'models/user-model';
import { InfoSteps } from 'pages/contract';
class SessionManager {
    userInfo: UserInfoModel | undefined;

    accessToken: string | null | undefined;

    pathGroups: PathGroups | undefined;

    pathGroupStack: PathGroups[] | undefined;

    permissionGroups: PermissionGroupModel[] | undefined;

    contractInfo: ContractModel | undefined;

    stepsInfoContract: InfoSteps[] | undefined;

    initData() {
        this.accessToken = localStorage.getItem(StorageKeys.KEY_ACCESS_TOKEN);

        const tmpUserInfo = localStorage.getItem(StorageKeys.KEY_USER_INFO);
        this.userInfo = tmpUserInfo && JSON.parse(tmpUserInfo);
        const _pathGroups = localStorage.getItem(StorageKeys.KEY_PATH_GROUPS);
        this.pathGroups = _pathGroups && JSON.parse(_pathGroups);
        const _pathGroupStack = localStorage.getItem(StorageKeys.KEY_PATH_GROUPS_STACK);
        this.pathGroupStack = _pathGroupStack && JSON.parse(_pathGroupStack);
        const _permissionGroups = localStorage.getItem(StorageKeys.KEY_PERMISSION_GROUPS);
        this.permissionGroups = _permissionGroups && JSON.parse(_permissionGroups);
        const _contractInfo = localStorage.getItem(StorageKeys.KEY_CONTRACT_INFO);
        this.contractInfo = _contractInfo && JSON.parse(_contractInfo);
        const _stepsInfoContract = localStorage.getItem(StorageKeys.KEY_STEPS_INFO_CONTRACT);
        this.stepsInfoContract = _stepsInfoContract && JSON.parse(_stepsInfoContract);
    }

    setUserInfo(userInfo?: UserInfoModel) {
        this.userInfo = userInfo;
        if (userInfo) {
            localStorage.setItem(StorageKeys.KEY_USER_INFO, JSON.stringify(this.userInfo));
        } else {
            localStorage.removeItem(StorageKeys.KEY_USER_INFO);
        }
    }

    setAccessToken(token?: string) {
        this.accessToken = token;
        if (token) {
            localStorage.setItem(StorageKeys.KEY_ACCESS_TOKEN, token);
        } else {
            localStorage.removeItem(StorageKeys.KEY_ACCESS_TOKEN);
        }
    }

    setPathGroups(_paths?: PathGroups) {
        this.pathGroups = _paths;
        if (_paths) {
            localStorage.setItem(StorageKeys.KEY_PATH_GROUPS, JSON.stringify(this.pathGroups));
        } else {
            localStorage.removeItem(StorageKeys.KEY_PATH_GROUPS);
        }
    }

    setPathGroupStack(_path_stack?: PathGroups[]) {
        this.pathGroupStack = _path_stack;
        if (_path_stack) {
            localStorage.setItem(StorageKeys.KEY_PATH_GROUPS_STACK, JSON.stringify(this.pathGroupStack));
        } else {
            localStorage.removeItem(StorageKeys.KEY_PATH_GROUPS_STACK);
        }
    }

    setPermissionGroups(_permissionGroups?: PermissionGroupModel[]) {
        this.permissionGroups = _permissionGroups;
        if (_permissionGroups) {
            localStorage.setItem(StorageKeys.KEY_PERMISSION_GROUPS, JSON.stringify(this.permissionGroups));
        } else {
            localStorage.removeItem(StorageKeys.KEY_PERMISSION_GROUPS);
        }
    }

    setContractInfo(_contract?: ContractModel) {
        this.contractInfo = _contract;
        if (_contract) {
            localStorage.setItem(StorageKeys.KEY_CONTRACT_INFO, JSON.stringify(this.contractInfo));
        } else {
            localStorage.removeItem(StorageKeys.KEY_CONTRACT_INFO);
        }
    }

    setStepsInfoContract(_stepInfo?: InfoSteps[]) {
        this.stepsInfoContract = _stepInfo;
        if (_stepInfo) {
            localStorage.setItem(StorageKeys.KEY_STEPS_INFO_CONTRACT, JSON.stringify(this.stepsInfoContract));
        } else {
            localStorage.removeItem(StorageKeys.KEY_STEPS_INFO_CONTRACT);
        }
    }

    logout() {
        this.setUserInfo();
        this.setAccessToken();
        this.setPathGroups();
        this.setPermissionGroups();
        this.setPathGroupStack();
        this.setContractInfo();
        this.setStepsInfoContract();
    }
}

export default new SessionManager();
