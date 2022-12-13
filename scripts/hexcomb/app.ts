import { Mesh } from '@nodescript/mesh';
import { App as VueApp, createApp, reactive, ReactiveFlags } from 'vue';
import { invokeInitHandlers } from '../commons/init.js';

import { globalProvideMap } from '../commons/provide.js';
import CombControls from './components/CombControls.vue';
import CombSolutions from './components/CombSolutions.vue';
import CombStats from './components/CombStats.vue';
import DefineField from './components/DefineField.vue';
import DefineFlip from './components/DefineFlip.vue';
import DefinePieces from './components/DefinePieces.vue';
import DrawStep from './components/DrawStep.vue';
import HexInput from './components/HexInput.vue';
import ImportExport from './components/ImportExport.vue';
import PieceVariations from './components/PieceVariations.vue';
import { CombinatorService } from './services/combinator.js';
import { EventBus } from './services/events.js';
import { State } from './services/state.js';

export class App {
    mesh: Mesh;
    vue: VueApp;

    constructor() {
        this.mesh = new Mesh();
        (this.mesh as any)[ReactiveFlags.SKIP] = true;
        this.mesh.use(instance => reactive(instance));
        this.mesh.service(CombinatorService);
        this.mesh.service(EventBus);
        this.mesh.service(State);
        this.vue = createApp({
            inject: Object.keys(this.provides),
        });
        this.vue.component('CombControls', CombControls);
        this.vue.component('CombSolutions', CombSolutions);
        this.vue.component('CombStats', CombStats);
        this.vue.component('DefineField', DefineField);
        this.vue.component('DefineFlip', DefineFlip);
        this.vue.component('DefinePieces', DefinePieces);
        this.vue.component('DrawStep', DrawStep);
        this.vue.component('HexInput', HexInput);
        this.vue.component('ImportExport', ImportExport);
        this.vue.component('PieceVariations', PieceVariations);
    }

    async start() {
        for (const [alias, instance] of Object.entries(this.provides)) {
            this.vue.provide(alias, instance);
        }
        await invokeInitHandlers(this.mesh, true);
        this.vue.mount('.page');
    }

    get provides() {
        const provides: Record<string, any> = {};
        for (const [alias, ctor] of globalProvideMap) {
            const instance = this.mesh.resolve(ctor);
            provides[alias] = instance;
        }
        return provides;
    }

}
