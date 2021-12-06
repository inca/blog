import { App, serviceDescriptors } from '@inca/vue-mesh';

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

const app = new App({
    inject: [...serviceDescriptors.keys()],
});

for (const [key, component] of components) {
    app.vue.component(key, component);
}

app.init().then(() => {
    app.vue.mount('.page');
});
