<template>
    <label>
        <input
            type="checkbox"
            :checked="state.allowFlip"
            @change="onChange($event)"/>
        &nbsp;
        <span>
            <span v-if="state.allowFlip">Flipping is allowed</span>
            <span v-if="!state.allowFlip">Flipping is not allowed</span>
        </span>
    </label>
</template>

<script>
export default {

    inject: [
        'state',
    ],

    methods: {

        onChange(ev) {
            this.state.allowFlip = ev.target.checked;
            this.state.save();
        }

    }

};
</script>
