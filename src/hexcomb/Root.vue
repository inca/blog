<template>
    <EditField :model="model"/>
    <EditPieces :model="model"/>
</template>

<script>
import EditField from './EditField.vue';
import EditPieces from './EditPieces.vue';
import { Model } from './model';

export default {

    components: {
        EditField,
        EditPieces,
    },

    data() {
        return {
            model: new Model().load(),
        }
    }

}
</script>
