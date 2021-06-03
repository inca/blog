<template>
    <DrawStep
        :model="model"
        :step="step" />
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
    </div>
    <div class="SavedSteps">
        <DrawStep v-for="step of savedSteps"
            :key="step"
            :step="step"
            :model="model"
            :radius="8"/>
    </div>
</template>

<script>
import { Model } from './model';
import { Step } from './Step';
import DrawStep from './DrawStep.vue';

export default {

    components: {
        DrawStep,
    },

    props: {
        model: { type: Model, required: true },
    },

    data() {
        return {
            savedSteps: [],
            ...this.getNewData(),
        };
    },

    methods: {

        getNewData() {
            return {
                step: Step.init(this.model),
                iterator: null,
                done: false,
                playing: false,
            };
        },

        reset() {
            Object.assign(this, {
                ...this.getNewData(),
                savedSteps: [],
            });
        },

        next() {
            if (!this.iterator) {
                this.iterator = this.step.generateSteps();
            }
            const { value, done } = this.iterator.next();
            if (done) {
                this.done = true;
                this.playing = false;
            }
            if (value) {
                this.step = value;
                // Stop on perfect fit
                if (this.step.field.size === 0) {
                    this.savedSteps.push(this.step);
                    this.playing = false;
                }
            }
        },

        play() {
            this.playing = true;
            this._playLoop();
        },

        pause() {
            this.playing = false;
        },

        async _playLoop() {
            while (this.playing) {
                await new Promise(r => requestAnimationFrame(r));
                this.next();
            }
        },

    }

}
</script>

<style scoped>
.SavedSteps {
    display: flex;
    flex-flow: row wrap;
}
</style>
