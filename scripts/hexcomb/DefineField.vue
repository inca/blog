<template>
    <HexInput
        :rings="4"
        :radius="16"
        :hexset="model.field"
        @change="onChange()"/>
    <p>
        This field has <strong>{{ area }}</strong> cells.
        It has
            <strong v-if="rotSymmetry > 1">C{{ rotSymmetry }}</strong>
            <strong v-else>no</strong>
            rotational symmetry.
    </p>
</template>

<script>
import HexInput from './HexInput.vue';

export default {

    components: {
        HexInput,
    },

    computed: {

        area() {
            return this.model.field.size;
        },

        rotSymmetry() {
            return this.model.field.rotSymmetry();
        },

    },

    methods: {

        onChange() {
            this.model.save();
        }

    }

};
</script>
