export interface PositionModel {
    id: string;
    name: string;
    type: number;
    parent_id?: string;
    parent_name?: string;
    children?: PositionModel[],
    isExpanded?: boolean;
}
