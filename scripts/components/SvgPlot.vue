<template>
    <svg
        :width="width"
        :height="height">
        <g
            class="Center"
            :transform="`translate(${width / 2}, ${height / 2}) scale(1, -1)`">
            <slot />
        </g>
    </svg>
</template>

<script>
import { getPlotHeight, getPlotWidth } from '../commons/util.js';

export default {

    props: {
        rings: { type: Number, default: 0 },
        radius: { type: Number, default: 16 },
    },

    computed: {

        width() {
            return getPlotWidth(this.rings, this.radius, 0);
        },

        height() {
            return getPlotHeight(this.rings, this.radius, 0);
        },

    },
};
</script>

<style scoped>
</style>
