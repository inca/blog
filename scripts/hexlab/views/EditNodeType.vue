<template>
    <div
        v-if="nodeType"
        class="EditNodeType">

        <VGroup>

            <FormField label="Id">
                <input
                    v-model="nodeType.id"
                    type="text"
                    @input="state.save()" />
            </FormField>

            <FormField label="Z">
                <input
                    v-model="nodeType.z"
                    type="number"
                    min="0"
                    max="10000"
                    @input="state.save()" />
            </FormField>

            <FormField label="Fill">
                <input
                    v-model="nodeType.fill"
                    type="text"
                    @input="state.save()" />
            </FormField>

            <FormField label="Border">
                <input
                    v-model="nodeType.border"
                    type="text"
                    @input="state.save()" />
            </FormField>

            <FormField label="Image">
                <input
                    v-model="nodeType.image"
                    type="text"
                    @input="state.save()" />
            </FormField>

            <FormField label="Placement">
                <VGroup>
                    <HGroup
                        v-for="placement, i of nodeType.placement"
                        :key="i">
                        <span>{{ placement }}</span>
                        <button @click="removePlacement(i)">
                            <i class="fas fa-times" />
                        </button>
                    </HGroup>
                    <HGroup>
                        <select v-model="newPlacement">
                            <option
                                :value="null"
                                label="- select -" />
                            <option
                                value="default"
                                label="default" />
                            <option
                                v-for="nt, i of nodeTypes.all"
                                :key="i"
                                :label="nt.id"
                                :value="nt.id"
                                :disabled="nt.id === nodeType.id" />
                        </select>
                        <button @click="addPlacement()">
                            <i class="fas fa-plus" />
                        </button>
                    </HGroup>
                </VGroup>
            </FormField>

        </VGroup>

    </div>
</template>

<script>
import HGroup from '../../components/HGroup.vue';

export default {
    components: { HGroup },

    inject: [
        'nodeTypes',
        'state',
    ],

    data() {
        return {
            newPlacement: null,
        };
    },

    computed: {

        nodeType() {
            return this.nodeTypes.selected;
        }

    },

    methods: {

        addPlacement() {
            const pl = this.newPlacement;
            if (!pl || pl === this.nodeType.id) {
                return;
            }
            this.nodeType.placement.push(pl);
            this.newPlacement = null;
            this.state.save();
        },

        removePlacement(i) {
            this.nodeType.placement.splice(i, 1);
            this.state.save();
        }

    }

};
</script>

<style scoped>
.EditNodeType {
    margin: var(--sp) 0;
}
</style>
