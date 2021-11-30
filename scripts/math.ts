export type Vector = Vector2 | Vector3 | Vector4;
export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type Vector4 = [number, number, number, number];

export const sqrt2 = Math.sqrt(2);
export const sqrt3 = Math.sqrt(3);

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
