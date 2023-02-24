import { CommonManager } from './../../managers/common-manager';
import { ApiServices } from 'api';
import { UserManager } from 'managers/user-manager';
// import { UserInfoModel } from 'models/user-model';
import { makeObservable, observable } from 'mobx';
class AppStore {

    @observable userManager = new UserManager();
    @observable commonManager = new CommonManager();

    apiServices = new ApiServices();

    constructor() {
        // this.userManager.updateUserInfo({
        //     id: '11',
        //     name: 'Le Thuy Linh',
        //     email: 'email@tienngay.vn',
        //     phone: '0987654321',
        //     avatar: 'https://ci4.googleusercontent.com/proxy/73xT76DOVwgBOIRERRm7_gIWOIKHrqtjOGz20WCGSl3qGms40y9n9N6NgKOSXfm3oY4cpN6zO5_jjgKuJ3RKaFOLu56RsSTLhHSXAFRfaT7uR-mvIYzEJQTYi7mVlykGa36IZ2i7whXSyrsm2g=s0-d-e1-ft#https://service.tienngay.vn/uploads/avatar/1645690960-c015e46b3dd17f6a9f03b449ed4f9257.jpg',
        //     status: 'Active',
        //     updated_at: '2022-10-12',
        //     position: {
        //         id: '1',
        //         name: 'Lập trình viên',
        //         type: 1
        //     }
        // } as UserInfoModel);

        makeObservable(this);
    }

}

export type AppStoreType = AppStore;
export default AppStore;
