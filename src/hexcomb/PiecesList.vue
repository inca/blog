<template>
    <div class="PiecesList">
        <div class="PieceItem"
            v-for="(piece, i) of value"
            :key="i">
            <HexInput
                :radius="8"
                :rings="2"
                :value="piece.cells"
                :fillActive="getColor(i)"
                @change="onPieceChanged(piece)"/>
            <button class="PieceRemoveButton"
                @click="removePiece(i)"
                title="Remove piece">
                &times;
            </button>
        </div>
        <button class="PieceAddButton"
            @click="addPiece()"
            title="Add piece">
            + Add piece
        </button>
    </div>
</template>

<script>
import { schemeTableau10 } from 'd3-scale-chromatic';
import HexInput from './HexInput.vue';

export default {

    components: {
        HexInput
    },

    props: {
        value: { type: Array, required: true }
    },

    methods: {

        getColor(i) {
            return schemeTableau10[i % 10];
        },

        addPiece() {
            this.value.push({ cells: [] });
            this.$emit('change');
        },

        removePiece(i) {
            this.value.splice(i, 1);
            this.$emit('change');
        },

        onPieceChanged() {
            this.$emit('change');
        },

    },

}
</script>

<style scoped>
.PiecesList {
    margin: 1em 0;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}

.PieceItem {
    position: relative;
}

.PieceRemoveButton {
    position: absolute;
    top: 0;
    right: 0;
    width: 1.5em;
    height: 1.5em;
    text-align: center;
    padding: 0;

    border-radius: 32px;
    border: 1px solid #000;
}
</style>
