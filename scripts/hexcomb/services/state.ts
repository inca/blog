import { dep } from 'mesh-ioc';

import { HexSet } from '../../commons/HexSet.js';
import { provide } from '../../commons/provide.js';
import { createDownloadFile, openFile } from '../../commons/util.js';
import { EventBus } from './events.js';

@provide('state')
export class State {
    @dep() events!: EventBus;

    public field: HexSet = new HexSet();
    public pieces: HexSet[] = [];
    public allowFlip = false;

    init() {
        try {
            const json = JSON.parse(localStorage.getItem('hexCombState') ?? '{}');
            this.loadFromJson(json);
        } catch (err) {}
    }

    loadFromJson(json: any) {
        const { field = [], pieces = [], allowFlip = false } = json;
        this.field = HexSet.fromJSON(field);
        this.pieces = pieces.map((_: any) => HexSet.fromJSON(_));
        this.allowFlip = Boolean(allowFlip);
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
