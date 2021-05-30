import SimplexNoise from 'simplex-noise';
import { Vector4, Vector2 } from '../math';

export class LeafGenerator {
    noise: SimplexNoise;
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;

    maskMap: CanvasRenderingContext2D;

    steps: number = 4;
    seed: string = 'seed';
    noiseScale: number = 20;

    genes = [
        { r: 0.9, a: 0 },
        { r: 0.8, a: 40 },
        { r: 0.8, a: -40 },
        { r: 0.7, a: 95 },
        { r: 0.7, a: -95 },
        { r: 0.5, a: 120 },
        { r: 0.5, a: -120 },
    ];

    constructor(
        public canvas: HTMLCanvasElement,
    ) {
        this.noise = new SimplexNoise(this.seed);
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width;
        this.height = canvas.height;
        clear(this.ctx);

        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = this.width;
        maskCanvas.height = this.height;
        this.maskMap = maskCanvas.getContext('2d')!;
        clear(this.maskMap);
    }

    draw() {
        const iter = this.traverse();
        const timer = setInterval(() => {
            const { done } = iter.next();
            if (done) {
                console.log('done');
                clearInterval(timer);
                return;
            }
        }, 10);
    }

    *traverse(): IterableIterator<Node> {
        let frontier: Node[] = [
            { step: 0, uv: [0.5, 0.5], a: 0, r: 1 },
        ];

        const stepSize = 0.1;   // Should be relative to number of steps, somehow.

        for (let step = 1; step <= this.steps; step++) {
            if (!frontier.length) {
                return;
            }
            const newFrontier: Node[] = [];
            for (const parent of frontier) {
                const offsprings: Node[] = this.genes.map(gene => {
                    const r = gene.r * parent.r;
                    const a = gene.a + parent.a;
                    const uv1 = this.move(parent.uv, a, stepSize * r);
                    const [x, y] = this.uv2xy(uv1);
                    const existingPixel = getPixel(this.maskMap, x, y);
                    const uv2 = this.move(parent.uv, a, stepSize * r * (1 - existingPixel[0]));
                    return {
                        parent,
                        step,
                        uv: uv2,
                        r: r * (1 - existingPixel[0]),
                        a
                    };
                });
                for (const node of offsprings) {
                    if (node.r < .01) {
                        console.log('culled');
                        continue;
                    }
                    this.ctx.strokeStyle = 'rgba(255,255,255,.5)';
                    this.ctx.lineWidth = 4 * node.r;
                    this.ctx.beginPath();
                    const [x1, y1] = this.uv2xy(parent.uv);
                    const [x2, y2] = this.uv2xy(node.uv);
                    this.ctx.moveTo(x1, y1);
                    this.ctx.lineTo(x2, y2);
                    this.ctx.stroke();

                    // Draw to mask
                    const grad = this.maskMap.createRadialGradient(x1, y1, 100 * parent.r, x2, y2, 10 * node.r);
                    grad.addColorStop(0, 'rgba(255,0,0,0)');
                    grad.addColorStop(1, 'rgba(255,0,0,.2)');
                    this.maskMap.fillStyle = grad;
                    this.maskMap.fillRect(0, 0, this.width, this.height);

                    // Show mask
                    //this.ctx.putImageData(this.maskMap.getImageData(0, 0, this.width, this.height), 0, 0);

                    yield node;
                    newFrontier.push(node);
                }
            }
            frontier = newFrontier;
        }
    }

    sampleNoiseXY(xy: Vector2) {
        const [u, v] = this.xy2uv(xy);
        return this.sampleNoiseUV(u, v);
    }

    sampleNoiseUV(u: number, v: number) {
        const scale = this.noiseScale;
        return this.noise.noise2D(u * scale, v * scale) * .5 + .5;
    }

    drawNoise() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                setPixel(this.ctx, x, y, this.sampleNoiseXY([x, y]));
            }
        }
    }

    xy2uv(xy: Vector2): Vector2 {
        const [x, y] = xy;
        return [x / this.width, 1 - y / this.height];
    }

    uv2xy(uv: Vector2): Vector2 {
        const [u, v] = uv;
        return [u * this.width, (1 - v) * this.height];
    }

    move(uv: Vector2, angle: number, distance: number): Vector2 {
        return [
            uv[0] - Math.sin(angle * Math.PI / 180) * distance,
            uv[1] + Math.cos(angle * Math.PI / 180) * distance,
        ];
    }

    partition(value: number, count: number, power: number = 2) {
        // Based on area of quadratic function
        const integral = (x: number) => Math.pow(x, power);
        const results: number[] = [];
        const fullArea = integral(1);
        for (let i = 1; i <= count; i++) {
            const area = integral(i / count) - integral((i - 1) / count);
            results.push(Math.abs(value * area / fullArea));
        }
        return results;
    }

}

function chance<T>(rnd: number, from: T, ...thresholds: [number, T][]): T {
    const chances = thresholds.sort((a, b) => a[0] > b[0] ? -1 : 1);
    for (const c of chances) {
        if (rnd > c[0]) {
            return c[1];
        }
    }
    return from;
}

function getPixel(ctx: CanvasRenderingContext2D, x: number, y: number): Vector4 {
    const data = ctx.getImageData(x, y, 1, 1).data;
    return [
        data[0] / 255,
        data[1] / 255,
        data[2] / 255,
        data[3] / 255,
    ];
}

function setPixel(ctx: CanvasRenderingContext2D, x: number, y: number, v: number) {
    const imgData = ctx.createImageData(1, 1);
    imgData.data[0] = v * 255;
    imgData.data[1] = v * 255;
    imgData.data[2] = v * 255;
    imgData.data[3] = 255;
    ctx.putImageData(imgData, x, y);
}

function clear(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export interface Node {
    parent?: Node;
    // Step
    step: number;
    // Coordinates
    uv: Vector2;
    // Angle
    a: number,
    // Radius
    r: number;
}
