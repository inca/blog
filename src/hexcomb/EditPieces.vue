<template>
    <h2>Pieces</h2>
    <p>
        Next, let's define which pieces are available for placement.
    </p>
    <div class="PiecesList">
        <div class="PieceItem"
            v-for="(piece, i) of state.pieces"
            :key="i">
            <HexInput
                :radius="8"
                :rings="2"
                :hexset="piece.cells"
                :fillActive="getColor(i)"
                @change="onPieceChanged(piece)"/>
            <button class="PieceRotateCw button button--circle"
                @click="rotate(i, 5)"
                title="Rotate CW">
                &orarr;
            </button>
            <button class="PieceRotateCcw button button--circle"
                @click="rotate(i, 1)"
                title="Rotate CCW">
                &olarr;
            </button>
            <button class="PieceRemoveButton button button--circle"
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
import HexInput from './HexInput.vue';
import { State } from './state';
import { tableau10 } from '../util';

export default {

    components: {
        HexInput
    },

    props: {
        state: { type: State, required: true }
    },

    computed: {

        cellCount() {
            return this.state.pieces.reduce((sum, p) => sum + p.cells.size, 0);
        },

    },

    methods: {

        getColor(i) {
            return tableau10[i % 10];
        },

        addPiece() {
            this.state.pieces.push({ cells: [] });
            this.save();
        },

        removePiece(i) {
            this.state.pieces.splice(i, 1);
            this.save();
        },

        rotate(i, dir) {
            const piece = this.state.pieces[i];
            piece.cells = piece.cells.rotate(dir);
            this.save();
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
    opacity: 0;
}

.PieceRotateCw {
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
}

.PieceRotateCcw {
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0;
}

.PieceItem:hover .PieceRemoveButton,
.PieceItem:hover .PieceRotateCw,
.PieceItem:hover .PieceRotateCcw {
    opacity: 1;
}
</style>
