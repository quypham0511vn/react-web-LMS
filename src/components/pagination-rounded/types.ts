export type PaginationProps = {
    onPress?: (event: React.ChangeEvent<unknown>, page: number) => void;
    page?: number;
    count?: number;
    containerStyle?: any;
};
