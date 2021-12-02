import { Mesh, serviceMetadata } from 'mesh-ioc';
import { App as VueApp, createApp, reactive } from 'vue';

// Resolve services and components

const components = new Map<string, any>();

// https://webpack.js.org/guides/dependency-management/#requirecontext
const resolveServices = (require as any).context('./services', true, /\.ts$/);
for (const key of resolveServices.keys()) {
    resolveServices(key);
}
const resolveComponents = (require as any).context('./components', true, /\.vue$/);
for (const key of resolveComponents.keys()) {
    const module = resolveComponents(key);
    const name = key.replace(/\.vue$/, '').replace(/[^a-z0-9_-]/gi, '');
    components.set(name, module.default);
}

export class App {

    vue: VueApp;
    mesh: Mesh;
    services: Record<string, any> = {};
    initialised = false;

    constructor() {
        this.vue = createApp({
            inject: serviceMetadata.map(_ => _.alias ?? '').filter(Boolean),
        });
        this.mesh = new Mesh('App');
        this.mesh.use(_ => reactive(_));
        this.bindServices();
        this.registerComponents();
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

    registerComponents() {
        for (const [k, v] of components) {
            this.vue.component(k, v);
        }
    }

}
