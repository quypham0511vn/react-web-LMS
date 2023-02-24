export interface MenuModel {
    id: string;
    name: string;
    type: number;
    level: number;
    path?: string;
    parent_id?: string;
    children?: MenuModel[],
    isExpanded?: boolean;
}
