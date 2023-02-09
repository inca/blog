import { dep } from 'mesh-ioc';

import { HexCombStep } from '../../commons/HexComb.js';
import { HexSet } from '../../commons/HexSet.js';
import { init } from '../../commons/init.js';
import { provide } from '../../commons/provide.js';
import { createDownloadFile, openFile } from '../../commons/util.js';
import { EventBus } from './events.js';

let saveTimer: any = null;

@provide('state')
export class State {
    @dep() events!: EventBus;

    public field: HexSet = new HexSet();
    public pieces: HexSet[] = [];
    public savedSteps: HexCombStep[] = [];
    public allowFlip = false;

    @init()
    init() {
        try {
            const json = JSON.parse(localStorage.getItem('hexCombState') ?? '{}');
            this.loadFromJson(json);
        } catch (err) {}
    }

    loadFromJson(json: any) {
        const { field = [], pieces = [], savedSteps = [], allowFlip = false } = json;
        this.field = HexSet.fromJSON(field);
        this.pieces = pieces.map((_: any) => HexSet.fromJSON(_));
        this.savedSteps = savedSteps.map((_: any) => {
            return {
                field: HexSet.fromJSON(_.field),
                pieces: _.pieces.map((d: any) => {
                    return {
                        index: Number(d.index),
                        cells: HexSet.fromJSON(d.cells),
                    };
                }),
            };
        });
        this.allowFlip = Boolean(allowFlip);
        this.events.stateLoaded.emit({});
    }

    save() {
        localStorage.setItem('hexCombState', JSON.stringify(this));
        this.events.stateSaved.emit({});
    }

    saveDebounced() {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(() => this.save(), 500);
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
