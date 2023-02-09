import { dep } from 'mesh-ioc';

import { debounce } from '../../commons/debounce.js';
import { init } from '../../commons/init.js';
import { provide } from '../../commons/provide.js';
import { GameSettingsSchema } from '../model/GameSettings.js';
import { EventManager } from './EventManager.js';

@provide('state')
export class StateManager {

    @dep() private events!: EventManager;

    settings = GameSettingsSchema.decode({});

    @init()
    init() {
        try {
            const json = JSON.parse(localStorage.getItem('hexlabState') ?? '{}');
            this.settings = GameSettingsSchema.decode(json);
        } catch (err) {}
    }


    @debounce(200)
    save() {
        localStorage.setItem('hexlabState', JSON.stringify(this.settings));
        this.events.stateSaved.emit({});
    }

}
