import { service } from '@inca/vue-mesh';
import { Event } from 'typesafe-event';

@service('events')
export class EventBus {

    stateSaved = new Event<{}>();
    stateLoaded = new Event<{}>();

}
