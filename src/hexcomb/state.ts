import { Hex } from '../hex';
import { Vector2 } from '../math';
import { HexSet } from './hexset';

export class State {
    field: HexSet = new HexSet();
    pieces: Piece[] = [];

    load(): this {
        const {
            field = [],
            pieces = [],
        } = JSON.parse(localStorage.getItem('hexCombState') ?? '{}') as SerializedState;
        this.field = HexSet.fromJSON(field);
        this.pieces = pieces.map(_ => {
            return {
                cells: HexSet.fromJSON(_.cells),
            };
        });
        return this;
    }

    save(): this {
        localStorage.setItem('hexCombState', JSON.stringify({
            field: this.field,
            pieces: this.pieces,
        }));
        return this;
    }

}

export interface Piece {
    cells: HexSet;
}

export interface SerializedState {
    field?: Vector2[];
    pieces?: Array<{
        cells: Vector2[];
    }>;
}
