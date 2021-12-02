import { HexSet } from './HexSet';

export interface Piece {
    index: number;
    cells: HexSet;
}

export interface Step {
    field: HexSet;
    pieces: Piece[];
}
