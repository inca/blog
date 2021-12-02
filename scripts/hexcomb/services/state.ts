import { service } from 'mesh-ioc';

import { HexSet } from '../HexSet';

@service({ alias: 'state' })
export class State {
    public field: HexSet = new HexSet();
    public pieces: HexSet[] = [];

    init() {
        try {
            const state = JSON.parse(localStorage.getItem('hexCombState') ?? '{}') as SerializedState;
            const { field = [], pieces = [] } = state;
            this.field = HexSet.fromJSON(field);
            this.pieces = pieces.map(_ => HexSet.fromJSON(_));
        } catch (err) {}
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
