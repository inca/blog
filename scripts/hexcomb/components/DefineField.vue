<template>
    <HexInput
        class="HexInput"
        :rings="4"
        :radius="16"
        :hexset="state.field"
        @change="onChange()"/>
</template>

<script>
import HexInput from './HexInput.vue';

export default {

    inject: [
        'state',
    ],

    components: {
        HexInput,
    },

    computed: {

        area() {
            return this.state.field.size;
        },

        rotSymmetry() {
            return this.state.field.rotSymmetry();
        },

    },

    methods: {

        onChange() {
            this.state.save();
        }

    }

};
</script>
