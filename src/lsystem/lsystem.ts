import SimplexNoise from 'simplex-noise';
import { Vector4, Vector2 } from '../util';

const axiom = 'X';
const rules = [
    ['X', 'FFM[Y][D+[Y]DD+[Y]DDD+Y][D-[Y]DD-[Y]DDD-Y]'],
    ['Y', 'SF[-DDFP][+DFP]F[-DDDFD[-F]F][+DY]F[-DY]FYP'],
    ['F', 'FFV'],
];
// {
    // 'X': 'F+[[X]-X]-F[-FX]+X',
    // 'X': 'F+[[X]-X]-F[-FX]+X',
    // 'X': 'F+[X[X]-X]-F[-FX]+X',
    // 'X': '[-FX][+FX][FX]',
    // 'X': 'F[[+X[X]]FF[-X[X]]]F',
    // 'X': 'F[++X]F[-X]F[++X]F[-X]F',
    // 'F': 'FVFV',
// };

export class LSystemGenerator {
    noise: SimplexNoise;
    width: number;
    height: number;
    ctx: CanvasRenderingContext2D;

    // Settings
    seed: string = 'seed';
    noiseScale: number = 20;
    iterations: number = 6;
    angle: number = 40;
    stepSize: number = .005;
    lineWidth: number = 10;
    variance: number = .05;

    path: string = '';
    median: Vector2 = [.5, .5];
    points: Vector2[] = [];

    constructor(
        public canvas: HTMLCanvasElement,
    ) {
        this.noise = new SimplexNoise(this.seed);
        this.ctx = canvas.getContext('2d')!;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    draw() {
        this.initPath();
        this.redraw();
    }

    redraw() {
        this.clear();
        this.points = [];
        const iter = this.drawSteps();
        while (true) {
            const { done } = iter.next();
            if (done) {
                break;
            }
        }

        /*
        this.ctx.strokeStyle = 'rgba(255,255,255,.05)';
        this.ctx.lineWidth = 10;
        const [cx, cy] = this.uv2xy(this.median);
        for (const p of this.points) {
            const [x, y] = this.uv2xy(p);
            this.ctx.beginPath();
            this.ctx.moveTo(cx, cy);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
        */

        /*
        this.ctx.fillStyle = 'rgba(0,255,0,.5)';
        this.ctx.beginPath();

        const points = this.points.slice().sort((a, b) => {
            const ca: Vector2 = [a[0] - m[0], a[1] - m[1]];
            const cb: Vector2 = [b[0] - m[0], b[1] - m[1]];
            const dot = ca[0] * cb[0] + ca[1] * cb[1];
            return dot;
        });
        const [x, y] = this.uv2xy(points[0]);
        this.ctx.moveTo(x, y);
        for (const p of points) {
            const [x, y] = this.uv2xy(p);
            this.ctx.lineTo(x, y);
        }
        this.ctx.fill();
        */
    }

    initPath() {
        this.path = this.generatePath();
    }

    *drawSteps() {
        const stack: State[] = [];
        let state = { u: .5, v: 0, a: 0, r: 1, d: 1 };
        for (const char of this.path) {
            const { u, v, a, r, d } = state;
            switch (char) {
                case 'F': {
                    const nextU = u - Math.sin(a * Math.PI / 180) * this.stepSize * d;
                    const nextV = v + Math.cos(a * Math.PI / 180) * this.stepSize * d;
                    state = { u: nextU, v: nextV, a, r: r * 0.985, d };
                    this.drawLine([u, v], [nextU, nextV], r);
                    yield;
                    break;
                }
                case '+': {
                    state = { u, v, a: a - this.angle, r, d };
                    break;
                }
                case '-': {
                    state = { u, v, a: a + this.angle, r, d };
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
                    state = { u, v, a: a + this.angle * vr, r, d };
                    break;
                }
                case 'D': {
                    state = { u, v, a, r, d: d * 0.9};
                    break;
                }
                case 'M': {
                    this.median = [u, v];
                    break;
                }
                case 'P': {
                    this.points.push([u, v]);
                    break;
                }
            }
        }
    }

    drawLine(uv0: Vector2, uv1: Vector2, w: number) {
        this.ctx.lineWidth = this.lineWidth * w;
        this.ctx.strokeStyle = `rgba(255,255,255,.8)`;
        this.ctx.beginPath();
        const [x0, y0] = this.uv2xy(uv0);
        const [x1, y1] = this.uv2xy(uv1);
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(x1, y1);
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
            for (const [key, value] of rules) {
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

function median(points: Vector2[]): Vector2 {
    let u = 0;
    let v = 0;
    for (const p of points) {
        u += p[0];
        v += p[1];
    }
    return [u / points.length, v / points.length];
}

function length(vec: Vector2) {
    return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1]);
}

interface State {
    u: number;
    v: number;
    a: number;
    r: number;
    d: number;
}
