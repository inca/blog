import { Hex } from '../hex';
import { Vector2 } from '../math';

export class State {
    field: Hex[] = [];
    pieces: Piece[] = [];

    load(): this {
        const {
            field = [],
            pieces = [],
        } = JSON.parse(localStorage.getItem('hexCombState') ?? '{}') as SerializedState;
        this.field = field.map(_ => Hex.fromJSON(_));
        this.pieces = pieces.map(_ => {
            return {
                cells: _.cells.map(_ => Hex.fromJSON(_)),
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
    cells: Hex[];
}

export interface SerializedState {
    field?: Vector2[];
    pieces?: Array<{
        cells: Vector2[];
    }>;
}
