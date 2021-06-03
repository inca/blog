import { Vector2 } from '../math';
import { HexSet } from './HexSet';

export class Model {
    field: HexSet = new HexSet();
    pieces: HexSet[] = [];

    load(): this {
        const {
            field = [],
            pieces = [],
        } = JSON.parse(localStorage.getItem('hexCombState') ?? '{}') as SerializedState;
        this.field = HexSet.fromJSON(field);
        this.pieces = pieces.map(_ => HexSet.fromJSON(_));
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

export interface SerializedState {
    field?: Vector2[];
    pieces?: Array<Vector2[]>;
}
