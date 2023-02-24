import { action, makeObservable, observable } from 'mobx';
import { DemoModel } from 'models/demo';

import { UserInfoModel } from 'models/user-model';
import SessionManager from './session-manager';

export class UserManager {
    @observable userInfo?: UserInfoModel = SessionManager.userInfo;
    @observable demo?: DemoModel = undefined;

    constructor() {
        makeObservable(this);
    }

    @action updateUserInfo(userInfo: any) {
        this.userInfo = userInfo;
        SessionManager.setUserInfo(userInfo);
    }

    @action updateDemo(demo: DemoModel) {
        this.demo = demo;
    }
}
