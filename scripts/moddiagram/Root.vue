<template>
    <div class="Root">
        <div class="Controls">
            <label class="Row">
                <div class="Label">Multiplier</div>
                <input
                    v-model="modDiagram.multiplier"
                    type="number"
                    min="1"
                    max="65535"
                    step="1" />
            </label>
            <label class="Row">
                <div class="Label">Modulo</div>
                <input
                    v-model="modDiagram.modulo"
                    type="number"
                    min="1"
                    max="65535"
                    step="1" />
            </label>
            <label class="Row">
                <div class="Label">Zoom</div>
                <input
                    v-model="modDiagram.radius"
                    type="number"
                    min="1"
                    max="65535"
                    step="1" />
            </label>
            <label class="Row">
                <div class="Label">Stroke</div>
                <input
                    v-model="modDiagram.stroke"
                    type="number"
                    min="0"
                    max="2"
                    step=".1" />
            </label>
            <label class="Row">
                <div class="Label">Hue</div>
                <input
                    v-model="modDiagram.hueRange[0]"
                    type="number"
                    min="0"
                    max="360"
                    step="1" />
                <input
                    v-model="modDiagram.hueRange[1]"
                    type="number"
                    min="0"
                    max="360"
                    step="1" />
            </label>
            <label class="Row">
                <div class="Label">Opacity</div>
                <input
                    v-model="modDiagram.opacityRange[0]"
                    type="number"
                    min="0"
                    max="100"
                    step="1" />
                <input
                    v-model="modDiagram.opacityRange[1]"
                    type="number"
                    min="0"
                    max="100"
                    step="1" />
            </label>
        </div>
        <canvas
            ref="canvas"
            :width="640"
            :height="640" />
    </div>
</template>

<script>
export default {

    inject: [
        'modDiagram'
    ],

    watch: {
        'modDiagram': {
            deep: true,
            handler() {
                this.modDiagram.draw();
            }
        },
    },

    mounted() {
        this.modDiagram.mount(this.$refs.canvas);
    },

    destroyed() {
        this.modDiagram.destroy();
    }

};
</script>

<style scoped>
.Controls {
    display: flex;
    align-items: center;
}

.Row {
    display: block;
    margin: var(--sp2);
}

canvas {
    width: 100%;
}
</style>
