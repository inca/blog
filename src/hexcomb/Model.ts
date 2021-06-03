import { HexSet } from './HexSet';

export class Model {
    field: HexSet = new HexSet();
    pieces: HexSet[] = [];

    load(): this {
        const state = JSON.parse(localStorage.getItem('hexCombState') ?? '{}') as SerializedState;
        const { field = [], pieces = [] } = state;
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
    field?: any;
    pieces?: any[];
}
