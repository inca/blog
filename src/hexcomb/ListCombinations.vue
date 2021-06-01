<template>
    <h2>Combinations</h2>
    <p>
        Let's now iterate all possible combinations.
    </p>
    <PlaySteps :model="model"/>
</template>

<script>
import PlaySteps from './PlaySteps.vue';
import { Model } from './model';

export default {

    components: {
        PlaySteps,
    },

    props: {
        model: { type: Model, required: true },
    },

}
</script>
