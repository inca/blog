<template>
    <h2>Combinations</h2>
    <p>
        Let's now iterate over all possible combinations.
    </p>
    <DrawStep
        :model="model"
        :step="currentStep" />
    <div class="block">
        <button @click="next()"
            :disabled="playing">
            Next
        </button>
        &nbsp;
        <button v-if="!playing"
            @click="play()">
            Play
        </button>
        <button v-if="playing"
            @click="pause()">
            Pause
        </button>
        &nbsp;
        <button @click="reset()"
            :disabled="playing">
            Reset
        </button>
        <template v-if="done">
            &nbsp;
            <strong>Done!</strong>
        </template>
    </div>
    <p v-if="count > 0">
        Processed <strong>{{ count }}</strong> steps so far. {{ savedSteps.length }}
    </p>
    <!-- TODO factor away -->
    <div class="SavedSteps">
        <DrawStep v-for="step of savedSteps"
            :key="step"
            :step="step"
            :model="model"
            :radius="8"/>
    </div>
</template>

<script>
import { Model } from './Model';
import { Combinator } from './Combinator';
import DrawStep from './DrawStep.vue';

export default {

    components: {
        DrawStep,
    },

    props: {
        model: { type: Model, required: true },
    },

    data() {
        return this.getNewData();
    },

    methods: {

        getNewData() {
            return {
                currentStep: { field: this.model.field, pieces: [] },
                done: false,
                playing: false,
                savedSteps: [],
                count: 0,
            };
        },

        reset() {
            Object.assign(this, this.getNewData());
            this.$iterator = null;
        },

        next() {
            this.playinf = false;
            this._scanForward();
        },

        play() {
            this.playing = true;
            this._scanForward();
        },

        pause() {
            this.playing = false;
        },

        async _scanForward() {
            if (!this.$iterator) {
                // OPT prevent using Vue-observed model
                const combinator = new Combinator(Model.load());
                this.$iterator = combinator.generateSteps();
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

}
</script>

<style scoped>
.SavedSteps {
    display: flex;
    flex-flow: row wrap;
}
</style>
