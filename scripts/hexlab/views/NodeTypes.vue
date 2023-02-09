<template>
    <div class="NodeTypes">

        <div
            v-for="nodeType, i of nodeTypes.all"
            :key="i"
            class="NodeType Tile">
            Hi
        </div>

        <button
            class="AddNodeType Tile"
            title="Add node type"
            @click="nodeTypes.addNodeType()">
            <i class="fas fa-plus" />
        </button>
    </div>
</template>

<script>
export default {

    inject: [
        'nodeTypes',
    ]

};
</script>

<style scoped>
.NodeTypes {
    --tile-size: 96px;

    flex: 0 0 auto;
    display: flex;
    flex-flow: column nowrap;

    padding: var(--sp);
    border-right: 2px solid var(--background-color--dim);

    overflow-y: auto;
}

.Tile {
    width: var(--tile-size);
    height: var(--tile-size);
    display: flex;
    align-items: center;
    justify-content: center;
}

.AddNodeType {
    border: 0;
    background: var(--background-color--dim);
    border-radius: var(--border-radius);
}
</style>
