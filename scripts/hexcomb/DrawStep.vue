<template>
    <div class="DrawStep">
        <svg :width="width" :height="height">
            <g :transform="`translate(${width / 2}, ${height / 2}) scale(1, -1)`">
                <path
                    class="HexCell"
                    v-for="(hex, i) in step.field"
                    :key="i"
                    :d="getPath(hex)"/>

                <g v-for="piece of step.pieces"
                    :key="piece">
                    <path
                        class="HexCell HexCell--piece"
                        v-for="hex in piece.cells"
                        :key="hex"
                        :d="getPath(hex)"
                        :style="getPieceStyle(piece.index)"/>
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
import { colorScheme } from '../util';
import { getPlotHeight, getPlotWidth, getSvgPath } from './helpers';
import { Model } from './Model';

export default {

    props: {
        model: { type: Model, required: true },
        step: { type: Object, required: true },
        radius: { type: Number, default: 16 },
        margin: { type: Number, default: 16 },
    },

    computed: {

        cells() {
            return [...this.model.field];
        },

        rings() {
            return this.model.field.occupiedRings;
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
    stroke: rgba(0,0,0,.25);
    fill: var(--background-color--inactive);
}
</style>
