declare module '*.svg' {
    export default string;
}

declare module '*?raw' {
    export default string;
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
