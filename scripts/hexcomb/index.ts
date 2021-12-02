import { App } from './app';

const app = new App();

app.init().then(() => {
    app.vue.mount('.page');
});
