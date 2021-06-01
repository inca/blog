<template>
    <div class="DrawStep">
        <svg :width="width" :height="height">
            <g class="Center"
                :transform="`translate(${width / 2}, ${height / 2}) scale(1, -1)`">
                <path v-for="(hex, i) in cells"
                    :key="i"
                    :d="getPath(hex)"
                    :stroke="stroke"
                    :fill="fill"
                    :stroke-width="strokeWidth"/>

                <g v-for="piece of pieces"
                    :key="piece">
                    <path v-for="hex in piece.cells"
                        :key="hex"
                        :d="getPath(hex)"
                        :stroke="stroke"
                        :fill="getPieceFill(piece.index)"
                        :stroke-width="strokeWidth"/>
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
import { Step } from './step';
import { colorScheme } from '../util';
import { Model } from './model';
import { getPlotHeight, getPlotWidth, getSvgPath } from './helpers';

export default {

    props: {
        model: { type: Model, required: true },
        step: { type: Step, required: true },
        radius: { type: Number, default: 16 },
        margin: { type: Number, default: 16 },
        fill: { type: String, default: '#fff' },
        stroke: { type: String, default: 'rgba(0,0,0,.25)' },
        strokeWidth: { type: Number, default: 1 },
    },

    computed: {

        cells() {
            return this.model.field.getCells();
        },

        rings() {
            return this.model.field.maxRing();
        },

        width() {
            return getPlotWidth(this.rings, this.radius, this.margin);
        },

        height() {
            return getPlotHeight(this.rings, this.radius, this.margin);
        },

        pieces() {
            return [...this.step.iteratePieces()];
        },

    },

    methods: {

        getPath(hex) {
            return getSvgPath(hex, this.radius);
        },

        getPieceFill(index) {
            return colorScheme[index];
        },

    }

}
</script>
