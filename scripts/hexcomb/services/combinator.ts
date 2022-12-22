import { dep } from 'mesh-ioc';
import { toRaw } from 'vue';

import { HexComb, HexCombStep } from '../../commons/HexComb.js';
import { HexSet } from '../../commons/HexSet.js';
import { provide } from '../../commons/provide.js';
import { EventBus } from './events.js';
import { State } from './state.js';

@provide('combinator')
export class CombinatorService {

    @dep() state!: State;
    @dep() events!: EventBus;

    currentStep: HexCombStep = { field: new HexSet(), pieces: [] };
    playing = false;
    done = false;
    count = 0;

    $iterator: IterableIterator<HexCombStep> | null = null;

    reset() {
        this.currentStep = {
            field: this.state.field,
            pieces: [],
        };
        this.playing = false;
        this.done = false;
        this.count = 0;
        this.$iterator = null;
        this.state.savedSteps = [];
        this.state.save();
    }

    next() {
        this.playing = false;
        this.scanForward();
    }

    play() {
        if (!this.playing) {
            this.playing = true;
            this.scanForward();
        }
    }

    pause() {
        this.playing = false;
    }

    getPieceStats(): Map<number, number> {
        const counts = new Map<number, number>();
        for (const step of this.state.savedSteps) {
            for (const piece of step.pieces) {
                const count = counts.get(piece.index) || 0;
                counts.set(piece.index, count + 1);
            }
        }
        return counts;
    }

    protected async scanForward() {
        if (!this.$iterator) {
            // OPT prevent using Vue-observed state
            this.state.savedSteps = [];
            const hexcomb = new HexComb(
                toRaw(this.state.field),
                toRaw(this.state.pieces).map((cells, index) => {
                    return { cells, index };
                }),
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
                this.state.savedSteps.push(step);
                this.state.saveDebounced();
                await new Promise(r => setTimeout(r, 1));
            }
            if (this.count % 1000 === 0) {
                await new Promise(r => setTimeout(r, 1));
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
