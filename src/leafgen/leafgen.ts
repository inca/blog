import SimplexNoise from 'simplex-noise';
import { Vector4, Vector2 } from '../util';

export class LeafGenerator {
    noise: SimplexNoise;
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    imageData: ImageData;

    constructor(
        public canvas: HTMLCanvasElement,
        public settings: {
            seed: string,
            noiseScale: number,
            iterations: number,
            initialNodes: Node[],
        } = {
                seed: 'seed',
                noiseScale: 20,
                iterations: 20,
                initialNodes: [{ u: 0, v: 0, r: 1, parents: [] }],
            },
    ) {
        this.noise = new SimplexNoise(settings.seed);
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width;
        this.height = canvas.height;
        this.clear();
        this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);
    }

    generate() {
        const iter = this.drawSteps();
        const timer = setInterval(() => {
            const { done } = iter.next();
            if (done) {
                console.log('done');
                clearInterval(timer);
                return;
            }
        }, 10);
    }

    *drawSteps() {
        for (const node of this.traverse()) {
            for (const parent of node.parents) {
                const [x1, y1] = this.uv2xy([parent.u, parent.v]);
                const [x2, y2] = this.uv2xy([node.u, node.v]);
                this.ctx.lineWidth = node.r * 20;
                this.ctx.strokeStyle = 'rgba(255,255,255,.5)';
                this.ctx.beginPath();
                this.ctx.moveTo(x1 + 20, y1);
                this.ctx.lineTo(x2 + 20, y2);
                this.ctx.stroke();
                yield;
            }
        }
    }

    *traverse(): IterableIterator<Node> {
        let queue: Node[] = this.settings.initialNodes;
        const n = this.settings.iterations;
        for (let i = 1; i <= n; i++) {
            const t = i / n;
            if (!queue.length) {
                return;
            }
            let offsprings: Node[] = [];
            for (const node of queue) {
                const noise = this.sampleNoiseUV(node.u, node.v);
                const childCount = chance(noise, 1, [.5, 2]);
                const decay = Math.pow(1 - ((i - 1) / n), .25);
                const maxR = node.r * Math.sqrt(childCount) * decay;
                const radiuses = this.partition(maxR, childCount, noise);
                for (const r of radiuses) {
                    if (r < 0.025) {
                        continue;
                    }
                    offsprings.push({ u: 0, v: 0, r, parents: [node] });
                }
            }
            // REDUCE
            for (let c = 0; c < offsprings.length - 1; c++) {
                const curr = offsprings[c];
                const next = offsprings[c + 1];
                if (next.r > curr.r * 2) {
                    // Merge current into next
                    next.r += curr.r / 2;
                    next.parents.push(...curr.parents);
                    offsprings.splice(c, 1);
                    console.log('merged');
                }
            }
            // Compute coords
            let u = 0;
            let v = t;
            for (const node of offsprings) {
                node.u = u;
                node.v = v;
                yield node;
                // const noise = this.sampleNoiseUV(node.u, node.v) * 0.03;
                u += 0.1 * Math.pow(node.r, .5);
                v -= 0.05 * Math.pow(node.r, .5);
            }
            queue = offsprings;
        }
    }

    draw() {
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    index(x: number, y: number) {
        return (y * this.imageData.width + x) * 4;
    }

    getPixel(x: number, y: number): Vector4 {
        const idx = this.index(x, y);
        return [
            this.imageData.data[idx + 0] / 255,
            this.imageData.data[idx + 1] / 255,
            this.imageData.data[idx + 2] / 255,
            this.imageData.data[idx + 3] / 255,
        ];
    }

    setPixel(x: number, y: number, v: number) {
        const idx = this.index(x, y);
        this.imageData.data[idx + 0] = v * 255;
        this.imageData.data[idx + 1] = v * 255;
        this.imageData.data[idx + 2] = v * 255;
        this.imageData.data[idx + 3] = 255;
    }

    sampleNoiseXY(xy: Vector2) {
        const [u, v] = this.xy2uv(xy);
        return this.sampleNoiseUV(u, v);
    }

    sampleNoiseUV(u: number, v: number) {
        const scale = this.settings.noiseScale;
        return this.noise.noise2D(u * scale, v * scale) * .5 + .5;
    }

    drawNoise() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.setPixel(x, y, this.sampleNoiseXY([x, y]));
            }
        }
    }

    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    xy2uv(xy: Vector2): Vector2 {
        const [x, y] = xy;
        return [x / this.width, 1 - y / this.height];
    }

    uv2xy(uv: Vector2): Vector2 {
        const [u, v] = uv;
        return [u * this.width, (1 - v) * this.height];
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

export interface Node {
    u: number;
    v: number;
    r: number;
    parents: Node[];
}
