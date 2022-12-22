<template>

    <div class="SetControls">
        <button @click="explorer.findSolutionSets()">
            Calc all sets
        </button>
        &nbsp;
        Min solutions
        <input
            v-model="minCount"
            type="number" />
    </div>

    <div
        v-for="set, index of shownSets"
        :key="index"
        class="SolutionSet"
        @click="selectSet(set)">
        <div class="SolutionSetCount">
            {{ set.count }}
        </div>
        <div class="SolutionSetPieces">
            <HexInput
                v-for="piece of set.pieces"
                :key="piece.index"
                :readonly="true"
                :radius="6"
                :rings="2"
                :hexset="piece.cells"
                :colorIndex="piece.index" />
        </div>
    </div>

    <div class="block">
        {{ explorer.filteredSteps.length }} solutions shown
    </div>
    <div
        ref="exploreSolutions"
        class="CombExplore">
        <div class="PieceSwitchColumn">
            <div
                v-for="piece, i of state.pieces"
                :key="i"
                class="CombPiece">
                <label class="PieceSelect">
                    <input
                        type="checkbox"
                        :checked="explorer.isPieceSelected(i)"
                        @change="onSelectionChanged(i, $event)" />
                    <HexInput
                        :readonly="true"
                        :radius="6"
                        :rings="2"
                        :hexset="piece"
                        :colorIndex="i" />
                </label>
            </div>
        </div>
        <div class="SolutionsColumn">
            <div class="SolutionsGrid">
                <DrawStep
                    v-for="step of explorer.filteredSteps"
                    :key="step"
                    :step="step"
                    :radius="6" />
            </div>
        </div>
    </div>
</template>

<script>
export default {

    inject: [
        'state',
        'explorer',
    ],

    data() {
        return {
            minCount: 0,
        };
    },

    computed: {

        shownSets() {
            return this.explorer.solutionSets.filter(_ => _.count >= this.minCount);
        },

    },

    methods: {

        onSelectionChanged(index, ev) {
            this.explorer.setPieceSelected(index, ev.target.checked);
        },

        selectSet(set) {
            this.explorer.selectSet(set);
            this.$refs.exploreSolutions.scrollIntoView();
        },

    }

};
</script>

<style scoped>
.CombExplore {
    display: flex;
    height: 100vh;
    gap: var(--sp2);
}

.PieceSwitchColumn {
    flex: 0 0 auto;
    overflow-y: auto;
}

.SolutionsColumn {
    flex: 1;
    overflow-y: auto;
}

.SolutionsGrid {
    display: flex;
    flex-flow: row wrap;
}

.PieceSelect {
    display: flex;
    align-items: center;
}

.SetControls {
    display: flex;
    gap: var(--sp);
    margin: var(--sp2) 0;
}

.SolutionSet {
    display: flex;
    align-items: center;
    margin: var(--sp);

    cursor: pointer;
    border-radius: var(--border-radius);
}

.SolutionSet:hover {
    background: var(--background-color--dim);
}

.SolutionSetCount {
    font-size: 48px;
    width: 96px;
    height: 96px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.SolutionSetPieces {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    min-width: 0;
    overflow-x: auto;
}
</style>
