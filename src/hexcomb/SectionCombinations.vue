<template>
    <h2>Combinations</h2>
    <p>
        Let's now iterate over all possible combinations.
    </p>
    <Combinations :model="model"/>
</template>

<script>
import Combinations from './Combinations.vue';
import { Model } from './Model';

export default {

    components: {
        Combinations,
    },

    props: {
        model: { type: Model, required: true },
    },

}
</script>
