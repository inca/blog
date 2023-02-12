<template>
    <div
        v-if="nodeType"
        class="EditNodeType">

        <VGroup>

            <ExpandLabel
                v-model="settingsShown"
                label="Settings" />

            <template v-if="settingsShown">

                <FormField label="Id">
                    <input
                        v-model="nodeType.id"
                        type="text" />
                </FormField>

                <FormField label="Z">
                    <input
                        v-model="nodeType.z"
                        type="number"
                        min="0"
                        max="10000" />
                </FormField>

                <FormField label="Fill">
                    <input
                        v-model="nodeType.fill"
                        type="text" />
                </FormField>

                <FormField label="Border">
                    <input
                        v-model="nodeType.border"
                        type="text" />
                </FormField>

                <FormField label="Image">
                    <input
                        v-model="nodeType.image"
                        type="text" />
                </FormField>

                <FormField label="Roles">
                    <VGroup>
                        <label>
                            <input
                                v-model="nodeType.roles"
                                value="actor"
                                type="checkbox" />
                            <span>actor</span>
                        </label>
                        <label>
                            <input
                                v-model="nodeType.roles"
                                value="goal"
                                type="checkbox" />
                            <span>goal</span>
                        </label>
                    </VGroup>
                </FormField>

                <FormField label="Place Mask">
                    <VGroup>
                        <HGroup
                            v-for="id, i of nodeType.placeMask"
                            :key="i">
                            <span>{{ id }}</span>
                            <button @click="removePlace(i)">
                                <i class="fas fa-times" />
                            </button>
                        </HGroup>
                        <HGroup>
                            <select v-model="newPlace">
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
                            <button @click="addPlace()">
                                <i class="fas fa-plus" />
                            </button>
                        </HGroup>
                    </VGroup>
                </FormField>

                <FormField label="Pass Mask">
                    <VGroup>
                        <HGroup
                            v-for="id, i of nodeType.passMask"
                            :key="i">
                            <span>{{ id }}</span>
                            <button @click="removePass(i)">
                                <i class="fas fa-times" />
                            </button>
                        </HGroup>
                        <HGroup>
                            <select v-model="newPass">
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
                            <button @click="addPass()">
                                <i class="fas fa-plus" />
                            </button>
                        </HGroup>
                    </VGroup>
                </FormField>

                <ExpandLabel
                    v-model="advancedShown"
                    label="Advanced" />

                <template v-if="advancedShown">
                    <button @click="nodeTypes.removeNodeType(nodeTypes.selectedIndex)">
                        Delete
                    </button>
                </template>

            </template>
        </VGroup>
    </div>
</template>

<script>
import VGroup from '../../components/VGroup.vue';

export default {
    components: { VGroup },

    inject: [
        'nodeTypes',
        'state',
    ],

    data() {
        return {
            settingsShown: false,
            advancedShown: false,
            newPlace: null,
            newPass: null,
        };
    },

    computed: {

        nodeType() {
            return this.nodeTypes.selected;
        }

    },

    methods: {

        addPlace() {
            const pl = this.newPlace;
            if (!pl || pl === this.nodeType.id) {
                return;
            }
            this.nodeType.placeMask.push(pl);
            this.newPlace = null;
        },

        removePlace(i) {
            this.nodeType.placeMask.splice(i, 1);
        },

        addPass() {
            const pl = this.newPass;
            if (!pl || pl === this.nodeType.id) {
                return;
            }
            this.nodeType.passMask.push(pl);
            this.newPass = null;
        },

        removePass(i) {
            this.nodeType.passMask.splice(i, 1);
        },

    }

};
</script>

<style scoped>
.EditNodeType {
    margin: var(--sp) 0;
}
</style>
