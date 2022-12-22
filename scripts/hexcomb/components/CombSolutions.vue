<template>
    <div class="SavedSteps">
        <DrawStep
            v-for="step of state.savedSteps"
            :key="step"
            :step="step"
            :radius="8" />
    </div>
</template>

<script>
export default {

    inject: [
        'state',
    ],

};
</script>

<style scoped>
.SavedSteps {
    display: flex;
    flex-flow: row wrap;
}
</style>
