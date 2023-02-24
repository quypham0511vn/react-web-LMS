export interface AgentModel {
    id: string;
    name: string;
    type: number;
    address: string;
    selected?: boolean;
}

export interface AgentGroupModel {
    type: number;
    agent: AgentModel[];
}
