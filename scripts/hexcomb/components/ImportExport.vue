<template>
    <div class="ImportExport">
        <button @click="exportJson()">
            Save to JSON
        </button>
        &nbsp;
        <button @click="importJson()">
            Load from JSON
        </button>
        &nbsp;
        <transition name="fade-scale">
            <span
                v-if="message"
                class="color-subtle text-small">
                {{ message }}
            </span>
        </transition>
    </div>
</template>

<script>
export default {

    inject: [
        'state'
    ],

    data() {
        return {
            message: '',
        };
    },

    methods: {

        async exportJson() {
            await this.state.exportJson();
        },

        async importJson() {
            try {
                clearTimeout(this._timer);
                this.message = '';
                await this.state.importJson();
                this.message = `✅ Imported a field with ${this.state.field.size} cells and ${this.state.pieces.length} pieces`;
            } catch (err) {
                this.message = `❌ Something went wrong`;
            } finally {
                this._timer = setTimeout(() => this.message = '', 5000);
            }
        }

    }

};
</script>
