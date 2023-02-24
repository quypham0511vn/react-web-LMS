import { PathGroups } from 'components/directory-path/types';
import { action, makeObservable, observable } from 'mobx';
import { PermissionGroupModel } from 'models/permission-group-model';
import sessionManager from './session-manager';

export class CommonManager {
    @observable pathGroups?: PathGroups = sessionManager.pathGroups;
    @observable pathGroupStack?: PathGroups[] = sessionManager.pathGroupStack;
    @observable permissionGroup?: PermissionGroupModel[] = sessionManager.permissionGroups;

    constructor() {
        makeObservable(this);
    }

    @action setPathGroups(_pathGroups: PathGroups) {
        this.pathGroups = _pathGroups;
    }

    @action setPathGroupStack(_pathGroupStack: PathGroups[]) {
        this.pathGroupStack = _pathGroupStack;
    }

    @action setPermissionGroups(_permissionGroups: PermissionGroupModel[]) {
        this.permissionGroup = _permissionGroups;
    }
}
