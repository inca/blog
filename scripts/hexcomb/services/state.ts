import { service } from '@inca/vue-mesh';
import { dep } from 'mesh-ioc';

import { HexSet } from '../../commons/HexSet';
import { createDownloadFile, openFile } from '../../commons/util';
import { EventBus } from './events';

@service('state')
export class State {
    @dep() events!: EventBus;

    public field: HexSet = new HexSet();
    public pieces: HexSet[] = [];

    init() {
        try {
            const json = JSON.parse(localStorage.getItem('hexCombState') ?? '{}');
            this.loadFromJson(json);
        } catch (err) {}
    }

    loadFromJson(json: any) {
        const { field = [], pieces = [] } = json as SerializedState;
        this.field = HexSet.fromJSON(field);
        this.pieces = pieces.map(_ => HexSet.fromJSON(_));
        this.events.stateLoaded.emit({});
    }

    save() {
        localStorage.setItem('hexCombState', JSON.stringify(this));
        this.events.stateSaved.emit({});
    }

    async importJson() {
        try {
            const text = await openFile();
            this.loadFromJson(JSON.parse(text));
        } catch (err) {
            console.warn('Could not import file', err);
        }
    }

    exportJson() {
        createDownloadFile('hexcomb.json', JSON.stringify(this));
    }

}

export interface SerializedState {
    field: any;
    pieces: any[];
}
