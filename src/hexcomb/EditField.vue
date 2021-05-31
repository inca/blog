<template>
    <h2>Field</h2>
    <p>
        First, let's define the <em>field</em> — a collection of hex cells
        where the players can place their pieces.
    </p>
    <HexInput
        :rings="4"
        :radius="16"
        :hexset="model.field"
        @change="onChange()"/>
    <p>
        This field has <strong>{{ area }}</strong> cells.
        It has
            <strong v-if="radialSymmetry.length">C{{ radialSymmetry.length + 1}}</strong>
            <strong v-else>no</strong>
            radial symmetry.
    </p>
</template>

<script>
import HexInput from './HexInput.vue';
import { Model } from './model';

export default {

    props: {
        model: { type: Model, required: true },
    },

    components: {
        HexInput,
    },

    computed: {

        area() {
            return this.model.field.size;
        },

        radialSymmetry() {
            return this.model.field.getRadialSymmetry();
        },

    },

    methods: {

        onChange() {
            this.model.save();
        }

    }

}
</script>
