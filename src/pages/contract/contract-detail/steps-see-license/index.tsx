import React, { useCallback, useMemo, useRef, useState } from 'react';
import Ic_Load from 'assets/icon/ic_white_download_see_license.svg';
import Ic_Video from 'assets/icon/ic_front_video.svg';
import formValidate from 'utils/form-validate';
import classNames from 'classnames/bind';
import styles from './steps-see-license.module.scss';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import PopupBaseCenterScreen from 'components/popup-base-center-screen';
import { PopupBaseActions } from 'models/modal-model';
import { ImageLicenseData, typeDownloadLicenseData } from 'pages/__mocks__/ContractInfomation';
import CheckBoxSelect, { CheckBoxAction } from 'components/check-box-select/check-box-select';
import { Grid } from '@mui/material';
import { ItemPropsModel } from 'models/item-props-model';
import { ImageGroupModel, ImageModel } from 'models/common-model';
import { TYPE_FILE } from 'commons/constants';
import { Image } from 'antd';
const cx = classNames.bind(styles);

const StepsSeeLicense = () => {
    const refPopupSelect = useRef<PopupBaseActions>(null);
    const refPopupReview = useRef<PopupBaseActions>(null);
    const checkBoxRef = useRef<CheckBoxAction>(null);

    const [typeShow, setTypeShow] = useState<string>(TYPE_FILE.IMAGE);
    const [director, setDirector] = useState<string>('');

    const [fetchDataReview, setDataReview] = useState<ImageGroupModel[]>(ImageLicenseData);

    const [dataCheckbox, setDataCheckbox] = useState<Array<string>>([]);
    const [isPreviewVisible, setPreviewVisible] = useState(false);

    const openModalSelect = useCallback(() => {
        refPopupSelect?.current?.showModal?.();
    }, [],);

    const renderCheckBoxArray = useCallback((_ref: any, _title: string, _data: ItemPropsModel[]) => {
        return (
            <div className={cx('item-check-box-container')}>
                <CheckBoxSelect ref={_ref} data={_data} title={_title} onChangeText={() => { }} titleContainer={cx('title-check-box')} groupInputContainer={cx('group-input-container')} />
            </div>
        );
    }, []);

    const renderContentPopupSelect = useMemo(() => {
        return (
            <div> {renderCheckBoxArray(checkBoxRef, '', typeDownloadLicenseData)}</div>
        );
    }, [renderCheckBoxArray]);

    const renderContentPopupReview = useMemo(() => {
        const dir = director.slice(director.lastIndexOf('.') + 1); // get type file video

        return (
            <div className={cx('review-popup-container')}>
                {typeShow === TYPE_FILE.VIDEO &&
                    <video controls className={cx('video-popup-container')} autoPlay>
                        <source src={director} type={`${'video/'}${dir}`}></source>
                        {`${Languages.seeLicense.unSupportVideo}${dir}`}

                    </video>}
            </div>
        );
    }, [director, typeShow]);

    const renderItemImageList = useCallback((itemImage: ImageModel, key: any) => {
        const onPressItemImage = () => {
            setDirector(itemImage?.image || '');
            setTypeShow(TYPE_FILE.IMAGE);
            setPreviewVisible(true);
        };

        const onPressItemVideo = () => {
            refPopupReview.current?.showModal();
            setDirector(itemImage?.video || '');
            setTypeShow(TYPE_FILE.VIDEO);
        };
        return (
            <Grid item xs={12} md={2} className={cx('image-container')} key={key} onClick={itemImage?.image ? onPressItemImage : onPressItemVideo}>
                {itemImage?.image && <img src={itemImage?.image} alt='' className={cx('content-image')} />}
                {itemImage?.video && <img src={Ic_Video} className={cx('content-image')} alt='' />}
                <span className={cx('title-item-image')}>{itemImage?.dateTime}</span>
            </Grid>
        );
    }, []);

    const renderItemDocumentList = useCallback((itemDocumentList: ImageGroupModel, key: any) => {
        return (
            <div className={cx('document-container')} key={key}>
                <span className={cx('title-item-document')}>{itemDocumentList?.title}</span>
                <Grid container className={cx(itemDocumentList?.itemList.length > 0 ? 'content-document' : 'no-content-document')}>
                    {itemDocumentList?.itemList.map((item: ImageModel, index: number) => {
                        return renderItemImageList(item, index);
                    })}
                </Grid>
            </div>
        );
    }, [renderItemImageList]);

    const renderAllContent = useCallback((data: ImageGroupModel[]) => {
        return (
            <div className={cx('all-content-container')}>
                {data.map((item: ImageGroupModel, index: number) => {
                    return renderItemDocumentList(item, index);
                })}
            </div>
        );
    }, [renderItemDocumentList]);

    const handleDownload = useCallback(() => {
        setDataCheckbox(checkBoxRef.current?.getValue?.() || []);
    }, []);

    const onOpenPreview = useCallback((visible: boolean) => {
        setPreviewVisible(visible);
    }, []);

    return (
        <div className={cx('all-container')}>
            <Button label={Languages.seeLicense.loadDocument} onPress={openModalSelect} isLowerCase containButtonStyles={cx('container-btn-download')} labelStyles={cx('label-btn-download')} rightIcon={Ic_Load} />
            {renderAllContent(fetchDataReview)}
            <Image
                style={{ display: 'none' }}
                preview={{
                    visible: isPreviewVisible,
                    onVisibleChange: onOpenPreview
                }}
                src={director}
            />
            <PopupBaseCenterScreen ref={refPopupSelect} onSuccessPress={handleDownload} hasTwoButton customerContent={renderContentPopupSelect} textTitleStyle={cx('title-modal-style')} title={Languages.seeLicense.loadDocument} labelSuccess={Languages.seeLicense.download} />
            <PopupBaseCenterScreen ref={refPopupReview} customerContent={renderContentPopupReview} textTitleStyle={cx('title-review-style')} hasCloseIc title={Languages.seeLicense.detailVideo} />
        </div>
    );
};

export default StepsSeeLicense;
