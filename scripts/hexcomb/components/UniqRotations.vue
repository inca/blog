<template>
    <div class="PiecesList">
        <span
            v-for="group, i of uniqRotations"
            :key="i">
            <span class="PieceItem"
                v-for="(piece, j) of group"
                :key="j">
                <HexInput
                    :readonly="true"
                    :radius="4"
                    :rings="2"
                    :hexset="piece"
                    :colorIndex="i"/>
            </span>
        </span>
    </div>
</template>

<script>
export default {

    inject: [
        'state',
    ],

    computed: {

        uniqRotations() {
            return this.state.pieces.map(_ => [..._.uniqRotations()]);
        },

    },

};
</script>

<style scoped>
.PieceItem {
    display: inline-block;
}
</style>
