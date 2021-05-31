<template>
    <EditField :state="state"/>
    <EditPieces :state="state"/>
</template>

<script>
import EditField from './EditField.vue';
import EditPieces from './EditPieces.vue';
import { State } from './state';

export default {

    components: {
        EditField,
        EditPieces,
    },

    data() {
        return {
            state: new State().load(),
        }
    }

}
</script>
