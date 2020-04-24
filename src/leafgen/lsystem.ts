import SimplexNoise from 'simplex-noise';
import { Vector4, Vector2 } from './util';

const axiom = 'X';
const rules = {
    // 'X': 'F+[[X]-X]-F[-FX]+X',
    'X': 'F+[[X]-X]-F[-FX]+X',
    // 'X': 'F+[X[X]-X]-F[-FX]+X',
    // 'X': '[-FX][+FX][FX]',
    // 'X': 'F[[+X[X]]FF[-X[X]]]F',
    // 'X': 'F[++X]F[-X]F[++X]F[-X]F',
    'F': 'FVFV',
};

export class LSystemGenerator {
    noise: SimplexNoise;
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;
    imageData: ImageData;

    // Settings
    seed: string = 'seed';
    noiseScale: number = 20;
    iterations: number = 5;
    angle: number = 25;
    stepSize: number = .01;
    lineWidth: number = 10;
    variance: number = .25;

    path: string = '';

    constructor(
        public canvas: HTMLCanvasElement,
    ) {
        this.noise = new SimplexNoise(this.seed);
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width;
        this.height = canvas.height;
        this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);
    }

    generate() {
        this.clear();
        this.initPath();
        const iter = this.drawSteps();
        while (true) {
            const { done } = iter.next();
                if (done) {
                console.log('done');
                return;
            }
        }
        // const timer = setInterval(() => {
        //     const { done } = iter.next();
        //     if (done) {
        //         console.log('done');
        //         clearInterval(timer);
        //         return;
        //     }
        // }, 10);
    }

    initPath() {
        this.path = this.generatePath();
    }

    *drawSteps() {
        const stack: Vector4[] = [];
        let state: Vector4 = [.5, 0, 0, 1];
        for (const char of this.path) {
            const [u, v, a, r] = state;
            switch (char) {
                case 'F': {
                    const nextU = u - Math.sin(a * Math.PI / 180) * this.stepSize;
                    const nextV = v + Math.cos(a * Math.PI / 180) * this.stepSize;
                    state = [nextU, nextV, a, r * 0.95];
                    this.drawLine([u, v], [nextU, nextV], r);
                    yield;
                    break;
                }
                case '+': {
                    const [u, v, a] = state;
                    state = [u, v, a - this.angle, r];
                    break;
                }
                case '-': {
                    const [u, v, a] = state;
                    state = [u, v, a + this.angle, r];
                    break;
                }
                case '[': {
                    stack.push(state);
                    break;
                }
                case ']': {
                    state = stack.pop()!;
                    break;
                }
                case 'V': {
                    const rnd = this.sampleNoise(u, v);
                    const vr = rnd * this.variance;
                    state = [u, v, a + this.angle * vr, r];
                    break;
                }
            }
        }
    }

    drawLine(uv0: Vector2, uv1: Vector2, w: number) {
        this.ctx.lineWidth = this.lineWidth * w;
        this.ctx.strokeStyle = 'rgba(255,255,255,.5)';
        this.ctx.beginPath();
        const [x0, y0] = this.uv2xy(uv0);
        const [x1, y1] = this.uv2xy(uv1);
        this.ctx.moveTo(x0 + 10, y0);
        this.ctx.lineTo(x1 + 10, y1);
        this.ctx.stroke();
    }

    generatePath() {
        let expr = axiom;
        for (let i = 0; i < this.iterations; i++) {
            expr = this.expand(expr);
        }
        return expr;
    }

    expand(expr: string) {
        const buffer = [];
        for (let i = 0; i < expr.length; i++) {
            let found = false;
            for (const [key, value] of Object.entries(rules)) {
                if (expr.substring(i, i + key.length) === key) {
                    buffer.push(value);
                    i += key.length - 1;
                    found = true;
                    break;
                }
            }
            if (!found) {
                buffer.push(expr[i]);
            }
        }
        return buffer.join('');
    }

    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    sampleNoise(u: number, v: number) {
        return this.noise.noise2D(u * this.noiseScale, v * this.noiseScale);
    }

    xy2uv(xy: Vector2): Vector2 {
        const [x, y] = xy;
        return [x / this.width, 1 - y / this.height];
    }

    uv2xy(uv: Vector2): Vector2 {
        const [u, v] = uv;
        return [u * this.width, (1 - v) * this.height];
    }

}
