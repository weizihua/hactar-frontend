export interface INodeState {
    id: number;
    url: string;
    token: string;
    address: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
}
export interface INodeInfoState {
    version: string;
    sectorSize: number;
    minerPower: number;
    totalPower: number;
    createdAt: string;
    updatedAt: string;
}
export interface INodeDiskState {
    id: number;
    freeSpace: number;
    takenSpace: number;
    createdAt: string;
    updatedAt: string;
    nodeId: number;
}

export interface INodeBalance {
    currentBalance: number;
    updatedAt: string;
    balanceChangePerc: string;
    balanceChange: number;
}