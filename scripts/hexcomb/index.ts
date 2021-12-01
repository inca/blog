import { createApp, reactive } from 'vue';

import ComputeCombs from './ComputeCombs.vue';
import DefineField from './DefineField.vue';
import DefinePieces from './DefinePieces.vue';
import DrawStep from './DrawStep.vue';
import HexInput from './HexInput.vue';
import { Model } from './Model';

const model = reactive(Model.load());

const app = createApp({
    data() {
        return {
            model,
        };
    }
});
app.config.globalProperties.model = model;

app.component('DrawStep', DrawStep);
app.component('HexInput', HexInput);
app.component('DefineField', DefineField);
app.component('DefinePieces', DefinePieces);
app.component('ComputeCombs', ComputeCombs);

app.mount('.page');
