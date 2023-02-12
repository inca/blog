import { dep } from 'mesh-ioc';

import { init } from '../../commons/init.js';
import { provide } from '../../commons/provide.js';
import { EventManager } from './EventManager.js';
import { StateManager } from './StateManager.js';

@provide('slots')
export class SlotsManager {

    @dep() private state!: StateManager;
    @dep() private events!: EventManager;

    currentSlot = 0;
    allSlots: number[] = [];

    @init()
    init() {
        this.events.stateSaved.on(() => this.saveSlot());
        this.reload();
    }

    reload() {
        this.currentSlot = Number(localStorage.getItem('hexlabCurrentSlot')) || 0;
        this.allSlots = [];
        for (const key of Object.keys(localStorage)) {
            const m = /^hexlabSlot\.(\d+)$/.exec(key);
            const slot = Number(m?.[1]);
            if (!isNaN(slot)) {
                this.allSlots.push(slot);
            }
        }
        this.allSlots.sort();
    }

    addSlot() {
        const slot = (this.allSlots.at(-1) ?? -1) + 1;
        this.saveSlot(slot);
    }

    removeSlot(slot: number) {
        const key = this.getStorageKey(slot);
        localStorage.removeItem(key);
        const last = this.allSlots.at(-1) ?? 0;
        this.setCurrentSlot(last);
    }

    private getStorageKey(slot: number) {
        return `hexlabSlot.${slot}`;
    }

    private setCurrentSlot(slot: number) {
        this.currentSlot = slot;
        localStorage.setItem('hexlabCurrentSlot', String(slot));
    }

    async loadSlot(slot: number = this.currentSlot) {
        try {
            const key = this.getStorageKey(slot);
            const json = JSON.parse(localStorage.getItem(key) ?? '{}');
            this.state.loadJson(json);
            this.setCurrentSlot(slot);
        } catch (err) {}
    }

    async saveSlot(slot: number = this.currentSlot) {
        const key = this.getStorageKey(slot);
        localStorage.setItem(key, JSON.stringify(this.state.toJson()));
        this.setCurrentSlot(slot);
        this.reload();
    }

}
