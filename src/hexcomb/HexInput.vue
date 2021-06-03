<template>
    <div class="HexInput">
        <svg :width="width" :height="height">
            <g class="Center"
                :transform="`translate(${width / 2}, ${height / 2}) scale(1, -1)`">
                <path v-for="(hex, i) in cells"
                    :key="i"
                    :d="getPath(hex)"
                    :stroke="stroke"
                    :fill="getFill(hex)"
                    :stroke-width="strokeWidth"
                    @mousemove="onMouseMove(hex)"
                    @mousedown="onMouseDown(hex)"
                    @mouseup="onMouseUp(hex)"/>
            </g>
        </svg>
    </div>
</template>

<script>
import { Hex } from '../hex';
import { HexSet } from './HexSet';
import { getPlotHeight, getPlotWidth, getSvgPath } from './helpers';

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

    },

    methods: {

        getPath(hex) {
            return getSvgPath(hex, this.radius);
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

        onMouseUp(hex) {
            this.dragMode = null;
        },

        onMouseMove(hex) {
            if (this.dragMode != null) {
                this.setCell(hex, this.dragMode);
            }
        },

    }

}
</script>
