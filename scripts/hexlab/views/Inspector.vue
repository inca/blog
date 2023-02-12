<template>
    <div class="Inspector">
        <Slots />
        <h4>Node Types</h4>
        <NodeTypes />
        <EditNodeType />
    </div>
</template>

<script>
import EditNodeType from './EditNodeType.vue';
import NodeTypes from './NodeTypes.vue';
import Slots from './Slots.vue';

export default {

    components: {
        Slots,
        NodeTypes,
        EditNodeType
    },

};
</script>

<style scoped>
.Inspector {
    padding: var(--sp);
    width: 240px;
    border-right: 2px solid var(--color-base-1);
}
</style>
