<template>
    <div class="HexInput">
        <svg :width="width" :height="height">
            <g class="Center"
                :transform="`translate(${width / 2}, ${height / 2}) scale(1, -1)`">
                <path v-for="(hex, i) in cells"
                    :key="i"
                    :d="hexPath"
                    :transform="getTransform(hex)"
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
import { sqrt3 } from '../math';
import { Hex } from '../hex';
import { HexSet } from './hexset';

export default {

    props: {
        rings: { type: Number, default: 3 },
        radius: { type: Number, default: 16 },
        margin: { type: Number, default: 16 },
        strokeWidth: { type: Number, default: 1 },
        stroke: { type: String, default: 'rgba(0,0,0,.25)' },
        fillActive: { type: String, default: '#fff' },
        fillInactive: { type: String, default: '#ddd' },
        hexset: { type: HexSet, required: true },
    },

    data() {
        return {
            dragMode: null,
        };
    },

    computed: {

        width() {
            const r = this.rings * 2 + 1;
            return (r * this.radius + this.margin) * 2;
        },

        height() {
            const r = this.rings * 2 + 1;
            return (r * this.radius * sqrt3 / 2 + this.margin) * 2;
        },

        hexPath() {
            const r = this.radius;
            return 'M ' + Hex.VERTICES.map(v => `${v[0] * r},${v[1] * r}`).join(' ') + 'z';
        },

        cells() {
            return [...Hex.spiral(Hex.zero, 0, this.rings)];
        },

    },

    methods: {

        getTransform(hex) {
            const [x, y] = hex.toOrthogonal(this.radius);
            return `translate(${x}, ${y})`;
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

<style scoped>
svg {
    display: block;
}
</style>
