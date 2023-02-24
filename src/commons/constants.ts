export const PHONE_PREFIX = '+84';

export const PHONE_REGEX = /^0+[3,5,7,8,9]{1}[0-9]{1}[1-9]{1}[0-9]{6}$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const EMAIL_REGEX = /^[\w+][\w\.\-]+@[\w\-]+(\.\w{2,10})+$/;
export const PASSWORD_REGEX = /^\w{6,20}$/;

export const SECONDS_IN_DAY = 864e5;
export const DELAY_CLICK = 3e2;
export const MIN_MONEY = 1e5;
export const ZERO = '0';
export const muiCheckedColor = '#1D9752';

export enum KeyCode {
    backSpace = 'Backspace'
}

export enum StorageKeys {
    KEY_ACCESS_TOKEN = 'KEY_ACCESS_TOKEN',
    KEY_DEVICE_TOKEN = 'KEY_DEVICE_TOKEN',
    KEY_PATH_GROUPS = 'KEY_PATH_GROUPS',
    KEY_PATH_GROUPS_STACK = 'KEY_PATH_GROUPS_STACK',
    KEY_PERMISSION_GROUPS = 'KEY_PERMISSION_GROUPS',
    KEY_DEVICE_TOKEN_FIREBASE = 'KEY_DEVICE_TOKEN_FIREBASE',
    KEY_USER_INFO = 'KEY_USER_INFO',
    KEY_CONTRACT_INFO = 'KEY_CONTRACT_INFO',
    KEY_STEPS_INFO_CONTRACT = 'KEY_STEPS_INFO_CONTRACT',
}

export enum GAEvents {
    REGISTRATION = 'registration',
}

export enum Events {
    TOAST = 'TOAST',
    LOGOUT = 'LOGOUT',
}

export enum ToastTypes {
    ERR = 0, //  red background
    MSG = 1, // dark blue background
    SUCCESS = 2, // green background
}

export enum PopupTypes {
    OTP = 1,
    POST_NEWS = 2,
}

export enum UserStatus {
    ACTIVE = 'Active',
    BLOCK = 'Block',
    NEW = 'New',
}

export enum UserStatusLoan {
    PAID = 'Đã thanh toán',
    BAD_DEBT_GROUP = 'Nợ xấu nhóm',
    UNPAID = 'Chưa thanh toán',
    TIME_TO_PAY = 'Đến kỳ thanh toán',
    NOT_TIME_TO_PAY = 'Chưa đến kì hạn'
}

export enum UserManagementStatus {
    CREATE = 'Create',
    EDIT = 'Edit',
    DETAIL = 'Detail',
}

export enum POSITION_TYPE {
    BO = 1, // back office
    OO_M = 2, // out of office with many agents eg: ASM
    OO_O = 3, // out of office with one agent 
}

export enum TYPE_TOAST {
    ERROR = 'error',
    SUCCESS = 'success',
    WARNING = 'warning',
    INFO = 'info'
}

export enum TYPE_ASSETS {
    MOTOR_BIKE = 'Xe máy',
    CAR = 'Ô tô',
    HOME = 'Nhà đất',
}
//'radio' | 'email' | 'phone' | 'text' | 'number' | 'password' | 'date'| 'tel',
export enum TYPE_INPUT {
    TEXT = 'text',
    RADIO = 'radio',
    EMAIL = 'email',
    PHONE = 'phone',
    NUMBER = 'number',
    PASSWORD = 'password',
    DATE = 'date',
    TEL = 'tel'
}

export enum TYPE_CAPITALIZE {
    NONE = 'none',
    SENTENCES = 'sentences',
    WORDS = 'words',
    CHARACTERS = 'characters',
}

export enum TYPE_FILE {
    IMAGE = 'image',
    VIDEO = 'video',
}

