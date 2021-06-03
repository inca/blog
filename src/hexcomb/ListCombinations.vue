<template>
    <h2>Combinations</h2>
    <p>
        Let's now iterate over all possible combinations.
    </p>
    <PlaySteps :model="model"/>
</template>

<script>
import PlaySteps from './PlaySteps.vue';
import { Model } from './Model';

export default {

    components: {
        PlaySteps,
    },

    props: {
        model: { type: Model, required: true },
    },

}
</script>
