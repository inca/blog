<template>
    <div class="Slots">
        <button
            v-for="slot of slots.allSlots"
            :key="slot"
            class="Tile"
            :class="[
                {
                    'Tile--current': slots.currentSlot == slot,
                }
            ]"
            @click="slots.loadSlot(slot)">
            {{ slot }}
        </button>
        <button
            class="AddSlot Tile"
            @click="slots.addSlot()">
            <i class="fas fa-plus" />
        </button>
    </div>
</template>

<script>
export default {

    inject: [
        'slots'
    ]

};
</script>

<style scoped>
.Slots {
    --tile-size: 24px;

    display: flex;
    flex-flow: row wrap;
    gap: var(--sp);
}

.Tile {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--tile-size);
    height: var(--tile-size);
    box-sizing: border-box;

    border: 2px solid var(--color-base-1);
    border-radius: var(--border-radius);
    background: var(--color-base-0);
    font-weight: bold;
    color: var(--color-text-1);
}

.Tile--current {
    border-color: var(--color-primary);
}

.AddSlot {
    background: var(--color-base-1);
}
</style>
