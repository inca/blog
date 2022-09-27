import { lerp } from '../commons/math.js';
import { provide } from '../commons/provide.js';

@provide('modDiagram')
export class ModDiagram {

    multiplier = 240;
    modulo = 7417;
    radius = 600;
    stroke = .1;
    width = 0;
    height = 0;
    hueRange = [0, 360];
    opacityRange = [0, 100];

    canvas: HTMLCanvasElement | null = null;

    mount(el: HTMLCanvasElement) {
        this.canvas = el;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.draw();
    }

    destroy() {
        this.canvas = null;
    }

    draw() {
        if (!this.canvas) {
            return;
        }
        const ctx = this.canvas.getContext('2d')!;
        ctx.fillStyle = '#fff';
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.fillRect(0, 0, this.width, this.height);
        let p = 1;
        for (let i = 0; i < this.modulo; i++) {
            const n = (p * this.multiplier) % this.modulo;
            const [x1, y1] = this.coords(p);
            const [x2, y2] = this.coords(n);
            p = n;
            const length = Math.hypot(Math.abs(x2 - x1), Math.abs(y2 - y1));
            const hue = lerp(this.hueRange[0], this.hueRange[1], length / this.radius / 2);
            const opacity = lerp(this.opacityRange[0], this.opacityRange[1], length / this.radius / 2);
            ctx.lineWidth = this.stroke;
            ctx.strokeStyle = `hsla(${hue}deg, 50%, 60%, ${opacity}%)`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

    private coords(i: number) {
        const cx = this.width / 2;
        const cy = this.height / 2;
        const offset = Math.PI / 2;
        const a = 2 * Math.PI / this.modulo;
        const x = Math.cos(a * i + offset) * this.radius + cx;
        const y = Math.sin(a * i + offset) * this.radius + cy;
        return [x, y];
    }

}
