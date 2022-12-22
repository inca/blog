<template>
    <div class="block">
        <template v-if="!combinator.done">
            <button
                :disabled="combinator.playing"
                @click="combinator.next()">
                Next Step
            </button>
            &nbsp;
            <button
                v-if="!combinator.playing"
                @click="combinator.play()">
                Play
            </button>
            <button
                v-if="combinator.playing"
                @click="combinator.pause()">
                Pause
            </button>
        </template>
        <template v-if="combinator.done">
            <button disabled>
                Done!
            </button>
        </template>
        &nbsp;
        <button
            :disabled="combinator.playing"
            @click="combinator.reset()">
            Reset
        </button>
        &nbsp;
        <span
            v-if="combinator.count > 0"
            class="color-subtle">
            {{ combinator.count }} steps processed
        </span>
    </div>
</template>

<script>
export default {

    inject: ['combinator']

};
</script>
