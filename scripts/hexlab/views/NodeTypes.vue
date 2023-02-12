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
            <SvgPlot
                :radius="16"
                :margin="4">
                <SvgHexCell
                    :radius="16"
                    :fillColor="nodeType.fill"
                    :borderColor="nodeType.border"
                    :borderWidth="2"
                    :image="nodeType.image" />
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

};
</script>

<style scoped>
.NodeTypes {
    --tile-size: 48px;

    flex: 0 0 auto;
    display: flex;
    flex-flow: row wrap;
    gap: var(--sp);

    overflow-y: auto;
}

.Tile {
    flex: 0 0 auto;
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
    background: var(--color-base-1);
}
</style>
