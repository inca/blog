<template>
    <div class="block">
        <button @click="combinator.next()"
            :disabled="combinator.playing">
            Next
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
        <template v-if="combinator.done">
            &nbsp;
            <strong>Done!</strong>
        </template>
    </div>
</template>

<script>
export default {

    inject: ['combinator']

};
</script>
