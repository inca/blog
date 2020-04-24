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
