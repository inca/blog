<template>
    <div class="Root">
        <NodeTypes />
        <GameField />
    </div>
</template>

<script>
import GameField from './GameField.vue';
import NodeTypes from './NodeTypes.vue';

export default {

    components: {
        NodeTypes,
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
}
</style>
