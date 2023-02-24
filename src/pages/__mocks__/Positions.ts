import { PositionModel } from "models/position-model";

export const positionsMock = {
    id: 'tgd',
    name: 'Tổng Giám Đốc',
    type: 1,
    children: [
        {
            id: 'kd',
            name: 'Kinh Doanh',
            type: 1,
            parent_id: 'tgd',
            parent_name: 'Tổng giám đốc',
            children: [
                {
                    id: 'kd_0',
                    name: 'Giám Đốc Kinh Doanh',
                    type: 1,
                    parent_name: 'Kinh Doanh',
                    parent_id: 'kd',
                },
                {
                    id: 'asm',
                    name: 'ASM',
                    type: 2,
                    parent_id: 'kd',
                    parent_name: 'Kinh Doanh',
                    children: [
                        {
                            id: 'asm_1',
                            name: 'ASM Miền Bắc',
                            type: 2,
                            parent_id: 'asm',
                            parent_name: 'ASM'
                        },
                        {
                            id: 'asm_2',
                            name: 'ASM Miền Nam',
                            type: 2,
                            parent_id: 'asm',
                            parent_name: 'ASM'
                        }
                    ]
                },
                {
                    id: 'kd_1',
                    name: 'Trưởng phòng giao dịch',
                    type: 3,
                    parent_id: 'kd',
                    parent_name: 'Kinh Doanh',
                },
                {
                    id: 'kd_2',
                    name: 'Chuyên viên kinh doanh',
                    type: 3,
                    parent_id: 'kd',
                    parent_name: 'Kinh Doanh',
                },
            ]
        },
        {
            id: 'kt',
            name: 'Kế Toán',
            type: 1,
            parent_id: 'tgd',
            children: [
                {
                    id: 'kt_0',
                    name: 'Kế Toán Trưởng',
                    type: 1,
                    parent_id: 'kt',
                    parent_name: 'Kế toán'
                },
                {
                    id: 'kt_1',
                    name: 'Kế Toán 1',
                    type: 1,
                    parent_id: 'kt',
                    parent_name: 'Kế toán'
                },
                {
                    id: 'kt_2',
                    name: 'Kế Toán 2',
                    type: 1,
                    parent_id: 'kt',
                    parent_name: 'Kế toán'
                }
            ]
        },
        {
            id: 'cn',
            name: 'Công Nghệ',
            type: 1,
            parent_id: 'tgd',
            children: [
                {
                    id: 'cn_0',
                    name: 'Giám Đốc Công Nghệ',
                    type: 1,
                    parent_id: 'cn',
                    parent_name: 'Công Nghệ'
                },
                {
                    id: 'cn_1',
                    name: 'Trưởng Phòng Công Nghệ 1',
                    type: 1,
                    parent_id: 'cn',
                    parent_name: 'Công Nghệ',
                    children: [
                        {
                            id: 'cn_1_1',
                            name: 'Công Nghệ 1-1',
                            type: 1,
                            parent_id: 'cn_1',
                            parent_name: 'Trưởng phòng công nghệ 1'
                        },
                        {
                            id: 'cn_1_2',
                            name: 'Công Nghệ 1-2',
                            type: 1,
                            parent_id: 'cn_1',
                            parent_name: 'Trưởng phòng công nghệ 1'
                        }
                    ]
                },
                {
                    id: 'cn_2',
                    name: 'Trưởng Phòng Công Nghệ 2',
                    type: 1,
                    parent_id: 'cn',
                    parent_name: 'Công Nghệ'
                },
                {
                    id: 'cn_3',
                    name: 'Trưởng Phòng Công Nghệ 3',
                    type: 1,
                    parent_id: 'cn',
                    parent_name: 'Công Nghệ'
                }
            ]
        },
    ]

} as PositionModel
