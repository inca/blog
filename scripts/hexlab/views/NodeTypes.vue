<template>
    <div class="NodeTypes">

        <div
            v-for="nodeType, i of nodeTypes.all"
            :key="i"
            class="NodeType Tile"
            :class="{
                'Tile--Selected': nodeTypes.selectedIndex === i,
            }"
            @click="nodeTypes.select(i)">
            <SvgPlot :radius="radius">
                <SvgHexCell
                    :radius="radius"
                    :fillColor="nodeType.fill"
                    :borderColor="nodeType.border" />
            </SvgPlot>
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
    ],

    data() {
        return {
            radius: 24,
        };
    }

};
</script>

<style scoped>
.NodeTypes {
    --tile-size: 96px;

    flex: 0 0 auto;
    display: flex;
    flex-flow: column nowrap;
    gap: var(--sp);

    padding: var(--sp);
    border-right: 2px solid var(--background-color--dim);

    overflow-y: auto;
}

.Tile {
    width: var(--tile-size);
    height: var(--tile-size);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--border-radius);
    border: 2px solid var(--color-base-1);
}

.Tile:hover:not(.Tile--Selected) {
    border-color: var(--color-base-2);
}

.Tile--Selected {
    border-color: var(--color-primary);
}

.AddNodeType {
    background: var(--background-color--dim);
}
</style>
