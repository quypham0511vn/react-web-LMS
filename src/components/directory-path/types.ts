export type DirectoryPathProps = {
    fontSize?: number;
    containStyles?: string;
    customStyles?: any;
    labelStyles?: string;
    onPress?: (tag?: string) => any;
    disabled?: boolean;
};

export type DirectoryPathActions = {
    onNavigate: (msg?: string) => void;
};

export type ExpandedFlow = {
    id: string;
    level: number;
    name: string;
    path?: string;
}

export type PathGroups = {
    children: ExpandedFlow[];
}

export type StackExpandedFlow = PathGroups[];
