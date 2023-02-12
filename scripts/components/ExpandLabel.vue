<template>
    <div
        class="ExpandLabel"
        @click="toggle()">
        <i
            class="Icon"
            :class="modelValue ? 'fas fa-angle-down' : 'fas fa-angle-right'"
        />
        <div class="Label">
            <template v-if="!modelValue">
                {{ labelExpand ?? label }}
            </template>
            <template v-if="modelValue">
                {{ labelCollapse ?? label }}
            </template>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        modelValue: { type: Boolean },
        label: { type: String },
        labelExpand: { type: String },
        labelCollapse: { type: String },
    },

    methods: {

        toggle() {
            this.$emit('update:modelValue', !this.modelValue);
        }

    }

};
</script>

<style scoped>
.ExpandLabel {
    display: flex;
    align-items: center;
    height: var(--control-size);
    cursor: pointer;
}

.Icon {
    display: flex;
    justify-content: center;
    width: var(--sp3);
}
</style>
