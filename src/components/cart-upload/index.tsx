import { Modal, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import IcImage from 'assets/icon/ic_green_card_loan.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import { Button } from 'components/button';
import { Loading } from 'components/loading';
import parse from 'html-react-parser';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styles from './cart-upload.module.scss';
import { PropsImage, PropsUploadActions } from './types';
import IcFakePeople from 'assets/icon/ic_fakepeople.svg';
import IcReload from 'assets/icon/ic_reload.svg';
import Ic_Warn from 'assets/icon/ic_big_red_warning_contract.svg';

const cx = classNames.bind(styles);

export const CartUpload = forwardRef<PropsUploadActions, PropsImage>(
    ({ label, title, textLabel, maxCount, listType, iconMain, disabled, hasButtonBottom, icRight, onLeftButton, onRightButton }: PropsImage, ref: any) => {
        const [previewOpen, setPreviewOpen] = useState<boolean>(false);
        const [errorImg, setErrorImg] = useState<boolean>(false);
        const [errorMsg, setErrMsg] = useState<string>('');
        const [filesList, setFileList] = useState<UploadFile[]>([]);

        const [fileDir, setFileDir] = useState<string>('');
        const [loading, setLoading] = useState<boolean>(false);

        const upLoadRef = useRef<any>(null);

        const handleCancel = useCallback(() => { setPreviewOpen(false); }, []);

        const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
            if (errorImg) {
                setLoading(true);
                setFileList(newFileList);
                setFileDir(filesList?.[0]?.thumbUrl || '');
                setLoading(false);
                setErrMsg('');
            }
        };

        const getValue = useCallback(() => {
            return fileDir?.trim() || '';
        }, [fileDir]);

        const clearFile = useCallback(() => {
            handleCancel();
            setFileList([]);
            setFileDir('');
            setErrorImg(false);
            setErrMsg('');

        }, [handleCancel]);

        const setErrorMsg = useCallback((text?: string) => {
            if (text) {
                setErrMsg(text);
                upLoadRef.current?.click?.();
            } else { setErrMsg(''); }
        }, []);

        useImperativeHandle(ref, () => ({
            clearFile,
            getValue,
            setErrorMsg
        }));

        const uploadButton = (
            <div className={cx('wrapper')}>
                <span className={cx('card-title')}>{title}</span>
                <img src={iconMain || IcImage} alt='' className={cx('img-upload')} />
                <span className={cx('card-action-text')}>{parse(label || Languages.contract.label)}</span>
                {textLabel ?
                    <span className={cx('card-describe-gray-text')}>
                        {textLabel || ''}
                    </span> :
                    <span className={cx('card-describe-white-text')}>
                        {Languages.contract.textLabel}
                    </span>
                }
            </div>
        );

        const renderItemImage = useMemo(() => (
            <div className={cx('img-before-container')} onClick={() => setPreviewOpen(true)}>
                {loading ? <Loading className={cx('loading-img-container')} /> :
                    <img src={fileDir} className={cx('image-style')} alt='' />}
            </div>
        ), [fileDir, loading]);


        const beforeUpload = useCallback((file: UploadFile) => {
            console.log('file', file);

            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = Number(file.size) / 1024 / 1024 < 2;
            if (!isJpgOrPng) {
                setErrMsg(`${file.name} is not a png or jpeg file`);
            } else if (!isLt2M) {
                setErrMsg(` Image ${file.name}  must smaller than 2MB!`);
            }
            setErrorImg(isJpgOrPng && isLt2M);
            return isJpgOrPng && isLt2M;
        }, []);

        return (
            <div className={cx('item-card-container')}>
                <span className={cx('item-front-card-text')}>{title}</span>
                <div className={cx(errorMsg ? 'error-container' : 'container')} >
                    {errorMsg ?
                        <div className={cx('error-wrap')}>
                            <span className={cx('error-title-style')}>{title}</span>
                            <img src={Ic_Warn} alt='' />
                            <span className={cx('error-describe-style')}>{Languages.contract.errorUpload}</span>
                            <div className={cx('error-btn-footer')}>
                                <Button
                                    label={Languages.contract.reselect}
                                    labelStyles={cx('error-label-red')}
                                    containButtonStyles={cx('error-btn-red')}
                                    isLowerCase
                                    onPress={clearFile}
                                />
                                {/* <Button
                                    label={Languages.contract.cancel}
                                    labelStyles={cx('error-label-green')}
                                    containButtonStyles={cx('error-btn-green')}
                                    isLowerCase
                                    onPress={clearFile}
                                /> */}
                            </div>
                        </div>
                        : <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType={listType || 'picture'}
                            fileList={filesList}
                            onChange={handleChange}
                            className={cx('upload-container')}
                            maxCount={maxCount || 1}
                            disabled={disabled}
                            itemRender={() => renderItemImage}
                            beforeUpload={beforeUpload}
                            openFileDialogOnClick={true}
                        >
                            {filesList.length >= 1 ? null : uploadButton}
                        </Upload>}
                </div>

                <span className={cx('err-text')}>{errorMsg}</span>

                {hasButtonBottom &&
                    <div className={cx('btn-card-upload-container')}>
                        <Button
                            label={Languages.contract.reselect}
                            rightIcon={IcReload}
                            labelStyles={cx('label-left')}
                            containButtonStyles={cx('btn-left-container')}
                            onPress={onLeftButton}
                        />
                        <Button
                            label={Languages.contract.identification}
                            rightIcon={icRight || IcFakePeople}
                            labelStyles={cx('label-right')}
                            containButtonStyles={cx('btn-right-container')}
                            onPress={onRightButton}
                        />
                    </div>
                }

                <Modal
                    title={filesList?.[0]?.name}
                    onCancel={handleCancel}
                    visible={previewOpen}
                    footer={null}
                >
                    <img alt='' style={{ objectFit: 'fill', width: '100%' }} src={fileDir} />
                    <div className={cx('btn-footer')}>
                        <Button
                            label={Languages.common.cancel}
                            labelStyles={cx('label-red')}
                            containButtonStyles={cx('btn-red')}
                            isLowerCase
                            onPress={handleCancel}
                        />
                        <Button
                            label={Languages.contract.reselect}
                            labelStyles={cx('label-green')}
                            containButtonStyles={cx('btn-green')}
                            isLowerCase
                            onPress={clearFile}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
);
