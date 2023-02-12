<template>
    <label
        class="FormField"
        :class="[
            `FormField--${align}`
        ]">
        <div class="Label">{{ label }}</div>
        <div class="Slot">
            <slot />
        </div>
    </label>
</template>

<script>
export default {

    props: {
        label: { type: String },
        align: { type: String, default: 'baseline' },
    },

};
</script>

<style scoped>
.FormField {
    display: flex;
    gap: var(--sp);
}

.FormField--center { align-items: center }
.FormField--baseline { align-items: baseline }

.Label {
    flex: 1;
    text-align: right;
}

.Slot {
    flex: 2;
}
</style>
