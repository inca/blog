<template>
    <EditField :model="model"/>
    <EditPieces :model="model"/>
    <ListCombinations :model="model"/>
</template>

<script>
import EditField from './EditField.vue';
import EditPieces from './EditPieces.vue';
import ListCombinations from './ListCombinations.vue';
import { Model } from './Model';

export default {

    components: {
        EditField,
        EditPieces,
        ListCombinations,
    },

    data() {
        return {
            model: new Model().load(),
        }
    }

}
</script>
