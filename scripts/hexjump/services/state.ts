import { dep } from 'mesh-ioc';

import { HexSet } from '../../commons/HexSet.js';
import { init } from '../../commons/init.js';
import { provide } from '../../commons/provide.js';
import { createDownloadFile, openFile } from '../../commons/util.js';
import { EventBus } from './events.js';

@provide('state')
export class State {
    @dep() events!: EventBus;

    public field: HexSet = new HexSet();

    @init()
    init() {
        try {
            const json = JSON.parse(localStorage.getItem('hexGameState') ?? '{}');
            this.loadFromJson(json);
        } catch (err) { }
    }

    loadFromJson(json: any) {
        const { field = [] } = json;
        this.field = HexSet.fromJSON(field);
        this.events.stateLoaded.emit({});
    }

    save() {
        localStorage.setItem('hexGameState', JSON.stringify(this));
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
        createDownloadFile('hexgame.json', JSON.stringify(this));
    }

}
