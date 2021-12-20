<template>
    <div class="PiecesList">
        <div
            v-for="group, i of uniqVariations"
            :key="i">
            <span class="PieceItem"
                v-for="(piece, j) of group"
                :key="j">
                <HexInput
                    :readonly="true"
                    :radius="6"
                    :rings="2"
                    :hexset="piece"
                    :colorIndex="i"/>
            </span>
        </div>
    </div>
</template>

<script>
export default {

    inject: [
        'state',
    ],

    computed: {

        uniqVariations() {
            return this.state.pieces.map(_ => [..._.uniqVariations(this.state.allowFlip)]);
        },

    },

};
</script>

<style scoped>
.PieceItem {
    display: inline-block;
}
</style>
