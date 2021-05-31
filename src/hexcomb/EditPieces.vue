<template>
    <h2>Pieces</h2>
    <p>
        Next we define which pieces are available for placement.
    </p>
    <div class="PiecesList">
        <div class="PieceItem"
            v-for="(piece, i) of state.pieces"
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
    <p>
        That's <strong>{{ cellCount }}</strong> cells in total.
    </p>
</template>

<script>
import { schemeTableau10 } from 'd3-scale-chromatic';
import HexInput from './HexInput.vue';
import { State } from './state';

export default {

    components: {
        HexInput
    },

    props: {
        state: { type: State, required: true }
    },

    computed: {

        cellCount() {
            return this.state.pieces.reduce((sum, p) => sum + p.cells.length, 0);
        },

    },

    methods: {

        getColor(i) {
            return schemeTableau10[i % 10];
        },

        addPiece() {
            this.value.push({ cells: [] });
            this.save();
        },

        removePiece(i) {
            this.value.splice(i, 1);
        },

        onPieceChanged() {
            this.save();
        },

        save() {
            this.state.save();
            this.$emit('change');
        }

    },

}
</script>

<style scoped>
.PiecesList {
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
