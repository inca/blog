<template>
    <div class="DrawStep">
        <svg
            :width="width"
            :height="height">
            <g :transform="`translate(${width / 2}, ${height / 2}) scale(1, -1)`">
                <path
                    v-for="(hex, i) in step.field"
                    :key="i"
                    class="HexCell"
                    :d="getPath(hex)" />

                <g
                    v-for="piece of step.pieces"
                    :key="piece">
                    <path
                        v-for="hex in piece.cells"
                        :key="hex"
                        class="HexCell HexCell--piece"
                        :d="getPath(hex)"
                        :style="getPieceStyle(piece.index)" />
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
import { colorScheme, getPlotHeight, getPlotWidth, getSvgPath } from '../../commons/util';

export default {

    inject: [
        'state'
    ],

    props: {
        step: { type: Object, required: true },
        radius: { type: Number, default: 16 },
        margin: { type: Number, default: 16 },
    },

    computed: {

        cells() {
            return [...this.state.field];
        },

        rings() {
            return this.state.field.occupiedRings;
        },

        width() {
            return getPlotWidth(this.rings, this.radius, this.margin);
        },

        height() {
            return getPlotHeight(this.rings, this.radius, this.margin);
        },

    },

    methods: {

        getPath(hex) {
            return getSvgPath(hex, this.radius);
        },

        getPieceStyle(index) {
            return { fill: colorScheme[index] };
        },

    }

};
</script>

<style scoped>
.HexCell {
    stroke-width: 1px;
    stroke: var(--hex-border-color);
    fill: var(--color-base-0);
}
</style>
