<template>
    <path
        class="HexCell"
        :d="path"
        :stroke="strokeColor"
        :fill="fillColor"
        :transform="transform" />
</template>

<script>
import { Hex } from '../commons/Hex.js';
import { getSvgPath } from '../commons/util.js';

export default {

    props: {
        hex: { type: Hex, default: Hex.zero },
        radius: { type: Number, default: 16 },
        strokeColor: { type: String },
        fillColor: { type: String },
    },

    computed: {

        path() {
            return getSvgPath(Hex.zero, this.radius);
        },

        transform() {
            const [x, y] = this.hex.toOrthogonal(this.radius);
            return `translate(${x}, ${y}) scale(1, -1)`;
        }

    }


};
</script>

<style scoped>
.HexCell {

}
</style>
