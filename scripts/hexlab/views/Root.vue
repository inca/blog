<template>
    <div class="Root">
        <Inspector />
        <GameField />
    </div>
</template>

<script>
import GameField from './GameField.vue';
import Inspector from './Inspector.vue';

export default {

    components: {
        Inspector,
        GameField,
    },

    inject: [
        'state'
    ],

};
</script>

<style scoped>
.Root {
    display: flex;
    height: 100vh;
    box-sizing: border-box;

    font-family: var(--font-family-alt);
    font-size: var(--font-size--small);
}
</style>
