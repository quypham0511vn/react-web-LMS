import { ReactNode } from 'react';
export type PopupBaseProps = {
    onClose?: () => any;
    onConfirm?: () => any;
    onBackdropPress?: () => any;
    onSuccessPress?: (...params: any[]) => any;
    onCodeChanged?: () => any;
    onSuccess?: any;
    content?: string;
    btnText?: string;
    description?: string;
    title?: string;
    isIcon?: boolean;
    icon?: any;
    hasTwoButton?: boolean;
    hasOneButton?: boolean;
    keyCode?: any;
    webView?: string;
    labelSuccess?: string;
    labelCancel?: string;
    iconRight?: any;
    iconLeft?: any;
    hasCloseIc?: boolean;

    /// styling UI
    popupContainerStyle?: string;
    titleContainerStyle?: string;
    textTitleStyle?: string;
    describeContainerStyle?: string;
    textDescribeStyle?: string;
    buttonContainerStyle?: string;
    buttonAgreeStyle?: string;
    buttonCancelStyle?: string;
    textAgreeStyle?: string;
    textCancelStyle?: string;
    iconLeftStyle?: string;
    iconRightStyle?: string;
    customerContent?: ReactNode
};

export type PopupBaseActions = {
    showModal: (content?: any) => any;
    hideModal: (content?: string) => any;
};
