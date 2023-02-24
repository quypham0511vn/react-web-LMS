import Languages from 'commons/languages';
import { ItemPropsModel } from 'models/item-props-model';
import { NotificationModel } from 'models/notifications-model';
import { Children } from 'react';
import { Paths } from 'routers/paths';

export const dataTestMenu = [
    {
        id: '1',
        title: Languages.menu.salesInfo,
        path: Paths.home,
        key: 'a',
        options: [
            {
                label: 'Quản lý bảo hiểm',
                key: 'Quản lý bảo hiểm',
                children: [
                    {
                        key: 'Quản lý user',
                        label: 'Quản lý User',
                    },
                    {
                        key: 'Quản lý user1',
                        label: 'Quản lý user1',
                    }
                ]
            },
            {
                label: '2nd menu item',
                key: '2'
            },
            {
                label: '3rd menu item',
                key: '3'
            }
        ]
    },
    {
        id: '2',
        title: Languages.menu.contract,
        path: Paths.contract,
        options: [
        ]
    },
    {
        id: '4',
        title: Languages.menu.payment,
        path: Paths.profile,
        options: [
        ]
    },
    {
        id: '5',
        title: Languages.menu.other,
        path: Paths.home,
        options: [
        ]
    }, {
        id: '6',
        title: Languages.menu.calculateTool,
        path: Paths.home,
        options: [
        ]
    }
]

export const dataDecentralization = [
    {
        id: '1',
        name: 'Admin'
    },
    {
        id: '2',
        name: 'Chuyên viên kinh doanh'
    },
    {
        id: '3',
        name: 'Hội sở'
    },
    {
        id: '3',
        name: 'Phê duyệt'
    },
    {
        id: '4',
        name: 'Trưởng phòng giao dịch'
    },
    {
        id: '5',
        name: 'Vận hành'
    },
    {
        id: '7',
        name: 'Thu hồi nợ miền nam1'
    }
    ,
    {
        id: '8',
        name: 'Thu hồi nợ miền nam212dqw'
    }
    ,
    {
        id: '9',
        name: 'Thu hồi nợ miền nam123ewd'
    }
    ,
    {
        id: '10',
        name: 'Thu hồi nợ miền namsdasd1'
    }
    ,
    {
        id: '11',
        name: 'Thu hồi nợ miền nam23123'
    }
    ,
    {
        id: '12',
        name: 'Thu hồi nợ miền nam12312123'
    }
    ,
    {
        id: '13',
        name: 'Thu hồi nợ miền nam12312'
    }
    ,
    {
        id: '14',
        name: 'Thu hồi nợ miền nam42'
    },
    {
        id: '15',
        name: 'Thu hồi nợ miền nam312'
    }
    ,
    {
        id: '16',
        name: 'Thu hồi nợ miền nam1212'
    }
    ,
    {
        id: '17',
        name: 'Thu hồi nợ miền namaw1'
    }
    ,
    {
        id: '18',
        name: 'Thu hồi nợ miền namasdas'
    },
    {
        id: '19',
        name: 'Thu hồi nợ miền namsdas'
    }
    ,
    {
        id: '20',
        name: 'Thu hồi nợ miền namas'
    }
    ,
    {
        id: '21',
        name: 'Thu hồi nợ miềấn nama'
    },
    {
        id: '22',
        name: 'Thu hồi nợ mádasiền nama'
    },
    {
        id: '23',
        name: 'Thu hồi nợádas miền nama'
    },
    {
        id: '24',
        name: 'Thu hồi nợ miadsasền nama'
    },
    {
        id: '25',
        name: 'Thu hồi nợ d nama'
    }
]

export const donationGroup = [
    {
        id: 1,
        title: 'Admin'
    },
    {
        id: 2,
        title: 'Chuyên viên kinh doanh'
    },
    {
        id: 3,
        title: 'Trưởng phòng giao dịch'
    },
    {
        id: 4,
        title: 'Field thu hồi nợ miền Nam	'
    },
    {
        id: 5,
        title: 'Lead THN Miền Nam'
    },
    {
        id: 6,
        title: 'Call thu hồi nợ miền Bắc'
    },
    {
        id: 7,
        title: 'Call thu hồi nợ miền Nam'
    },
    {
        id: 8,
        title: 'Nguồn vốn đầu tư'
    },
    {
        id: 9,
        title: 'Telesales - Kinh doanh'
    },
    {
        id: 10,
        title: 'ASM Fintechser'
    },
    {
        id: 11,
        title: 'ASM Fintechser'
    },
    {
        id: 12,
        title: 'Kế toán trưởng'
    },
    {
        id: 13,
        title: 'Kế toán'
    },
    {
        id: 14,
        title: 'TBP Telesale'
    },
    {
        id: 15,
        title: 'Thu hồi nợ'
    },
    {
        id: 16,
        title: 'Kế toán'
    }
]
export const listUser = [
    {
        id: 1,
        title: 'Chuyên viên kinh doanh',
        option: [
            {
                id: 1,
                title: 'Xem hợp đồng vay'
            },
            {
                id: 2,
                title: 'Tạo hợp đồng vay'
            },
            {
                id: 3,
                title: 'Hủy hợp đồng vay'
            },
            {
                id: 4,
                title: 'Sửa hợp đồng vay'
            },
            {
                id: 5,
                title: 'Upload chứng từ hợp đòng vay'
            },
            {
                id: 6,
                title: 'Cửa hàng trưởng duyệt'
            }
        ]
    },
    {
        id: 2,
        title: 'Chuyên viên kinh doanh',
        option: [
            {
                id: 1,
                title: 'Xem hợp đồng vay'
            },
            {
                id: 2,
                title: 'Tạo hợp đồng vay'
            },
            {
                id: 3,
                title: 'Hủy hợp đồng vay'
            },
            {
                id: 4,
                title: 'Sửa hợp đồng vay'
            },
            {
                id: 5,
                title: 'Upload chứng từ hợp đòng vay'
            },
            {
                id: 6,
                title: 'Cửa hàng trưởng duyệt'
            }
        ]
    },
    {
        id: 3,
        title: 'Trưởng phòng giao dịch',
        option: [
            {
                id: 1,
                title: 'Xem hợp đồng vay'
            },
            {
                id: 2,
                title: 'Tạo hợp đồng vay'
            },
            {
                id: 3,
                title: 'Hủy hợp đồng vay'
            },
            {
                id: 4,
                title: 'Sửa hợp đồng vay'
            },
            {
                id: 5,
                title: 'Upload chứng từ hợp đòng vay'
            },
            {
                id: 6,
                title: 'Cửa hàng trưởng duyệt'
            }
        ]
    },
]
export const notificationsData = [
    {
        id: 1,
        id_contract: '1001210112',
        content: 'Hoangtt@tienngay.vn đã huỷ hợp đồng',
        date: '12:00:00 12/12/2022',
        state: true
    },
    {
        id: 2,
        id_contract: '1001210112',
        content: 'Hoangtt@tienngay.vn đã huỷ hợp đồng',
        date: '12:00:00 12/12/2022',
        state: false
    },
    {
        id: 3,
        id_contract: '1001210112',
        content: 'Hoangtt@tienngay.vn đã huỷ hợp đồng',
        date: '12:00:00 12/12/2022',
        state: true
    },
    {
        id: 4,
        id_contract: '1001210112',
        content: 'Hoangtt@tienngay.vn đã huỷ hợp đồng',
        date: '12:00:00 12/12/2022',
        state: true
    },
    {
        id: 5,
        id_contract: '1001210112',
        content: 'Hoangtt@tienngay.vn đã huỷ hợp đồng',
        date: '12:00:00 12/12/2022',
        state: false
    },
    {
        id: 6,
        id_contract: '1001210112',
        content: 'Hoangtt@tienngay.vn đã huỷ hợp đồng',
        date: '12:00:00 12/12/2022',
        state: false
    },
    {
        id: 7,
        id_contract: '1001210112',
        content: 'Hoangtt@tienngay.vn đã huỷ hợp đồng',
        date: '12:00:00 12/12/2022',
        state: true
    },
    {
        id: 8,
        id_contract: '1001210112',
        content: 'Hoangtt@tienngay.vn đã huỷ hợp đồng',
        date: '12:00:00 12/12/2022',
        state: true
    },
] as NotificationModel[]

export const telephoneData = [
    {
        id: 1,
        title: '1'
    },
    {
        id: 2,
        title: '2'
    },
    {
        id: 3,
        title: '3'
    },
    {
        id: 4,
        title: '4'
    },
    {
        id: 5,
        title: '5'
    },
    {
        id: 6,
        title: '6'
    },
    {
        id: 7,
        title: '7'
    },
    {
        id: 8,
        title: '8'
    },
    {
        id: 9,
        title: '9'
    },
    {
        id: 10,
        title: '*'
    },
    {
        id: 11,
        title: '0'
    },
    {
        id: 12,
        title: '#'
    },
] as ItemPropsModel[]

export const dataCheckBox = [
    {
        id: '1',
        label: 'Kế toán',
        type: false,
        children: [
            {
                id: '1',
                title: 'Xem hợp đồng vay',
                type: '1'
            },
            {
                id: '2',
                title: 'Tạo hợp đồng vay',
                type: '2'
            },
            {
                id: '3',
                title: 'Huỷ hợp đồng vay',
                type: '1'
            },
            {
                id: '4',
                title: 'Sửa hợp đồng vay',
                type: '2'
            },
            {
                id: '5',
                title: 'Upload chứng từ hợp đồng vay',
                type: '2'
            },
            {
                id: '6',
                title: 'Cửa hàng trưởng duyệt',
                type: '1'
            },
            {
                id: '7',
                title: 'Gửi duyệt cho cửa hàng trưởng',
                type: '1'
            },
            {
                id: '8',
                title: 'Cập nhật hợp đồng MEGADOC',
                type: '2'
            },
            {
                id: '9',
                title: 'Tạo đơn miễn giảm',
                type: '1'
            }
        ]
    }
]

export const dataCN = {
    id: '2',
    label: 'Công nghệ',
    type: true,
    children: [
        {
            id: '1',
            title: 'Xem hợp đồng vay',
            type: '2'
        },
        {
            id: '2',
            title: 'Tạo hợp đồng vay',
            type: '2'
        },
        {
            id: '3',
            title: 'Huỷ hợp đồng vay',
            type: '2'
        },
        {
            id: '4',
            title: 'Sửa hợp đồng vay',
            type: '2'
        },
        {
            id: '5',
            title: 'Upload chứng từ hợp đồng vay',
            type: '2'
        },
        {
            id: '6',
            title: 'Cửa hàng trưởng duyệt',
            type: '2'
        },
        {
            id: '7',
            title: 'Gửi duyệt cho cửa hàng trưởng',
            type: '2'
        }
    ]
}

export const transaction = [
    {
        id: 1,
        title: '901 giải phóng',
        type: '1'

    },
    {
        id: 2,
        title: '21DA Lê Văn Lương',
        type: '1'

    },
    {
        id: 3,
        title: '901 giải phóng',
        type: '2'
    },
    {
        id: 4,
        title: '901 giải phóng',
        type: '2'
    },
    {
        id: 5,
        title: '901 giải phóng',
        type: '1'
    },
    {
        id: 6,
        title: '901 giải phóng',
        type: '2'
    },
    {
        id: 7,
        title: '901 giải phóng',
        type: '1'
    },
    {
        id: 8,
        title: '901 giải phóng',
        type: '1'
    },
    {
        id: 9,
        title: '901 giải phóng',
        type: '2'
    },
    {
        id: 10,
        title: '901 giải phóng',
        type: '1'
    },
    {
        id: 12,
        title: '21DA Lê Văn Lương',
        type: '1'
    },
    {
        id: 13,
        title: '21DA Lê Văn Lương',
        type: '1'
    },
    {
        id: 14,
        title: '21DA Lê Văn Lương',
        type: '1'
    },
    {
        id: 15,
        title: '21DA Lê Văn Lương',
        type: '1'
    },
    {
        id: 16,
        title: '21DA Lê Văn Lương',
        type: '1'
    }

]

export const dataPosition = [
    {
        label: 'ASM miền Bắc',
        key: '1',
        children: [],
        choose: {
            is_choose: 1,
            label_choose: []
        }
    },
    {
        label: 'Chuyên viên kinh doanh',
        key: '2',
        children: [],
        choose: {
            is_choose: 2,
            label_choose: []
        }
    },
    {
        label: 'Trưởng phòng giao dịch',
        key: '3',
        children: [],
        choose: {
            is_choose: 2,
            label_choose: []
        }
    },
    {
        label: 'Kế toán',
        key: '4',
        children: [
            {
                key: '4-1',
                label: 'Kế toán 1',
                children: [],
                choose: {
                    is_choose: 0,
                    label_choose: []
                }
            },
            {
                key: '4-2',
                label: 'Kế toán 2',
                children: [],
                choose: {
                    is_choose: 0,
                    label_choose: []
                }
            }
        ],
        choose: {
            is_choose: 0,
            label_choose: []
        }
    },
    {
        label: 'Công nghệ',
        key: '5',
        children: [
            {
                key: '5-1',
                label: 'Công nghệ 1',
                children: [
                    {
                        key: '5-1-1',
                        label: 'Công nghệ 1-1',
                        children: [],
                        choose: {
                            is_choose: 0,
                            label_choose: []
                        }
                    },
                    {
                        key: '5-1-2',
                        label: 'Công nghệ 1-2',
                        children: [],
                        choose: {
                            is_choose: 0,
                            label_choose: []
                        }
                    }
                ]
            },
            {
                key: '5-2',
                label: 'Công nghệ 2',
                children: [],
                choose: {
                    is_choose: 0,
                    label_choose: []
                }
            },
            {
                key: '5-3',
                label: 'Công nghệ 3',
                children: [],
                choose: {
                    is_choose: 0,
                    label_choose: []
                }
            }
        ],
        choose: {
            is_choose: 0,
            label_choose: []
        }
    }
];


export const dataChooses = [
    {
        label: 'ASM miền Bắc',
        key: '1',
        children: [],
        choose: {
            is_choose: 1,
            label_choose: []
        }
    },
    {
        label: 'Chuyên viên kinh doanh',
        key: '2',
        children: [],
        choose: {
            is_choose: 2,
            label_choose: []
        }
    },
    {
        label: 'Trưởng phòng giao dịch',
        key: '3',
        children: [],
        choose: {
            is_choose: 2,
            label_choose: []
        }
    },
    {
        label: 'Kế toán',
        key: '4',
        children: [
            {
                key: '4-1',
                label: 'Kế toán 1',
                children: []
            },
            {
                key: '4-2',
                label: 'Kế toán 2',
                children: []
            }
        ],
        choose: {
            is_choose: 0,
            label_choose: []
        }
    },
    {
        label: 'Công nghệ',
        key: '5',
        children: [
            {
                key: '5-1',
                label: 'Công nghệ 1',
                children: [
                    {
                        key: '5-1-1',
                        label: 'Công nghệ 1-1',
                        children: []
                    },
                    {
                        key: '5-1-2',
                        label: 'Công nghệ 1-2',
                        children: []
                    }
                ]
            },
            {
                key: '5-2',
                label: 'Công nghệ 2',
                children: []
            },
            {
                key: '5-3',
                label: 'Công nghệ 3',
                children: []
            }
        ],
        choose: {
            is_choose: 0,
            label_choose: []
        }
    }
]
export const datatest = [

    {
        label: 'ASM miền Bắc',
        key: '1',
        children: [],
        choose: {
            is_choose: 1,
            label_choose: []
        }
    },
    {
        label: 'Chuyên viên kinh doanh',
        key: '2',
        children: [],
        choose: {
            is_choose: 2,
            label_choose: []
        }
    },
    {
        label: 'Trưởng phòng giao dịch',
        key: '3',
        children: [],
        choose: {
            is_choose: 2,
            label_choose: []
        }
    }
]

export const contract = [
    {
        id : 1,
        title : 'Thông tin khách hàng',
        children:[
            {
                key:1,
                title:'Tên khách hàng',
                label:'Nguyễn Trần Đăng An Liên '
            },
            {
                key:2,
                title:'Giới tính',
                label:'Nam'
            },
            {
                key:3,
                title:'Năm sinh',
                label:'12/11/1999'
            },
            {
                key:4,
                title:'Số CMND/CCCD hiện tại',
                label:'171282204'
            },
            {
                key:5,
                title:'Số điện thoại',
                label:'0963326985'
            },
            {
                key:6,
                title:'Tình trạng hôn nhân',
                label:'Đã kết hôn'
            },
            {
                key:7,
                title:'Địa chỉ đang ở',
                label:'Thường trú: 52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            },
            {
                key:8,
                title:'Địa chỉ hộ khẩu',
                label:'52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            },
            {
                key:9,
                title:'Thông việc việc làm',
                label:'Công ty Cổ Phần Tài chính Việt'
            },
            {
                key:10,
                title:'Địa chỉ',
                label:'52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            },
            {
                key:11,
                title:'Người tham chiếu 1',
                label:'Bố: Nguyễn Cao Kỳ Lân'
            },
            {
                key:12,
                title:'Địa chỉ',
                label:'52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            },
            {
                key:13,
                title:'Người tham chiếu 2',
                label:'Đồng nghiệp: Nguyễn Cao Kỳ Lân'
            },
            {
                key:14,
                title:'Địa chỉ',
                label:'52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            }
        ]
    },
    {
        id : 2,
        title : 'Thông tin khoản vay',
        children:[
            {
                key:1,
                title:'Hình thức vay',
                label:'Cho vay'
            },
            {
                key:2,
                title:'Loai tài sản',
                label:'Ô tô'
            },
            {
                key:3,
                title:'Sản phẩm vay',
                label:'Vay nhanh xe máy'
            },
            {
                key:4,
                title:'Tên tài sản',
                label:'Xe dream'
            },
            {
                key:5,
                title:'Số tiền tối đa có thể vay',
                label:'35.000.000'
            },
            {
                key:6,
                title:'Số tiền vay',
                label:'20.000.000'
            },
            {
                key:7,
                title:'Hìn thức trả lãi',
                label:'Dư nợ giảm dần'
            },
            {
                key:8,
                title:'Thời gian vay',
                label:'6 tháng'
            },
            {
                key:9,
                title:'Bảo hiểm khoản vay',
                label:'CMIC - 1.000.000'
            },
        ]
    },
    {
        id : 3,
        title : 'Thông tin giải ngân',
        children:[
            {
                key:1,
                title:'Hình thức',
                label:'Tài khoản ngân hàng'
            },
            {
                key:2,
                title:'Ngân hàng',
                label:'Ngân hàng công nghệ Sài Gòn'
            },
            {
                key:3,
                title:'Chi Nhánh',
                label:'Hà Nội'
            },
            {
                key:4,
                title:'Chủ tài khoản',
                label:'Lê Thị Thuỳ Linh'
            },
            {
                key:5,
                title:'Số tài khoản',
                label:'0963326985'
            },
            {
                key:6,
                title:'Phòng giao dịch',
                label:'133 Phạm Văn Đồng'
            }
            
        ]
    },
    {
        id : 4,
        title : 'Thông tin thẩm định',
        children:[
            {
                key:1,
                title:'Tên khách hàng',
                label:'Nguyễn Trần Đăng An Liên '
            },
            {
                key:2,
                title:'Giới tính',
                label:'Nam'
            },
            {
                key:3,
                title:'Năm sinh',
                label:'12/11/1999'
            },
            {
                key:4,
                title:'Số CMND/CCCD hiện tại',
                label:'171282204'
            },
            {
                key:5,
                title:'Số điện thoại',
                label:'0963326985'
            },
            {
                key:6,
                title:'Tình trạng hôn nhân',
                label:'Đã kết hôn'
            },
            {
                key:7,
                title:'Địa chỉ đang ở',
                label:'Thường trú: 52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            },
            {
                key:8,
                title:'Địa chỉ hộ khẩu',
                label:'52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            },
            {
                key:9,
                title:'Thông việc việc làm',
                label:'Công ty Cổ Phần Tài chính Việt'
            },
            {
                key:10,
                title:'Địa chỉ',
                label:'52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            },
            {
                key:11,
                title:'Người tham chiếu 1',
                label:'Bố: Nguyễn Cao Kỳ Lân'
            },
            {
                key:12,
                title:'Địa chỉ',
                label:'52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            },
            {
                key:13,
                title:'Người tham chiếu 2',
                label:'Đồng nghiệp: Nguyễn Cao Kỳ Lân'
            },
            {
                key:14,
                title:'Địa chỉ',
                label:'52A đường Phú Vinh, phường Phú Sơn, thành phố Thanh Hoa, tỉnh Thanh Hoá'
            }
        ]
    }
]

export const dt = [
   {
    id: 1,
    title: 'Bank account',
    value: 'Tài khoản ngân hàng'
   },
   {
    id: 2,
    title: 'Card',
    value: 'Thẻ ATM'
   },
   
] as ItemPropsModel[]

export const bankMock = [
    {
        id: 1,
        title: 'Bank1',
        value: 'VPBank'
       },
       {
        id: 2,
        title: 'Bank2',
        value: 'BIDV'
       },
       {
        id: 3,
        title: 'Bank3',
        value: 'vietcombank'
       },
]

export const infoCustomer = [
  {
    id :1,
    title : 'Thông tin khách hàng',
    Children :[
        {
            id: 1,
            title: 'Tên khách hàng',
            label: 'Nguyễn Trần Đăng An Liêm'
        },
        {
            id: 2,
            title: 'Email',
            label: 'lanltt@tienngay.vn'
        },
        {
            id: 3,
            title: 'Ngày sinh',
            label: '06/01/2021'
        },
        {
            id: 4,
            title: 'Giới tính',
            label: 'Nam'
        },
        {
            id: 5,
            title: 'Số điện thoại',
            label: '0961****39'
        },
        {
            id: 6,
            title: 'Số CMND/CCCD hiện tại',
            label: '0961152547'
        },
        {
            id: 7,
            title: 'Ngày cấp',
            label: '27/09/2021'
        },
        {
            id: 8,
            title: 'Nơi cấp',
            label: 'Hà Nội'
        },
        {
            id: 9,
            title: 'Blacklist',
            label: 'Không'
        },
        {
            id: 10,
            title: 'Nguồn khác hàng',
            label: 'Digital'
        }
    ]
  },
  {
    id :2,
    title : 'Địa chỉ hộ khẩu',
    Children :[
        {
            id: 1,
            title: 'Tỉnh/Thành phố',
            label: 'Thành phố Hà Nội'
        },
        {
            id: 2,
            title: 'Quận/Huyện',
            label: 'Đống Đa'
        },
        {
            id: 3,
            title: 'Phường/Xã',
            label: 'Phường Khương Thượng'
        },
        {
            id: 4,
            title: 'Thôn/Xóm/Tổ',
            label: 'P101,dãy nhà D,ngõ B1.Đường Tôn Thất Tùng'
        },
    ]
  },
  {
    id :3,
    title : 'Địa chỉ đang ở',
    Children :[
        {
            id: 1,
            title: 'Tên khách hàng',
            label: 'Nguyễn Trần Đăng An Liêm'
        },
        {
            id: 2,
            title: 'Email',
            label: 'lanltt@tienngay.vn'
        },
        {
            id: 3,
            title: 'Ngày sinh',
            label: '06/01/2021'
        },
        {
            id: 4,
            title: 'Giới tính',
            label: 'Nam'
        },
       
 
    ]
  }
]

export const infoRelative = [
    {
        id: 1,
        title: 'Tên người tham chiếu 1',
        label: ' Lý Trọng Tấn'
    },
    {
        id: 2,
        title: 'Mối quan hệ ',
        label: 'Chồng'
    },
    {
        id: 3,
        title: 'Số điện thoại người thân',
        label: '0961****39'
    },
    {
        id: 4,
        title: 'Địa chỉ cư trú',
        label: 'HÀ NỘI'
    },
    {
        id: 5,
        title: 'Tên khách hàng',
        label: 'Nguyễn Trần Đăng An Liêm'
    },
    {
        id: 6,
        title: 'Phản hồi',
        label: 'Xác nhận chồng khách hàng.KH ở đúng địa chỉ cung cấp,đang làm lái xe taxi ở hãng Taxi Group Hà Nội.'
    },
    {
        id: 7,
        title: 'Thu nhâp',
        label: '7.000.000 vnđ'
    },
    {
        id: 8,
        title: 'Tên người tham chiếu 2',
        label: ' Lý Trọng Tấn'
    },
    {
        id: 9,
        title: 'Mối quan hệ',
        label: 'Mẹ'
    },
    {
        id: 10,
        title: 'Số điện thoại người thân',
        label: '0961****39'
    },
    {
        id: 11,
        title: 'Địa chỉ cư trú',
        label: 'HÀ NỘI'
    },
    {
        id: 12,
        title: 'Phản hồi',
        label: 'Xác nhận chồng khách hàng.KH ở đúng địa chỉ cung cấp,đang làm lái xe taxi ở hãng Taxi Group Hà Nội.'
    },
    {
        id: 13,
        title: 'Thu nhâp',
        label: '7.000.000 vnđ'
    },
    {
        id: 14,
        title: 'Tên người tham chiếu 3',
        label: ' Lý Trọng Tấn'
    },
    {
        id: 15,
        title: 'Số điện thoại người thân',
        label: '0961****39'
    },
    {
        id: 11,
        title: 'Mục đích tham chiếu',
        label: 'Nơi làm việc '
    },
    {
        id: 12,
        title: 'Phản hồi',
        label: 'Xác nhận em gái chị Thoa,chị Thoa đang lái taxi cho Taxi Group Hà Nội.Địa chỉ KH đúng như phiếu thông tin trong cung cấp '
    },
]
