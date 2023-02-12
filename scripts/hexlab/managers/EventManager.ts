import { Event } from 'nanoevent';

export class EventManager {

    stateSaved = new Event<void>();
    stateLoaded = new Event<void>();

}
