declare namespace hljs {
    function highlightBlock(el: HTMLElement): void;
}

declare namespace MathJax {
    let extensions: string[];
    let tex: {
        inlineMath?: string[][];
        displayMath?: string[][];
    };
    let typeset: () => void | undefined;
}

declare module 'simplex-noise' {
    export default SimplexNoise;

    class SimplexNoise {
        constructor(seed?: number | string);
        noise2D(x: number, y: number): number;
        noise3D(x: number, y: number, z: number): number;
        noise4D(x: number, y: number, z: number, w: number): number;
    }
}
