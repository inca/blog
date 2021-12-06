<template>
    <div class="Staff">
        <svg class="Lines">
            <line x1="0" x2="640" y1="0" y2="0"/>
            <line x1="0" x2="640" y1="12" y2="12"/>
            <line x1="0" x2="640" y1="24" y2="24"/>
            <line x1="0" x2="640" y1="36" y2="36"/>
            <line x1="0" x2="640" y1="48" y2="48"/>
        </svg>
        <div class="Clef">
            𝄞 hello
        </div>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.Staff {
    position: relative;
}

.Lines line {
    stroke: var(--text-color);
}

.Clef {
    position: absolute;
    top: 0;
    font-size: 64px;
}
</style>
