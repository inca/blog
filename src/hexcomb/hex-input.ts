import * as d3 from 'd3';
import { Hex } from '../hex';
import { sqrt3 } from '../math';

export class HexInput {
    protected spec: HexInputSpec;
    protected value: Hex[] = [];

    root = d3.create('svg').attr('class', 'HexInput');
    container = this.root.append('g').attr('class', 'container');

    dragMode: boolean | null = null;

    constructor(spec: Partial<HexInputSpec> = {}) {
        this.spec = {
            rings: 2,
            radius: 16,
            colorActive: '#fff',
            colorInactive: '#aaa',
            margin: 16,
            ...spec,
        };
    }

    init(value: Hex[]) {
        this.value = value;
        this.update();
    }

    appendTo(container: Element): this {
        this.update();
        for (const node of this.root.nodes()) {
            container.appendChild(node);
        }
        return this;
    }

    get width() {
        const r = this.spec.rings * 2 + 1;
        return (r * this.spec.radius + this.spec.margin) * 2;
    }

    get height() {
        const r = this.spec.rings * 2 + 1;
        return (r * this.spec.radius * sqrt3 / 2 + this.spec.margin) * 2;
    }

    protected update() {
        this.root
            .attr('width', this.width)
            .attr('height', this.height);
        this.container
            .attr('transform', `translate(${this.width / 2}, ${this.height / 2}) scale(1, -1)`);
        this.container
            .selectAll('path.cell')
            .data(Hex.spiral(Hex.zero, 0, this.spec.rings))
            .join('path')
            .attr('class', 'cell')
            .attr('d', makeHexPath(this.spec.radius))
            .attr('fill', hex => {
                return this.hasCell(hex) ? this.spec.colorActive : this.spec.colorInactive;
            })
            .attr('stroke', '#000')
            .attr('transform', hex => {
                const center = hex.toOrthogonal(this.spec.radius);
                return `translate(${center[0]} ${center[1]})`;
            })
            .on('mouseup', ev => {
                this.dragMode = null;
            })
            .on('mousedown', (ev, hex) => {
                this.dragMode = !this.hasCell(hex);
                this.setCell(hex, this.dragMode);
            })
            .on('mousemove', (ev, hex) => {
                if (this.dragMode != null) {
                    this.setCell(hex, this.dragMode);
                }
            });
    }

    hasCell(hex: Hex) {
        return this.value.some(_ => _.equals(hex));
    }

    setCell(hex: Hex, value: boolean) {
        const i = this.value.findIndex(_ => _.equals(hex));
        if (i === -1 && value) {
            this.value.push(hex);
            this.update();
        } else if (i !== -1 && !value) {
            this.value.splice(i, 1);
            this.update();
        }
    }

}

interface HexInputSpec {
    rings: number;
    radius: number;
    margin: number;
    colorActive: string;
    colorInactive: string;
}

function makeHexPath(r: number) {
    return 'M ' + Hex.VERTICES.map(v => `${v[0] * r},${v[1] * r}`).join(' ') + 'z';
}
