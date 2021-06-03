<template>
    <SectionField :model="model"/>
    <SectionPieces :model="model"/>
    <SectionCombinations :model="model"/>
</template>

<script>
import SectionField from './SectionField.vue';
import SectionPieces from './SectionPieces.vue';
import SectionCombinations from './SectionCombinations.vue';
import { Model } from './Model';

export default {

    components: {
        SectionField,
        SectionPieces,
        SectionCombinations,
    },

    data() {
        return {
            model: Model.load(),
        }
    }

}
</script>
