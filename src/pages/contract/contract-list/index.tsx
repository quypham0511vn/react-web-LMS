import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './contract-list.module.scss';
import { observer } from 'mobx-react';
import Languages from 'commons/languages';
import DirectoryPath from 'components/directory-path';
import { Button } from 'components/button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IcAddPermissions from 'assets/icon/ic_add_permissions.svg';
import IcPosition from 'assets/icon/ic_position.svg';
import IcSearch from 'assets/icon/ic_search.svg';
import IcExcel from 'assets/icon/ic_excel.svg';
import IcDelete from 'assets/icon/ic_delete.svg';
import PaginationRounded from 'components/pagination-rounded';
import { PAGE_SIZE } from 'commons/configs';
import { MyTextInput } from 'components/input';
import { TextFieldActions } from 'components/input/types';
import ModalSearchContract from 'components/modal-search-contract';
import { Box, Popper } from '@mui/material';
import { TYPE_INPUT } from 'commons/constants';

const tabs = [
    Languages.contract.tabs.allContract,
    Languages.contract.tabs.borrowing,
    Languages.contract.tabs.paymentOverdue,
    Languages.contract.tabs.paymentSettlement
];


enum SearchContract {
    transaction = 'transaction',
    property_type = 'property_type',
    property_name = 'property_name',
    from_date = 'from_date',
    to_date = 'to_date',
    active_status = 'active_status',
    contract_type = 'contract_type',
    loan_form = 'loan_form'
}

export type ContractModelTest = {
    id: string;
    position: PositionContract[];
    type: string;
    contract_code?: string;
    coupon_code: string;
    customer_name: string;
    customer_phone: string;
    customer_cccd: string;
    property: string;
    loan: string;
    status: string;
    form_of_interest_payment: string;
    time: string;
    transaction: string;
    creator: string;
    date_created: string;
    disbursement_date: string;
}

type PositionContract = {
    id: string;
    name_position: string;
}

function mockContractAll() {

    let _contract: ContractModelTest[] = [];

    for (let index = 0; index < 50; index++) {
        _contract.push({
            id: `${index}`,
            position: [
                {
                    id: '1',
                    name_position: 'Xem chi tiết'
                },
                {
                    id: '2',
                    name_position: 'Thanh toán thuế'
                },
                {
                    id: '3',
                    name_position: 'Chi tiết hợp đồng'
                },
                {
                    id: '4',
                    name_position: 'Ghi chú'
                }
            ],
            type: 'Hợp đồng giấy',
            contract_code: 'HĐCC/ĐKOTO/TTH202TT/2201/35/GH-01',
            coupon_code: '0000017272',
            customer_name: 'NGUYỄN XUÂN TƯỜNG',
            customer_phone: '0123456789',
            customer_cccd: '55555555',
            property: 'Ôtô Acura Mdx Sport 3.7 AT 2017 (Canada)',
            loan: '30.000.000',
            status: 'Đang vay',
            form_of_interest_payment: 'Dự nợ giảm dần',
            time: '30 tháng',
            transaction: '270 Trường Thi, Hà Nội',
            creator: 'quanpm@tienngay.vn',
            date_created: '15/09/2022',
            disbursement_date: '15/09/2022'
        });
    }

    return _contract;
}

function mockBorrowing() {

    let _contract: ContractModelTest[] = [];

    for (let index = 0; index < 30; index++) {
        _contract.push({
            id: `${index}`,
            position: [
                {
                    id: '1',
                    name_position: 'Xem chi tiết'
                },
                {
                    id: '2',
                    name_position: 'Sửa hợp đồng'
                },
                {
                    id: '3',
                    name_position: 'Chi tiết hợp đồng'
                },
                {
                    id: '4',
                    name_position: 'Ghi chú'
                }
            ],
            type: 'Hợp đồng điện tử',
            contract_code: 'HĐCC/ĐKOTO/TTH202TT/2201/35/GH-01',
            coupon_code: '0000017272',
            customer_name: 'Nguyễn Đình Dũng',
            customer_phone: '0123456789',
            customer_cccd: '55555555',
            property: 'Ôtô Acura Mdx Sport 3.7 AT 2017 (Canada)',
            loan: '30.000.000',
            status: 'Đang vay',
            form_of_interest_payment: 'Dự nợ giảm dần',
            time: '30 tháng',
            transaction: '270 Trường Thi, Hà Nội',
            creator: 'quanpm@tienngay.vn',
            date_created: '15/09/2022',
            disbursement_date: '15/09/2022'
        });
    }

    return _contract;
}

export type SearchModel = {
    transaction?: string;
    property_type?: string;
    property_name?: string;
    to_date?: string;
    from_date?: string;
    active_status?: string;
    contract_type?: string;
    loan_form?: string;
}

const cx = classNames.bind(styles);

const ContractList = observer(() => {

    const [chooseTabs, setChooseTabs] = useState<string>(tabs[0]);
    const [contractList, setContractList] = useState<ContractModelTest[]>([]);
    const [pages, setPage] = useState<number>(1);
    const [searchModal, setSearchModal] = useState<SearchModel>({});
    const refInputSearch = useRef<TextFieldActions>(null);
    const [valueSearch, setValueSearch] = useState<string>('');
    const [toggle, setToggle] = useState<boolean>(false);
    const refModalSearch = useRef<any>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);

    const PAGES_COUNT = Math.ceil(contractList?.length / PAGE_SIZE);

    useEffect(() => {
        setContractList(mockContractAll());
    }, []);

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };

    const addContract = useCallback(() => {

    }, []);

    const onChangeTextInput = useCallback((value: string, tag?: string) => {
        switch (tag) {
            case Languages.userManagement.search:
                setValueSearch(value);
                break;
            default:
                break;
        }
    }, []);

    const onModalSearch = useCallback(() => {
        refModalSearch.current?.showModal();
    }, []);

    const renderItemSearch = useCallback((text: string, title: string) => {

        const onClose = () => {
            setSearchModal(last => {
                for (let keys in last) {
                    if (`${keys}` === title) {
                        last[keys] = '';
                    }
                }
                return last;
            });
            setToggle(last => !last);
        };

        return (
            <div className={cx('item-search-container')}>
                <span className={cx('label')}>{text}</span>
                <img src={IcDelete} className={cx('img-delete')} onClick={onClose} />
            </div>
        );
    }, []);

    const onSuccessPress = useCallback((_data: SearchModel) => {
        setSearchModal(_data);
        setToggle(last => !last);
    }, []);

    const renderViewTabs = useMemo(() => {
        return (
            <div className={cx('container-tabs')}>
                {tabs.map((label, index) => {

                    const onChooseTabs = () => {
                        setChooseTabs(label);
                        switch (label) {
                            case tabs[0]:
                                return setContractList(mockContractAll());
                            case tabs[1]:
                                return setContractList(mockBorrowing());
                            default:
                                return;
                        }
                    };

                    return (
                        <Button
                            key={index}
                            label={label}
                            isLowerCase
                            containButtonStyles={chooseTabs === label ?
                                cx('container-btn-choose-tabs') : cx('container-btn-tabs')}
                            labelStyles={chooseTabs === label ?
                                cx('label-btn-choose-tabs') : cx('label-btn-tabs')}
                            onPress={onChooseTabs}

                        />
                    );
                })}
            </div>
        );
    }, [chooseTabs]);

    const renderViewTop = useMemo(() => {
        return (
            <div className={cx('container-top')}>
                <div className={cx('container-top-left')}>
                    <span className={cx('title')}>{Languages.contract.contractList}</span>
                    <DirectoryPath labelStyles={cx('label-path')} />
                </div>
                <Button
                    label={Languages.contract.createContract}
                    isLowerCase
                    containButtonStyles={cx('container-btn-add')}
                    labelStyles={cx('label-btn-add')}
                    rightIcon={IcAddPermissions}
                    rightIconStyles={cx('icon-right-btn')}
                    onPress={addContract}
                />
            </div>
        );
    }, [addContract]);

    const renderViewSearch = useMemo(() => {
        return (
            <div className={cx('view-search-table')}>
                {searchModal?.transaction && searchModal?.transaction?.length > 0 && renderItemSearch(searchModal?.transaction, SearchContract.transaction)}
                {searchModal?.property_type && searchModal?.property_type?.length > 0 && renderItemSearch(searchModal?.property_type, SearchContract.property_type)}
                {searchModal?.property_name && searchModal?.property_name?.length > 0 && renderItemSearch(searchModal?.property_name, SearchContract.property_name)}
                {searchModal?.from_date && searchModal?.from_date?.length > 0 && renderItemSearch(searchModal?.from_date, SearchContract.from_date)}
                {searchModal?.to_date && searchModal?.to_date?.length > 0 && renderItemSearch(searchModal?.to_date, SearchContract.to_date)}
                {searchModal?.active_status && searchModal?.active_status?.length > 0 && renderItemSearch(searchModal?.active_status, SearchContract.active_status)}
                {searchModal?.contract_type && searchModal?.contract_type?.length > 0 && renderItemSearch(searchModal?.contract_type, SearchContract.contract_type)}
                {searchModal?.loan_form && searchModal?.loan_form?.length > 0 && renderItemSearch(searchModal?.loan_form, SearchContract.loan_form)}
            </div>
        );
    }, [renderItemSearch, searchModal?.active_status, searchModal?.contract_type, searchModal?.from_date,
        searchModal?.loan_form, searchModal?.property_name, searchModal?.property_type,
        searchModal?.to_date, searchModal?.transaction
    ]);

    const renderViewTable = useMemo(() => {
        return (
            <div className={cx('container-table')}>
                <div className={cx('view-table-top')}>
                    <span className={cx('title')}>{Languages.contract.contractList}</span>
                    <div className={cx('view-table-top-center')}>{renderViewSearch}</div>
                    <div className={cx('view-table-top-right')}>
                        <MyTextInput
                            ref={refInputSearch}
                            rightIcon={IcSearch}
                            type={TYPE_INPUT.TEXT}
                            styleIconRight={cx('right-icon-input')}
                            inputStyle={cx('view-body-left-input')}
                            containerInput={cx('container-input')}
                            styleGroup={cx('input-group')}
                            placeHolder={Languages.contract.placeHolderSearch}
                            value={valueSearch}
                            onChangeText={onChangeTextInput}
                            maxLength={50}
                        />
                        <Button
                            containButtonStyles={cx('view-body-right-button')}
                            label={Languages.contract.advancedSearch}
                            labelStyles={cx('button-group-right')}
                            rightIcon={IcSearch}
                            rightIconStyles={cx('icon-right')}
                            isLowerCase
                            onPress={onModalSearch}
                        />
                        <Button
                            containButtonStyles={cx('view-body-right-button-excel')}
                            label={Languages.contract.excel}
                            labelStyles={cx('button-group-right')}
                            rightIcon={IcExcel}
                            rightIconStyles={cx('icon-right')}
                            isLowerCase
                        />
                    </div>
                </div>
                <TableContainer component={Paper} className={cx('table-container')} >
                    <Table aria-label="simple table" className={cx('table')}>
                        <TableHead className={cx('table-head')}>
                            <TableRow
                                className={cx('table-row')}
                            >
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.stt}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.position}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.type}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.contractCode}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.couponCode}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.customerName}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.customerPhone}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.customerCccd}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.property}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.loan}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.status}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.formOfInterestPayment}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.time}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.transaction}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.creator}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.dateCreated}</TableCell>
                                <TableCell align="center" className={cx('txt-tableCell')}>{Languages.contract.table.disbursementDate}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody
                            className={cx('table-body')}
                        >
                            {contractList
                                .slice((pages - 1) * PAGE_SIZE, (pages - 1) * PAGE_SIZE + PAGE_SIZE)
                                .map((row: ContractModelTest, index: number) => {

                                    const onDropDown = (event: any) => {
                                        setAnchorEl(event.currentTarget);
                                        setOpen(!open);
                                    };

                                    return (
                                        <TableRow
                                            key={index}
                                            className={index % 2 === 0 ? cx('table-body-row-white') : cx('table-body-row-gray')}
                                        >
                                            <TableCell align="center" className={cx('text-table')}>{(pages - 1) * PAGE_SIZE + index + 1}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>
                                                <img src={IcPosition} className={cx('img-detail')} onClick={onDropDown} />
                                                <Popper
                                                    id={'simple-popover'}
                                                    open={open}
                                                    anchorEl={anchorEl}
                                                >
                                                    <Box className={cx('popover')}>
                                                        {row.position.map((item, indexPopover) => {

                                                            const onNavigate = () => {
                                                                console.log('Item ==', item);
                                                                setOpen(!open);
                                                            };

                                                            return (
                                                                <Button
                                                                    key={indexPopover}
                                                                    label={item.name_position}
                                                                    labelStyles={cx('label-popover')}
                                                                    isLowerCase
                                                                    containButtonStyles={cx('btn-popover')}
                                                                    onPress={onNavigate}
                                                                />
                                                            );
                                                        })}
                                                    </Box>
                                                </Popper>
                                            </TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.type}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.contract_code}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.coupon_code}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.customer_name}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.customer_phone}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.customer_cccd}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.property}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.loan}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.status}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.form_of_interest_payment}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.time}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.transaction}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.creator}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.date_created}</TableCell>
                                            <TableCell align="center" className={cx('text-table')}>{row.disbursement_date}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <PaginationRounded
                    count={PAGES_COUNT}
                    page={pages}
                    onPress={handleChangePage}
                    containerStyle={cx('pagination-contain')}
                />
            </div>
        );
    }, [renderViewSearch, valueSearch, onChangeTextInput, onModalSearch, contractList, pages, PAGES_COUNT, open, anchorEl, toggle]);

    return (
        <div className={cx('container')}>
            {renderViewTop}
            {renderViewTabs}
            {renderViewTable}
            <ModalSearchContract
                ref={refModalSearch}
                description={Languages.contract.descriptionModal}
                onSuccessPress={onSuccessPress}
            />
        </div>
    );
});

export default ContractList;
