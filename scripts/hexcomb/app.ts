import { Mesh, serviceMetadata } from 'mesh-ioc';
import { App as VueApp, createApp, reactive } from 'vue';

// https://webpack.js.org/guides/dependency-management/#requirecontext
const resolve = (require as any).context('./services', true, /\.ts$/);
for (const key of resolve.keys()) {
    resolve(key);
}

export class App {

    vue: VueApp;
    mesh: Mesh;
    services: Record<string, any> = {};
    initialised = false;

    constructor() {
        this.vue = createApp({});
        this.mesh = new Mesh('App');
        this.mesh.use(_ => reactive(_));
        this.bindServices();
    }

    async init() {
        this.provideServices();
        for (const service of Object.values(this.services)) {
            if (service.init) {
                await service.init();
            }
        }
        this.initialised = true;
    }

    bindServices() {
        for (const svc of serviceMetadata) {
            this.mesh.service(svc.class);
            if (svc.alias) {
                this.mesh.alias(svc.alias, svc.class);
            }
        }
    }

    provideServices() {
        for (const svc of serviceMetadata) {
            if (svc.alias) {
                const instance = this.mesh.resolve(svc.alias);
                this.services[svc.alias] = instance;
                this.vue.provide(svc.alias, instance);
            }
        }
    }

}
