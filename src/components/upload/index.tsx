import Grid from '@mui/material/Grid';
import { Image } from 'antd';
import { Box } from '@mui/material';
import IcAdd from 'assets/icon/ic_add_permissions.svg';
import IcClose from 'assets/icon/ic_close.svg';
import classNames from 'classnames/bind';
import Languages from 'commons/languages';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import styles from './upload.module.scss';

const cx = classNames.bind(styles);

export type UploadProps = {
    saveDataImage: (data: string[]) => any;
}

export type UploadAction = {
    clearDataImage: () => any;
}


const UploadImage = forwardRef<UploadAction, UploadProps>(
    ({ saveDataImage }: UploadProps, ref) => {
        useImperativeHandle(ref, () => ({
            clearDataImage
        }));
        const [arrFile, setArrFile] = useState<string[]>([]);
        const [visible, setVisible] = useState<boolean>(false);
        const [toggle, setToggle] = useState<boolean>(false);
        const refInput = useRef(null);

        // const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        //     const reader = new FileReader();
        //     reader.addEventListener('load', () => callback(reader.result as string));
        //     reader.readAsDataURL(img);
        // };

        useEffect(() => {
            saveDataImage?.(arrFile);
        }, [arrFile, saveDataImage]);

        const clearDataImage = useCallback(() => {
            setArrFile([]);
            saveDataImage?.([]);
        }, [saveDataImage]);

        const onChange = useCallback(async (event: any) => {
            const selectFile = URL.createObjectURL(event.target.files[0]);
            const _arrFile = arrFile;
            arrFile.push(selectFile);
            setArrFile(_arrFile);
            setToggle(last => !last);
            event.currentTarget.value = null;
            // getBase64(info.file.originFileObj as RcFile, url => {
            //     console.log('url ===', url);
            //     setImageUrl(url);
            // });
            // if (info.file.status !== 'uploading') {
            //     console.log(info.file, info.fileList);
            // }
            // if (info.file.status === 'done') {
            //     getBase64(info.file.originFileObj as RcFile, url => {
            //         setImageUrl(url);
            //     });
            // } else if (info.file.status === 'error') {
            //     message.error(`${info.file.name} file upload failed.`);
            // }
        }, [arrFile]);

        const renderArrImage = useMemo(() => {
            return (
                <div className={cx('group-image')}>
                    <Box sx={{ flexGrow: 1 }} style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap' }}>
                        {arrFile.map((file, index) => {

                            const onDelete = () => {
                                delete arrFile[index];
                                setArrFile(last => {
                                    last = last.filter(item => item !== undefined || item !== '' || item !== null);
                                    console.log('arrFile ===', last);
                                    saveDataImage(last);
                                    return last;
                                });
                            };

                            return (
                                <Grid item xs={12} md={4} key={index} className={cx('grid')} >
                                    <Grid item xs={12} md={12} >
                                        <Image
                                            src={file}
                                            className={cx('image')}
                                            width={'98%'}
                                            height={'150px'}
                                        />
                                        <img
                                            src={IcClose}
                                            className={cx('img-close')}
                                            onClick={onDelete}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Box>
                    <div style={{ display: 'none' }}>
                        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
                            {arrFile.map((file, index) => {
                                return (
                                    <Image
                                        src={file}
                                        key={index}
                                    />);
                            })}
                        </Image.PreviewGroup>
                    </div>
                </div>
            );
        }, [arrFile, visible, toggle]);

        return (
            <>
                {arrFile.length > 0 && renderArrImage}
                <button className={cx('btn-add')}>
                    <span className={cx('label-add')}>{Languages.contract.addImage}</span>
                    <input ref={refInput} className={cx('input-add')} type={'file'} onChange={onChange} />
                    <img src={IcAdd} />
                </button>

                {/* <Upload onChange={onChange} type={'drag'}>
                    <Button
                        isLowerCase
                        label={Languages.contract.addImage}
                        containButtonStyles={cx('btn-add')}
                        labelStyles={cx('label-add')}
                        rightIcon={IcAdd}
                        rightIconStyles={cx('icon')}
                    />
                </Upload> */}
            </>

        );
    }
);

export default UploadImage;
