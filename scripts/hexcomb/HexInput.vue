<template>
    <div class="HexInput">
        <svg :width="width" :height="height">
            <g class="Center"
                :transform="`translate(${width / 2}, ${height / 2}) scale(1, -1)`">
                <g v-for="(hex, i) in cells"
                    :key="i"
                    :transform="getTransform(hex)">
                    <path
                        :d="hexPath"
                        :stroke="stroke"
                        :fill="getFill(hex)"
                        :stroke-width="strokeWidth"
                        @mousemove="onMouseMove(hex)"
                        @mousedown="onMouseDown(hex)"
                        @mouseup="onMouseUp(hex)"/>
                    <text class="HexInput__label"></text>
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
import { Hex } from '../hex';
import { getPlotHeight, getPlotWidth, getSvgPath } from './helpers';
import { HexSet } from './HexSet';

export default {

    props: {
        hexset: { type: HexSet, required: true },
        rings: { type: Number, default: 3 },
        radius: { type: Number, default: 16 },
        margin: { type: Number, default: 16 },
        strokeWidth: { type: Number, default: 1 },
        stroke: { type: String, default: 'rgba(0,0,0,.25)' },
        fillActive: { type: String, default: '#fff' },
        fillInactive: { type: String, default: '#ddd' },
    },

    data() {
        return {
            dragMode: null,
        };
    },

    computed: {

        width() {
            return getPlotWidth(this.rings, this.radius, this.margin);
        },

        height() {
            return getPlotHeight(this.rings, this.radius, this.margin);
        },

        cells() {
            return [...Hex.spiral(Hex.zero, 0, this.rings)];
        },

        hexPath() {
            return getSvgPath(Hex.zero, this.radius);
        },

    },

    methods: {

        getTransform(hex) {
            const [x, y] = hex.toOrthogonal(this.radius);
            return `translate(${x}, ${y}) scale(1, -1)`;
        },

        getFill(hex) {
            return this.hexset.has(hex) ? this.fillActive : this.fillInactive;
        },

        setCell(hex, value) {
            if (value && !this.hexset.has(hex)) {
                this.hexset.add(hex);
                this.$emit('change');
            } else if (!value && this.hexset.has(hex)) {
                this.hexset.remove(hex);
                this.$emit('change');
            }
        },

        onMouseDown(hex) {
            this.dragMode = !this.hexset.has(hex);
            this.setCell(hex, this.dragMode);
        },

        onMouseUp(_hex) {
            this.dragMode = null;
        },

        onMouseMove(hex) {
            if (this.dragMode != null) {
                this.setCell(hex, this.dragMode);
            }
        },

    }

};
</script>

<style scoped>
.HexInput__label {
    text-anchor: middle;
    alignment-baseline: middle;
    font-size: 7px;
    font-family: var(--font-family--alt)
}
</style>
