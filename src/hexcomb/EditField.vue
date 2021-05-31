<template>
    <h2>Field</h2>
    <p>
        First, let's define the <em>field</em> — a collection of hex cells
        where player can place the pieces.
    </p>
    <HexInput
        :rings="4"
        :radius="16"
        :value="state.field"
        @change="onChange()"/>
    <p>
        The walkable area is <strong>{{ area }}</strong>.
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
            return this.state.field.length;
        }

    },

    methods: {

        onChange() {
            this.state.save();
        }

    }

}
</script>
