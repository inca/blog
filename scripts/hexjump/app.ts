import { Mesh } from 'mesh-ioc';
import { App as VueApp, createApp, reactive, ReactiveFlags } from 'vue';
import { invokeInitHandlers } from '../commons/init.js';

import { globalProvideMap } from '../commons/provide.js';

export class App {
    mesh: Mesh;
    vue: VueApp;

    constructor() {
        this.mesh = new Mesh();
        (this.mesh as any)[ReactiveFlags.SKIP] = true;
        this.mesh.use(instance => reactive(instance));
        this.vue = createApp({
            inject: Object.keys(this.provides),
        });

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
