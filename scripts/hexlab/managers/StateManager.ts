import { dep } from 'mesh-ioc';

import { debounce } from '../../commons/debounce.js';
import { init } from '../../commons/init.js';
import { provide } from '../../commons/provide.js';
import { GameSettingsSchema } from '../schema/GameSettings.js';
import { EventManager } from './EventManager.js';

@provide('state')
export class StateManager {

    @dep() private events!: EventManager;

    settings = GameSettingsSchema.decode({});

    @init()
    init() {
        try {
            const json = JSON.parse(localStorage.getItem('hexlabState') ?? '{}');
            this.loadJson(json);
        } catch (err) {}
    }

    loadJson(json: any) {
        this.settings = GameSettingsSchema.decode(json);
        this.events.stateLoaded.emit();
    }

    toJson() {
        return this.settings;
    }

    @debounce(300)
    save() {
        localStorage.setItem('hexlabState', JSON.stringify(this.toJson()));
        this.events.stateSaved.emit();
    }

}
