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

    <h2>Pieces</h2>
    <p>
        Next we define which pieces are available for placement.
    </p>
    <PiecesList
        :value="state.pieces"
        @change="onChange()"/>

</template>

<script>
import HexInput from './HexInput.vue';
import PiecesList from './PiecesList.vue';
import { State } from './state';

export default {

    components: {
        HexInput,
        PiecesList,
    },

    data() {
        return {
            state: new State().load(),
        }
    },

    methods: {

        onChange() {
            this.state.save();
        }

    }

}
</script>
