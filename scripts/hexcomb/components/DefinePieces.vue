<template>
    <div class="PiecesList">
        <div
            v-for="(piece, i) of state.pieces"
            :key="i"
            class="PieceItem">
            <HexInput
                :radius="8"
                :rings="2"
                :hexset="piece"
                :colorIndex="i"
                @change="onPieceChanged(piece)" />
            <span class="PieceSymmetry">C{{ piece.rotSymmetry() }}</span>
            <button
                class="PieceRotateCw button button--circle"
                title="Rotate CW"
                @click="rotate(i, 5)">
                &orarr;
            </button>
            <button
                class="PieceRotateCcw button button--circle"
                title="Rotate CCW"
                @click="rotate(i, 1)">
                &olarr;
            </button>
            <button
                class="PieceRemoveButton button button--circle"
                title="Remove piece"
                @click="removePiece(i)">
                &times;
            </button>
        </div>
        <button
            class="PieceAddButton"
            title="Add piece"
            @click="addPiece()">
            + Add piece
        </button>
    </div>
</template>

<script>
import { HexSet } from '../../commons/HexSet';

export default {

    inject: [
        'state',
    ],

    methods: {

        addPiece() {
            this.state.pieces.push(new HexSet());
            this.save();
        },

        removePiece(i) {
            this.state.pieces.splice(i, 1);
            this.save();
        },

        rotate(i, dir) {
            const piece = this.state.pieces[i];
            this.state.pieces[i] = piece.rotate(dir);
            this.save();
        },

        onPieceChanged() {
            this.save();
        },

        save() {
            this.state.save();
        }

    },

};
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

.PieceSymmetry {
    position: absolute;
    top: 8px;
    left: 8px;
    font-family: var(--font-family--alt);
    font-size: var(--font-size--small);
}
</style>
