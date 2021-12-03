<template>
    <div class="block">
        <button @click="combinator.next()"
            :disabled="combinator.playing">
            Next Step
        </button>
        &nbsp;
        <button v-if="!combinator.playing"
            @click="combinator.play()">
            Play
        </button>
        <button v-if="combinator.playing"
            @click="combinator.pause()">
            Pause
        </button>
        &nbsp;
        <button @click="combinator.reset()"
            :disabled="combinator.playing">
            Reset
        </button>
    </div>
</template>

<script>
export default {

    inject: ['combinator']

};
</script>
