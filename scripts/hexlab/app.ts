import { Mesh } from 'mesh-ioc';
import { App as VueApp, createApp, reactive, ReactiveFlags } from 'vue';

import { invokeInitHandlers } from '../commons/init.js';
import { globalProvideMap } from '../commons/provide.js';
import FormField from '../components/FormField.vue';
import HGroup from '../components/HGroup.vue';
import SvgHexCell from '../components/SvgHexCell.vue';
import SvgPlot from '../components/SvgPlot.vue';
import VGroup from '../components/VGroup.vue';
import { EventManager } from './managers/EventManager.js';
import { NodeTypesManager } from './managers/NodeTypesManager.js';
import { StateManager } from './managers/StateManager.js';
import RootView from './views/Root.vue';

export class App {
    mesh: Mesh;
    vue: VueApp;

    constructor() {
        this.mesh = new Mesh();
        (this.mesh as any)[ReactiveFlags.RAW] = true;
        this.mesh.use(instance => reactive(instance));
        this.vue = createApp(RootView);
        this.mesh.service(StateManager);
        this.mesh.service(NodeTypesManager);
        this.mesh.service(EventManager);
        this.vue.component('FormField', FormField);
        this.vue.component('HGroup', HGroup);
        this.vue.component('VGroup', VGroup);
        this.vue.component('SvgHexCell', SvgHexCell);
        this.vue.component('SvgPlot', SvgPlot);
    }

    async start() {
        for (const [alias, instance] of Object.entries(this.provides)) {
            this.vue.provide(alias, instance);
        }
        await invokeInitHandlers(this.mesh, true);
        this.vue.mount('#app');
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
