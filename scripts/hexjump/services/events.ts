import { Event } from 'typesafe-event';

import { provide } from '../../commons/provide.js';

@provide('events')
export class EventBus {

    stateSaved = new Event<{}>();
    stateLoaded = new Event<{}>();

}
