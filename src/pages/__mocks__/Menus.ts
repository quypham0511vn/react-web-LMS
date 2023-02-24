import { MenuModel } from "models/menu-model";

export const menuMock =
    [
        {
            id: 'qlttkh',
            name: '1.Quản lý thông tin khách hàng',
            type: 1,
            parent_id: '1',
            level: 1,
            children: [
                {
                    id: 'qlttkh_1',
                    name: '1.1.Quản lý thông tin khách hàng 1',
                    type: 1,
                    parent_id: 'qlttkh',
                    level: 2,
                    path: '/'
                },
                {
                    id: 'qlttkh_2',
                    name: '1.2.Quản lý thông tin khách hàng 2',
                    type: 2,
                    parent_id: 'qlttkh',
                    level: 2,
                    children: [
                        {
                            id: 'qlttkh_2_1',
                            name: '1.2.1.Quản lý thông tin khách hàng 2-1',
                            type: 2,
                            parent_id: 'qlttkh_2',
                            level: 3,
                            path: '/userManagement'
                        },
                        {
                            id: 'qlttkh_2_2',
                            name: '1.2.2.Quản lý thông tin khách hàng 2-2',
                            type: 2,
                            path: '/contractDetail',
                            level: 3,
                            parent_id: 'qlttkh_2',
                        },
                    ]
                },
                {
                    id: 'qlttkh_3',
                    name: '1.3.Quản lý thông tin khách hàng 3',
                    type: 1,
                    level: 2,
                    parent_id: 'qlttkh',
                },
                {
                    id: 'qlttkh_4',
                    name: '1.4.Quản lý thông tin khách hàng 4',
                    type: 1,
                    level: 2,
                    parent_id: 'qlttkh',
                },
            ]
        },
        {
            id: 'qlhd',
            name: '2.Quản lý hợp đồng',
            type: 1,
            parent_id: '1',
            level: 1,
            children: [
                {
                    id: 'qlhd_1',
                    name: '2.1.Quản lý hợp đồng 1',
                    type: 1,
                    level: 2,
                    parent_id: 'qlhd',
                    path: '/userManagement'
                },
                {
                    id: 'qlhd_2',
                    name: '2.2.Quản lý hợp đồng 2',
                    type: 1,
                    level: 2,
                    parent_id: 'qlhd',
                },
                {
                    id: 'qlhd_3',
                    name: '2.3.Quản lý hợp đồng 3',
                    type: 1,
                    level: 2,
                    parent_id: 'qlhd',
                },
            ]
        },
        {
            id: 'qlbh',
            name: '3.Quản lý bảo hiểm',
            type: 1,
            parent_id: '1',
            level: 1,
            children: [
                {
                    id: 'qlbh_0',
                    name: '3.1.Quản lý bảo hiểm',
                    type: 1,
                    level: 2,
                    parent_id: 'qlbh',
                },
                {
                    id: 'qlbh_1',
                    name: '3.2.Quản lý bảo hiểm 1',
                    type: 1,
                    level: 2,
                    parent_id: 'qlbh',
                    children: [
                        {
                            id: 'qlbh_1_1',
                            name: '3.2.1.Quản lý bảo hiểm 1-1',
                            type: 1,
                            level: 3,
                            parent_id: 'qlbh_1',
                        },
                        {
                            id: 'qlbh_1_2',
                            name: '3.2.2.Quản lý bảo hiểm 1-2',
                            type: 1,
                            level: 3,
                            parent_id: 'qlbh_1',
                        }
                    ]
                },
                {
                    id: 'qlbh_2',
                    name: '3.3.Quản lý bảo hiểm 2',
                    type: 1,
                    level: 2,
                    parent_id: 'qlbh',
                },
                {
                    id: 'qlbh_3',
                    name: '3.4.Quản lý bảo hiểm 3',
                    type: 1,
                    level: 2,
                    parent_id: 'qlbh',
                }
            ]
        },
        {
            id: 'tt',
            name: '4.Thanh toán',
            type: 1,
            level: 1,
            path: '/userManagement',
            children: []
        },
        {
            id: 'k',
            name: '5.Khác',
            type: 1,
            level: 1,
            parent_id: '1',
            path: '/positionManagement',
            children: []
        },
        {
            id: 'ttt',
            name: '6.Tool thanh toán',
            type: 1,
            level: 1,
            parent_id: '1',
            children: [],
            path: '/contractList'
        }
    ] as MenuModel[]
