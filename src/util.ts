export function onReady(fn: () => void) {
    if (document.readyState === 'interactive' || document.readyState === "complete") {
        setTimeout(fn, 0);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

export function externalizeLinks(scope: HTMLElement) {
    const links = [].slice.call(scope.querySelectorAll('article a')) as HTMLAnchorElement[];
    for (const link of links) {
        if (link.origin !== location.origin) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener');
        }
    }
}

export function highlightCode(scope: HTMLElement) {
    const blocks = [].slice.call(scope.querySelectorAll('pre code')) as HTMLElement[];
    for (const block of blocks) {
        window.hljs.highlightBlock(block);
    }
}

export function initContent(el: HTMLElement = document.documentElement) {
    externalizeLinks(el);
    highlightCode(el);
    if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
    }
}

export type Vector = Vector2 | Vector3 | Vector4;
export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type Vector4 = [number, number, number, number];

export function lerp(a: number, b: number, t: number) {
    return a * (1 - t) + b * t;
}

export function clamp(x: number, min: number, max: number) {
    return Math.max(Math.min(x, max), min);
}

export function saturate(x: number) {
    return clamp(x, 0, 1);
}

export function smoothstep(min: number, max: number, x: number) {
    var x = saturate((x - min) / (max - min));
    return x * x * (3 - 2 * x);
};

export function step(y: number, x: number) {
    return x > y ? 1 : 0;
}

export function dot<V extends Vector>(a: V, b: V): number {
    let res = 0;
    for (let i = 0; i < a.length; i++) {
        res += a[i] * b[i];
    }
    return res;
}

export function add<V extends Vector>(a: V, b: V | number): V {
    let res = [];
    for (let i = 0; i < a.length; i++) {
        const p = typeof b === 'number' ? b : b[i];
        res[i] = a[i] + p;
    }
    return res as V;
}

export function mul<V extends Vector>(a: V, b: V | number): V {
    let res = [];
    for (let i = 0; i < a.length; i++) {
        const p = typeof b === 'number' ? b : b[i];
        res[i] = a[i] * p;
    }
    return res as V;
}

export function div<V extends Vector>(a: V, b: V | number): V {
    let res = [];
    for (let i = 0; i < a.length; i++) {
        const p = typeof b === 'number' ? b : b[i];
        res[i] = a[i] / p;
    }
    return res as V;
}
