<template>
    <FormField :label="label">
        <VGroup>
            <HGroup
                v-for="item, i of modelValue"
                :key="i">
                <span>{{ item }}</span>
                <button @click="remove(i)">
                    <i class="fas fa-times" />
                </button>
            </HGroup>
            <HGroup>
                <select v-model="newItem">
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
                        :value="nt.id" />
                </select>
                <button @click="add()">
                    <i class="fas fa-plus" />
                </button>
            </HGroup>
        </VGroup>
    </FormField>
</template>

<script>
export default {

    inject: [
        'nodeTypes',
    ],

    props: {
        modelValue: { type: Array },
        label: { type: String },
    },

    data() {
        return {
            newItem: null,
        };
    },

    methods: {

        add() {
            const item = this.newItem;
            if (!item) {
                return;
            }
            const arr = this.modelValue.slice();
            if (arr.includes(item)) {
                return;
            }
            arr.push(item);
            this.newItem = null;
            this.$emit('update:modelValue', arr);
        },

        remove(i) {
            const arr = this.modelValue.slice();
            arr.splice(i, 1);
            this.$emit('update:modelValue', arr);
        },
    }

};
</script>

<style scoped>

</style>
