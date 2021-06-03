import { HexSet } from './HexSet';

export class Model {

    constructor(
        public field: HexSet = new HexSet(),
        public pieces: HexSet[] = [],
    ) {}

    static load(): Model {
        try {
            const state = JSON.parse(localStorage.getItem('hexCombState') ?? '{}') as SerializedState;
            const { field = [], pieces = [] } = state;
            return new Model(
                HexSet.fromJSON(field),
                pieces.map(_ => HexSet.fromJSON(_))
            )
        } catch (err) {
            return new Model();
        }
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
    field: any;
    pieces: any[];
}
