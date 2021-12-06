import { service } from '@inca/vue-mesh';
import { dep } from 'mesh-ioc';
import { toRaw } from 'vue';

import { HexComb } from '../../commons/HexComb';
import { HexSet } from '../../commons/HexSet';
import { Step } from '../../commons/types';
import { State } from './state';

@service('combinator')
export class CombinatorService {

    @dep() state!: State;

    savedSteps: Step[] = [];

    currentStep: Step = { field: new HexSet(), pieces: [] };
    playing = false;
    done = false;
    count = 0;

    $iterator: IterableIterator<Step> | null = null;

    init() {
        this.currentStep = {
            field: this.state.field,
            pieces: [],
        };
    }

    reset() {
        this.init();
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

    protected async scanForward() {
        if (!this.$iterator) {
            // OPT prevent using Vue-observed state
            const hexcomb = new HexComb(toRaw(this.state.field), toRaw(this.state.pieces));
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
