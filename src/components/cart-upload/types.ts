

export type PropsImage = {
    capitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined,
    type?: 'radio' | 'email' | 'phone' | 'text' | 'number' | 'password',
    label?: string;
    textLabel?: string;
    keyUp?: any;
    title?: string;
    value?: string | number;
    disabled?: boolean;
    verified?: boolean;
    maxCount?: number;
    listType?: 'text' | 'picture-card' | 'picture' | undefined;
    iconMain?: string;
    data?: any;
    hasButtonBottom?: boolean,
    icRight?: any,
    onLeftButton?: () => void,
    onRightButton?: () => void,
}

export type PropsUploadActions = {
    setValue: (text: string | number) => void;
    fillValue: (text: string | number) => void;
    getValue: () => any;
    focus: () => void;
    blur: () => void;
    clearFile: () => void;
    setErrorMsg: (text?: string)=> void;
};


export enum FakeID {
    BEFORE_ID = 'BEFORE_ID',
    AFTER_ID = 'AFTER_ID',
    PORTRAIT = 'PORTRAIT',
}
