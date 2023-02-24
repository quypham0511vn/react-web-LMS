import { PermissionModel } from './permission-model';

export interface PermissionGroupModel {
    id: string;
    name: string;
    type?: number;
    parent_id?: string;
    permissions: PermissionModel[];
    selected?: boolean;
}
