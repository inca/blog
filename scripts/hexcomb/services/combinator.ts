import { dep } from '@nodescript/mesh';
import { toRaw } from 'vue';

import { HexComb, HexCombStep } from '../../commons/HexComb.js';
import { HexSet } from '../../commons/HexSet.js';
import { init } from '../../commons/init.js';
import { provide } from '../../commons/provide.js';
import { createDownloadFile, openFile } from '../../commons/util.js';
import { EventBus } from './events.js';
import { State } from './state.js';

@provide('combinator')
export class CombinatorService {

    @dep() state!: State;
    @dep() events!: EventBus;

    savedSteps: HexCombStep[] = [];

    currentStep: HexCombStep = { field: new HexSet(), pieces: [] };
    playing = false;
    done = false;
    count = 0;

    $iterator: IterableIterator<HexCombStep> | null = null;

    @init()
    init() {
        this.events.stateLoaded.on(() => this.reset());
        this.events.stateSaved.on(() => this.reset());
    }

    reset() {
        this.currentStep = {
            field: this.state.field,
            pieces: [],
        };
        this.playing = false;
        this.done = false;
        this.count = 0;
        this.savedSteps = [];
        this.$iterator = null;
    }

    next() {
        this.playing = false;
        this.scanForward();
    }

    play() {
        this.playing = true;
        this.scanForward();
    }

    pause() {
        this.playing = false;
    }

    getPieceStats(): Map<number, number> {
        const counts = new Map<number, number>();
        for (const step of this.savedSteps) {
            for (const piece of step.pieces) {
                const count = counts.get(piece.index) || 0;
                counts.set(piece.index, count + 1);
            }
        }
        return counts;
    }

    exportJson() {
        createDownloadFile('hexcomb-solutions.json', JSON.stringify(this.savedSteps));
    }

    async importJson() {
        try {
            const text = await openFile();
            const json = JSON.parse(text);
            this.savedSteps = [];
            for (const data of json) {
                this.savedSteps.push({
                    field: HexSet.fromJSON(data.field),
                    pieces: data.pieces.map((d: any) => {
                        return {
                            index: Number(d.index),
                            cells: HexSet.fromJSON(d.cells),
                        };
                    }),
                });
            }
        } catch (err) {
            console.warn('Could not import file', err);
        }
    }

    protected async scanForward() {
        if (!this.$iterator) {
            // OPT prevent using Vue-observed state
            const hexcomb = new HexComb(
                toRaw(this.state.field),
                toRaw(this.state.pieces),
                toRaw(this.state.allowFlip),
            );
            this.$iterator = hexcomb.generateSteps();
        }
        while (true) {
            const { value: step, done } = this.$iterator.next();
            if (done) {
                this.done = true;
                this.playing = false;
                return;
            }
            this.count += 1;
            this.currentStep = step;
            // Save perfect fits
            if (step.field.size === 0) {
                this.savedSteps.push(step);
                await new Promise(r => setTimeout(r, 10));
            }
            if (this.count % 1000 === 0) {
                await new Promise(r => setTimeout(r, 10));
            }
            if (!this.playing) {
                return;
            }
        }
    }

}

export interface PieceStat {
    index: number;
    count: number;
}
