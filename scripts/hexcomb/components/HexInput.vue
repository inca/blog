<template>
    <div
        class="HexInput"
        :class="{
            'HexInput--readonly': readonly,
        }">
        <svg
            :width="width"
            :height="height">
            <g
                class="Center"
                :transform="`translate(${width / 2}, ${height / 2}) scale(1, -1)`">
                <g
                    v-for="(hex, i) in cells"
                    :key="i"
                    :transform="getTransform(hex)">
                    <path
                        class="HexCell"
                        :class="{ 'HexCell--active': isCellActive(hex) }"
                        :d="hexPath"
                        :style="getStyle(hex)"
                        @mousemove="onMouseMove(hex)"
                        @mousedown="onMouseDown(hex)"
                        @mouseup="onMouseUp(hex)" />
                    <text class="HexInput__label" />
                </g>
            </g>
        </svg>
    </div>
</template>

<script>
import { Hex } from '../../commons/Hex';
import { HexSet } from '../../commons/HexSet';
import { colorScheme, getPlotHeight, getPlotWidth, getSvgPath } from '../../commons/util';

export default {

    props: {
        hexset: { type: HexSet, required: true },
        rings: { type: Number, default: 3 },
        radius: { type: Number, default: 16 },
        margin: { type: Number, default: 16 },
        colorIndex: { type: Number },
        readonly: { type: Boolean, default: false },
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

        isCellActive(hex) {
            return this.hexset.has(hex);
        },

        getStyle(hex) {
            if (!this.isCellActive(hex) || this.colorIndex == null) {
                return {};
            }
            return {
                fill: colorScheme[this.colorIndex % colorScheme.length],
            };
        },

        setCell(hex, value) {
            if (this.readonly) {
                return;
            }
            if (value && !this.hexset.has(hex)) {
                this.hexset.add(hex);
                this.$emit('change');
            } else if (!value && this.hexset.has(hex)) {
                this.hexset.remove(hex);
                this.$emit('change');
            }
        },

        onMouseDown(hex) {
            if (this.readonly) {
                return;
            }
            this.dragMode = !this.hexset.has(hex);
            this.setCell(hex, this.dragMode);
        },

        onMouseUp(_hex) {
            this.dragMode = null;
        },

        onMouseMove(hex) {
            if (this.readonly) {
                return;
            }
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
    font-family: var(--font-family-alt)
}

.HexCell {
    stroke-width: 1px;
    stroke: var(--hex-border-color);
    fill: var(--hex-color);
}

.HexCell--active {
    fill: var(--hex-color--active);
}
</style>
