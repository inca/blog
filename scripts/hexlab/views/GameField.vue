<template>
    <div class="GameField">
        <SvgHexPlot
            :radius="24"
            :rings="rings"
            :margin="16">

            <SvgHexCell
                v-for="cell, i of cells"
                :key="i"
                :hex="cell"
                :radius="24"
                borderColor="var(--hex-border-color)"
                fillColor="transparent" />

            <SvgHexCell
                v-for="node, i of gameField.field.getAllNodes()"
                :key="i"
                :hex="node.hex"
                :radius="24"
                :fillColor="node.nodeType.fill"
                :borderColor="node.nodeType.border"
                :borderWidth="2"
                :image="node.nodeType.image"
                :imageSize=".6" />

            <SvgHexCell
                v-for="cell, i of cells"
                :key="i"
                :hex="cell"
                :radius="24"
                fillColor="transparent"
                @mousedown="onMouseDown(cell, $event)"
                @mousemove="onMouseMove(cell, $event)" />
        </SvgHexPlot>
    </div>
</template>

<script>
import { Hex } from '../../commons/Hex.js';

export default {

    inject: [
        'nodeTypes',
        'gameField',
    ],

    props: {
        rings: { type: Number, default: 5 },
    },

    data() {
        return {
            dragging: false,
        };
    },

    computed: {

        cells() {
            return [...Hex.spiral(Hex.zero, 0, this.rings)];
        },

    },

    mounted() {
        window.addEventListener('mouseup', this.onMouseUp);
    },

    unmounted() {
        window.removeEventListener('mouseup', this.onMouseUp);
    },

    methods: {

        onMouseDown(cell, ev) {
            this.dragging = true;
            this.applyTool(cell, ev);
        },

        onMouseMove(cell, ev) {
            if (this.dragging) {
                this.applyTool(cell, ev);
            }
        },

        onMouseUp() {
            this.dragging = false;
        },

        applyTool(cell, ev) {
            if (ev.altKey) {
                this.gameField.removeCell(cell);
            } else {
                this.gameField.addCell(cell);
            }
        }

    }

};
</script>

<style>
.GameField {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
