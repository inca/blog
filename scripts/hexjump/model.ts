export enum PieceType {
    Terrain = 1,
    Actor = 2,
    Pickup = 4,
    Goal = 8,
}

export enum PieceRole {
    Walkable = 1,
    JumpOver = 2,
    Wall = 4,
}

export interface PieceSettings {
    id: string;
    type: PieceType;
    pic: string;
    roles: PieceRole[];
    walkMask: PieceRole[];
    passMask: PieceRole[];
    blockMask: PieceRole[];
    minPass: number;
    maxPass: number;
}
