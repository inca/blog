<template>
    <h2>Field</h2>
    <p>
        First, let's define the <em>field</em> — a collection of hex cells
        where player can place the pieces.
    </p>
    <HexInput
        :rings="4"
        :radius="16"
        :hexset="state.field"
        @change="onChange()"/>
    <p>
        The field area is <strong>{{ area }}</strong> hex cells.
        It has
            <strong v-if="radialSymmetry.length">C{{ radialSymmetry.length + 1}}</strong>
            <strong v-else>no</strong>
            radial symmetry.
    </p>
</template>

<script>
import HexInput from './HexInput.vue';
import { State } from './state';

export default {

    props: {
        state: { type: State, required: true },
    },

    components: {
        HexInput,
    },

    computed: {

        area() {
            return this.state.field.size;
        },

        radialSymmetry() {
            return this.state.field.getRadialSymmetry();
        },

    },

    methods: {

        onChange() {
            this.state.save();
        }

    }

}
</script>
