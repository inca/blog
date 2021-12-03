<template>
    <div class="PiecesList">
        <template
            v-for="group, i of uniqRotations">
            <div class="PieceItem"
                v-for="(piece, j) of group"
                :key="i * 10 + j">
                <HexInput
                    :readonly="true"
                    :radius="4"
                    :rings="2"
                    :hexset="piece"
                    :colorIndex="i"/>
            </div>
        </template>
    </div>
</template>

<script>
export default {

    inject: [
        'state',
    ],

    computed: {

        uniqRotations() {
            return this.state.pieces.map(_ => _.uniqRotations());
        },

    },

};
</script>

<style scoped>
.PieceItem {
    display: inline-block;
}
</style>
