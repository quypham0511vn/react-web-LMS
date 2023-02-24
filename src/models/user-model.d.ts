import { AgentGroupModel } from './agent-model';
import { PositionModel } from './position-model';
export interface UserInfoModel {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    cmt: string;
    updated_at: string;
    status: string;
    position: PositionModel,
    position_group?: PermissionGroupModel[],
    agent_group?: AgentGroupModel
}
