<template>
    <div
        class="HGroup"
        :class="[
            `HGroup--align-${align}`,
            `HGroup--justify-${justify}`,
            `HGroup--gap-${gap}`,
        ]">
        <slot />
    </div>
</template>

<script>
export default {

    props: {
        align: { type: String, default: 'center' },
        justify: { type: String },
        gap: { type: String, default: '1' },
    }

};
</script>

<style scoped>
.HGroup {
    display: flex;
    flex-flow: row nowrap;
}

.HGroup--align-stretch { align-items: stretch; }
.HGroup--align-baseline { align-items: baseline; }
.HGroup--align-center { align-items: center; }
.HGroup--align-start { align-items: flex-start; }
.HGroup--align-end { align-items: flex-end; }

.HGroup--justify-center { justify-content: center; }
.HGroup--justify-start { justify-content: flex-start; }
.HGroup--justify-end { justify-content: flex-end; }
.HGroup--justify-space-around { justify-content: space-around; }
.HGroup--justify-space-between { justify-content: space-between; }

.HGroup--gap-0 { gap: 0 }
.HGroup--gap-1 { gap: var(--sp) }
.HGroup--gap-2 { gap: var(--sp2) }
</style>
