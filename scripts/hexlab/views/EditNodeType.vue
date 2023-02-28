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

                <FormField label="Layer">
                    <input
                        v-model="nodeType.layer"
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

                <FormField label="Role">
                    <select v-model="nodeType.role">
                        <option
                            value=""
                            label="None" />
                        <option
                            value="actor"
                            label="Actor" />
                    </select>
                </FormField>

                <!--
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
                -->

                <EditMask
                    v-model="nodeType.placeMask"
                    label="Place Mask" />

                <EditMask
                    v-model="nodeType.passMask"
                    label="Pass Mask" />

                <EditMask
                    v-model="nodeType.blockMask"
                    label="Block Mask" />

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
import EditMask from './EditMask.vue';

export default {
    components: { EditMask },

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

    }

};
</script>

<style scoped>
.EditNodeType {
    margin: var(--sp) 0;
}
</style>
