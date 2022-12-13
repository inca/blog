import { Mesh } from '@nodescript/mesh';
import { App as VueApp, createApp, reactive, ReactiveFlags } from 'vue';

import { globalProvideMap } from '../commons/provide.js';
import { ModDiagram } from './diagram.js';
import Root from './Root.vue';

export class App {
    mesh: Mesh;
    vue: VueApp;

    constructor() {
        this.mesh = new Mesh();
        (this.mesh as any)[ReactiveFlags.SKIP] = true;
        this.mesh.use(instance => reactive(instance));
        this.mesh.service(ModDiagram);
        this.vue = createApp({
            inject: Object.keys(this.provides),
        });
        this.vue.component('Root', Root);
    }

    start() {
        for (const [alias, instance] of Object.entries(this.provides)) {
            this.vue.provide(alias, instance);
        }
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
