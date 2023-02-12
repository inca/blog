<template>
    <path
        class="HexCell"
        :d="path"
        :stroke="borderColor"
        :stroke-width="borderWidth"
        :fill="fillColor"
        :transform="transform" />
    <image
        v-if="image"
        :href="image"
        :height="ir"
        :width="ir"
        :x="-.5 * ir"
        :y="-.5 * ir"
        :transform="transform" />
</template>

<script>
import { Hex } from '../commons/Hex.js';
import { getSvgPath } from '../commons/util.js';

export default {

    props: {
        hex: { type: Hex, default: Hex.zero },
        radius: { type: Number, default: 16 },
        borderColor: { type: String },
        borderWidth: { type: Number },
        fillColor: { type: String },
        image: { type: String },
        imageSize: { type: Number, default: .75 }
    },

    computed: {

        path() {
            return getSvgPath(Hex.zero, this.radius);
        },

        transform() {
            const [x, y] = this.hex.toOrthogonal(this.radius);
            return `translate(${x}, ${y}) scale(1, -1)`;
        },

        ir() {
            return this.radius * 2 * this.imageSize;
        },

    }


};
</script>

<style scoped>
.HexCell {
}
</style>
