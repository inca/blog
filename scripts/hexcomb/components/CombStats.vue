<template>
    <div class="CombStats">
        <div
            class="CombPiece"
            v-for="piece, i of state.pieces"
            :key="i">
            <HexInput
                :readonly="true"
                :radius="6"
                :rings="2"
                :hexset="piece"
                :colorIndex="i"/>
            <span class="color-subtle text-small">
            {{ pieceStats.get(i) || 0 }} times
            </span>
        </div>
    </div>
</template>

<script>
export default {

    inject: [
        'combinator',
        'state',
    ],

    computed: {

        pieceStats() {
            return this.combinator.getPieceStats();
        },

    }

};
</script>

<style scoped>
.CombPiece {
    display: inline-block;
    text-align: center;
}
</style>
