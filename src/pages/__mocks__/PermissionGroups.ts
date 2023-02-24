import { PermissionGroupModel } from "models/permission-group-model"
import { PermissionModel } from "models/permission-model"

export const permissionGroupsMock = [
    {
        id: 'kt_1',
        name: 'Kế toán',
        type: 1,
        permissions: [
            {
                id: 'kt_1_1',
                name: 'Xem hợp đồng vay',
                type: '1',
                selected: true
            },
            {
                id: 'kt_1_2',
                name: 'Tạo hợp đồng vay',
                type: '2'
            },
            {
                id: 'kt_1_3',
                name: 'Huỷ hợp đồng vay',
                type: '1',
                selected: true
            },
            {
                id: 'kt_1_4',
                name: 'Sửa hợp đồng vay',
                type: '2'
            },
            {
                id: 'kt_1_5',
                name: 'Upload chứng từ hợp đồng vay',
                type: '2'
            },
            {
                id: 'kt_1_6',
                name: 'Cửa hàng trưởng duyệt',
                type: '2'
            },
            {
                id: 'kt_1_7',
                name: 'Gửi duyệt cho cửa hàng trưởng',
                type: '1',
                selected: true
            },
            {
                id: 'kt_1_8',
                name: 'Cập nhật hợp đồng MEGADOC',
                type: '2'
            },
            {
                id: 'kt_1_9',
                name: 'Tạo đơn miễn giảm',
                type: '2'
            }
        ]
    },
    {
        id: 'asm_1',
        name: 'ASM miền Bắc',
        type: 2,
        permissions: [
            {
                id: 'asm_1_1',
                name: 'Xem hợp đồng vay asm',
                type: '2'
            },
            {
                id: 'asm_1_2',
                name: 'Tạo hợp đồng vay asm',
                type: '2'
            },
            {
                id: 'asm_1_3',
                name: 'Huỷ hợp đồng vay asm',
                type: '2'
            },
            {
                id: 'asm_1_4',
                name: 'Sửa hợp đồng vay asm',
                type: '2'
            },
            {
                id: 'asm_1_5',
                name: 'Upload chứng từ hợp đồng vay asm',
                type: '2'
            },
            {
                id: 'asm_1_6',
                name: 'Cửa hàng trưởng duyệt asm',
                type: '1',
                selected: true
            },
            {
                id: 'asm_1_7',
                name: 'Gửi duyệt cho cửa hàng trưởng asm',
                type: '1',
                selected: true
            }
        ]
    },
    {
        id: 'kd_1',
        name: 'Trưởng phòng giao dịch',
        type: 3,
        permissions: [
            {
                id: 'kd_1_1',
                name: 'Xem hợp đồng vay',
                type: '1'
            },
            {
                id: 'kd_1_2',
                name: 'Tạo hợp đồng vay',
                type: '2'
            },
            {
                id: 'kd_1_3',
                name: 'Huỷ hợp đồng vay',
                type: '1'
            },
            {
                id: 'kd_1_4',
                name: 'Sửa hợp đồng vay',
                type: '2'
            },
            {
                id: 'kd_1_5',
                name: 'Upload chứng từ hợp đồng vay',
                type: '2'
            },
            {
                id: 'kd_1_6',
                name: 'Cửa hàng trưởng duyệt',
                type: '1'
            },
            {
                id: 'kd_1_7',
                name: 'Gửi duyệt cho cửa hàng trưởng',
                type: '1'
            },
            {
                id: 'kd_1_8',
                name: 'Cập nhật hợp đồng MEGADOC',
                type: '2'
            },
            {
                id: 'kd_1_9',
                name: 'Tạo đơn miễn giảm',
                type: '1'
            }
        ]
    },
    {
        id: 'kd_2',
        name: 'Chuyên viên kinh doanh',
        type: 3,
        permissions: [
            {
                id: 'kd_1_1',
                name: 'Xem hợp đồng vay',
                type: '1'
            },
            {
                id: 'kd_1_2',
                name: 'Tạo hợp đồng vay',
                type: '2'
            },
            {
                id: 'kd_1_3',
                name: 'Huỷ hợp đồng vay',
                type: '1'
            },
            {
                id: 'kd_1_4',
                name: 'Sửa hợp đồng vay',
                type: '2'
            },
            {
                id: 'kd_1_5',
                name: 'Upload chứng từ hợp đồng vay',
                type: '2'
            },
            {
                id: 'kd_1_6',
                name: 'Cửa hàng trưởng duyệt',
                type: '1'
            },
            {
                id: 'kd_1_7',
                name: 'Gửi duyệt cho cửa hàng trưởng',
                type: '1'
            },
            {
                id: 'kd_1_8',
                name: 'Cập nhật hợp đồng MEGADOC',
                type: '2'
            },
            {
                id: 'kd_1_9',
                name: 'Tạo đơn miễn giảm',
                type: '1'
            }
        ]
    }
] as PermissionGroupModel[]

export const permissionMock = [
    {
        id: 'kd_1_3',
        name: 'Huỷ hợp đồng vay1',
    },
    {
        id: 'kd_1_4',
        name: 'Sửa hợp đồng vay1',
    },
    {
        id: 'kd_1_5',
        name: 'Upload chứng từ hợp đồng vay1',
    },
    {
        id: 'kd_1_6',
        name: 'Cửa hàng trưởng duyệt1',
    },
    {
        id: 'kd_1_7',
        name: 'Gửi duyệt cho cửa hàng trưởng1',
    },
    {
        id: 'kd_1_8',
        name: 'Cập nhật hợp đồng MEGADOC1',
    },
    {
        id: 'kd_1_9',
        name: 'Tạo đơn miễn giảm1',
    },
    {
        id: 'kt_1_1',
        name: 'Xem hợp đồng vay',
    },
    {
        id: 'kt_1_2',
        name: 'Tạo hợp đồng vay',
    },
    {
        id: 'kt_1_3',
        name: 'Huỷ hợp đồng vay',
    },
    {
        id: 'kt_1_4',
        name: 'Sửa hợp đồng vay',
    },
    {
        id: 'kt_1_5',
        name: 'Upload chứng từ hợp đồng vay',
    },
    {
        id: 'kt_1_6',
        name: 'Cửa hàng trưởng duyệt',
    },
    {
        id: 'kt_1_7',
        name: 'Gửi duyệt cho cửa hàng trưởng',
    },
    {
        id: 'kt_1_8',
        name: 'Cập nhật hợp đồng MEGADOC',
    },
    {
        id: 'kt_1_9',
        name: 'Tạo đơn miễn giảm',
    },
    {
        id: 'asm_1_1',
        name: 'Xem hợp đồng vay asm',
    },
    {
        id: 'asm_1_2',
        name: 'Tạo hợp đồng vay asm',
    },
    {
        id: 'asm_1_3',
        name: 'Huỷ hợp đồng vay asm',
    },
    {
        id: 'asm_1_4',
        name: 'Sửa hợp đồng vay asm',
    },
    {
        id: 'asm_1_5',
        name: 'Upload chứng từ hợp đồng vay asm',
    },
    {
        id: 'asm_1_6',
        name: 'Cửa hàng trưởng duyệt asm',
    },
    {
        id: 'asm_1_7',
        name: 'Gửi duyệt cho cửa hàng trưởng asm',
    }
] as PermissionModel[]
