import { Exception } from "models/contract-expertise-model";

export const ExceptionMock = [
    {
        id: 'e1',
        name: 'Ngoại lệ E1: Ngoại lệ về hồ sơ nhân thân',
        child: [
            {
                id: 'e1_1',
                id_parent: 'e1',
                name: 'E1.1: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e1_2',
                id_parent: 'e1',
                name: 'E1.2: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e1_3',
                id_parent: 'e1',
                name: 'E1.3: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            }
        ]
    },
    {
        id: 'e2',
        name: 'Ngoại lệ E2: Ngoại lệ về hồ sơ gia đình',
        child: [
            {
                id: 'e2_1',
                id_parent: 'e2',
                name: 'E2.1: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e2_2',
                id_parent: 'e2',
                name: 'E2.2: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e2_3',
                id_parent: 'e2',
                name: 'E2.3: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            }
        ]
    },
    {
        id: 'e3',
        name: 'Ngoại lệ E3: Ngoại lệ về hồ sơ cá nhân',
        child: [
            {
                id: 'e3_1',
                id_parent: 'e3',
                name: 'E3.1: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e3_2',
                id_parent: 'e3',
                name: 'E3.2: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e3_3',
                id_parent: 'e3',
                name: 'E3.3: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            }
        ]
    },
    {
        id: 'e4',
        name: 'Ngoại lệ E4: Ngoại lệ về hồ sơ siêu nhân',
        child: [
            {
                id: 'e4_1',
                id_parent: 'e4',
                name: 'E4.1: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e4_2',
                id_parent: 'e4',
                name: 'E4.2: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e4_3',
                id_parent: 'e4',
                name: 'E4.3: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            }
        ]
    },
    {
        id: 'e5',
        name: 'Ngoại lệ E5: Ngoại lệ về hồ sơ thiêu thân',
        child: [
            {
                id: 'e5_1',
                id_parent: 'e5',
                name: 'E5.1: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e5_2',
                id_parent: 'e5',
                name: 'E5.2: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            },
            {
                id: 'e5_3',
                id_parent: 'e5',
                name: 'E5.3: Ngoại lệ về giấy tờ định danh: CMND/CCCD mờ ảnh / mờ số không đủ điều kiện',
            }
        ]
    }
] as Exception[];
