import { UserInfoModel } from 'models/user-model';
import { UserStatus } from 'commons/constants';

export const userInfoMock =
    {
        id: `1`,
        email: 'Duybx@tienngay.vn',
        name: 'Duy',
        phone: '0862319100',
        updated_at: '08-08-2021',
        status: Object.values(UserStatus)[Math.floor(Math.random() * Object.values(UserStatus).length)],
        avatar: 'https://ci4.googleusercontent.com/proxy/73xT76DOVwgBOIRERRm7_gIWOIKHrqtjOGz20WCGSl3qGms40y9n9N6NgKOSXfm3oY4cpN6zO5_jjgKuJ3RKaFOLu56RsSTLhHSXAFRfaT7uR-mvIYzEJQTYi7mVlykGa36IZ2i7whXSyrsm2g=s0-d-e1-ft#https://service.tienngay.vn/uploads/avatar/1645690960-c015e46b3dd17f6a9f03b449ed4f9257.jpg',
        position: {
            id: 'kd_1',
            name: 'Trưởng phòng giao dịch',
            type: 2
        },
        agent_group: {
            type: 2,
            agent: [{
                id: '1',
                name: '901 giải phóng',
                type: 1,
                address: '901 giải phóng, Hà Nội'
            }]
        }
    } as UserInfoModel
