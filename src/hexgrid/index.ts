import { onReady, Vector2, add, mul } from '../util';
import { Hex } from '../hex';

const cellRadius = 16;
const colorQ = 'hsl(190, 80%, 50%)'
const colorR = 'hsl(290, 80%, 60%)'
const sqrt3 = Math.sqrt(3);
const hexVertices: Vector2[] = [
    [1, sqrt3 / 3],
    [0, sqrt3 * 2 / 3],
    [-1, sqrt3 / 3],
    [-1, -sqrt3 / 3],
    [0, -sqrt3 * 2 / 3],
    [1, -sqrt3 / 3],
];

onReady(() => drawGrids());

const modules = {
    baseGrid,
    gridOrthoAxes,
    gridObliqueAxes,
    gridCoordinates,
};

function drawGrids() {
    const svgs = document.querySelectorAll('svg.hexgrid');
    for (const svg of svgs) {
        const module = (modules as any)[svg.id];
        svg.setAttribute('transform', 'scale(1, -1)');
        if (module) {
            module(svg);
        }
    }
}

function baseGrid(svg: SVGSVGElement) {
    drawGrid(svg, {
        opacity: 1,
        opacityFade: 0.05,
        maxRing: 12,
    });
}

function gridOrthoAxes(svg: SVGSVGElement) {
    const baseSpec = {
        opacity: .6,
        opacityFade: 0.05,
        maxRing: 12,
    };
    drawGrid(svg, {
        ...baseSpec,
        lines: true,
        dots: false,
    });
    drawAxis(svg, {
        unit: [1, 0],
        color: 'hsl(0, 80%, 60%)',
        label: 'X',
    });
    drawAxis(svg, {
        unit: [0, 1],
        color: 'hsl(120, 60%, 50%)',
        label: 'Y',
    });
    drawGrid(svg, {
        ...baseSpec,
        lines: false,
        dots: true,
    });
}

function gridObliqueAxes(svg: SVGSVGElement) {
    const baseSpec = {
        opacity: .6,
        opacityFade: 0.05,
        maxRing: 12,
    };
    drawGrid(svg, {
        ...baseSpec,
        lines: true,
        dots: false,
    });
    drawAxis(svg, {
        unit: [1, 0],
        color: colorQ,
        label: 'Q',
    });
    drawAxis(svg, {
        unit: [.5, sqrt3 / 2],
        color: colorR,
        label: 'R',
    });
    drawGrid(svg, {
        ...baseSpec,
        lines: false,
        dots: true,
    });
}

function gridCoordinates(svg: SVGSVGElement) {
    const baseSpec = {
        opacity: .6,
        opacityFade: 0.05,
        maxRing: 12,
    };
    drawGrid(svg, {
        ...baseSpec,
        lines: true,
        dots: false,
    });
    const g = createElement(svg, 'g');
    g.setAttribute('class', 'hexgrid__coords');
    svg.addEventListener('mousemove', ev => {
        const path = ev.target as SVGElement;
        const q = parseInt(path.getAttribute('data-q')!);
        const r = parseInt(path.getAttribute('data-r')!);
        if (isNaN(q) || isNaN(r)) {
            return;
        }
        drawCoords(g, new Hex(q, r));
    });
}

function drawGrid(svg: SVGSVGElement, spec: HexGridSpec) {
    const {
        maxRing = 12,
        opacity = 1,
        opacityFade = 0,
        lines = true,
        dots = false,
    } = spec;
    const g = createElement(svg, 'g');
    g.setAttribute('class', 'hexgrid__grid')
    for (const hex of Hex.spiral(Hex.zero, 0, maxRing)) {
        const alpha = opacity - opacityFade * hex.distanceTo(Hex.zero);
        drawHexCell(g, hex, alpha, lines, dots);
    }
}

function drawAxis(svg: SVGSVGElement, spec: AxisSpec) {
    const { unit, color, label = '', width = 2 } = spec;
    const viewBox = getViewBox(svg);
    const minDim = Math.min(viewBox.width, viewBox.height) - 8;
    const p0 = mul(mul(unit, -1), minDim / 2);
    const p1 = mul(unit, minDim / 2);
    const d = `M ` + [p0, p1].map(p => p.join(',')).join(' ');
    const g = createElement(svg, 'g');
    g.setAttribute('class', 'hexgrid__axis');
    const line = createElement(g, 'path');
    line.setAttribute('d', d);
    line.setAttribute('stroke-width', String(width));
    line.setAttribute('stroke', color);

    const arrow = createArrowHead(g, color);
    const a = Math.atan2(unit[1], unit[0]) * 180 / Math.PI;
    arrow.setAttribute('transform', `translate(${p1[0]}, ${p1[1]}) rotate(${a})`);

    const lbl = createElement(svg, 'g');
    lbl.setAttribute('class', 'hexgrid__label');
    lbl.setAttribute('transform', `translate(${p1[0] + 8}, ${p1[1] - 16})`);
    const text = createElement(lbl, 'text');
    text.setAttribute('x', '0');
    text.setAttribute('y', '0');
    text.setAttribute('fill', color);
    text.setAttribute('transform', 'scale(1,-1)');
    // text.setAttribute('font-weight', 'bold');
    text.innerHTML = label;
}

function drawHexCell(
    svg: SVGElement,
    hex: Hex,
    opacity: number,
    lines: boolean = true,
    dot: boolean = false,
) {
    const viewbox = getViewBox(svg);
    const o = hex.toOrthogonal(cellRadius);
    if (
        o[0] < viewbox.x ||
        o[0] > (viewbox.x + viewbox.width) ||
        o[1] < (viewbox.y) ||
        o[1] > (viewbox.y + viewbox.height)
    ) {
        return;
    }
    if (lines) {
        const d = 'M' +
            hexVertices.map(p =>
                add(o, mul(p, cellRadius)).join(',')
            ).join(' ') +
            'z';
        const path = createElement(svg, 'path');
        path.setAttribute('class', 'hexgrid__cell');
        path.setAttribute('d', d);
        path.setAttribute('data-q', String(hex.q));
        path.setAttribute('data-r', String(hex.r));
        path.setAttribute('opacity', opacity);
    }
    if (dot) {
        const circle = createElement(svg, 'circle');
        circle.setAttribute('class', 'hexgrid__dot');
        circle.setAttribute('cx', String(o[0]));
        circle.setAttribute('cy', String(o[1]));
        circle.setAttribute('r', '1');
        circle.setAttribute('opacity', opacity);
    }
}

function drawCoords(svg: SVGElement, hex: Hex) {
    svg.innerHTML = '';
    // Draw step by step, starting from 0, going in Q direction first,
    // then switching to R
    let h = Hex.zero;
    let sign = Math.sign(hex.q);
    for (let i = 0; i < Math.abs(hex.q); i++) {
        const next = h.add(new Hex(sign, 0));
        const p0 = h.toOrthogonal(cellRadius);
        const p1 = next.toOrthogonal(cellRadius);
        h = next;
        drawArrow(svg, p0, p1, colorQ);
    }
    sign = Math.sign(hex.r);
    for (let i = 0; i < Math.abs(hex.r); i++) {
        const next = h.add(new Hex(0, sign));
        const p0 = h.toOrthogonal(cellRadius);
        const p1 = next.toOrthogonal(cellRadius);
        h = next;
        drawArrow(svg, p0, p1, colorR);
    }
    // Finally, draw a label
    const lbl = createElement(svg, 'g');
    const p = h.toOrthogonal(cellRadius);
    lbl.setAttribute('transform', `translate(${p[0] + 48}, ${p[1] - 16})`);
    const c = createElement(lbl, 'circle');
    c.setAttribute('class', 'hexgrid__coords');
    c.setAttribute('cx', '0');
    c.setAttribute('cy', '0');
    c.setAttribute('r', '1');
    c.setAttribute('transform', `scale(32, 8)`);
    const ql = createElement(lbl, 'text');
    ql.setAttribute('fill', colorQ);
    ql.setAttribute('transform', 'scale(1, -1)');
    ql.setAttribute('text-anchor', 'end');
    ql.setAttribute('alignment-baseline', 'middle');
    ql.textContent = ' ' + hex.q + ' ';
    const rl = createElement(lbl, 'text');
    rl.setAttribute('fill', colorR);
    rl.setAttribute('transform', 'scale(1, -1)');
    rl.setAttribute('text-anchor', 'start');
    rl.setAttribute('alignment-baseline', 'middle');
    rl.textContent = ' ' + hex.r + ' ';
}

function drawArrow(svg: SVGElement, p0: Vector2, p1: Vector2, color: string, width: number = 2) {
    const line = createElement(svg, 'path');
    const d = `M ` + [p0, p1].map(p => p.join(',')).join(' ');
    line.setAttribute('d', d);
    line.setAttribute('stroke-width', String(width));
    line.setAttribute('stroke', color);

    const arrow = createArrowHead(svg, color);
    const diff = add(p1, mul(p0, -1));
    const a = Math.atan2(diff[1], diff[0]) * 180 / Math.PI;
    arrow.setAttribute('transform', `translate(${p1[0]}, ${p1[1]}) rotate(${a})`);
}

function createArrowHead(svg: SVGElement, color: string) {
    const p = createElement(svg, 'path');
    p.setAttribute('class', 'hexgrid__arrowhead');
    p.setAttribute('d', 'M 4,0 -8,4 -8,-4 z');
    p.setAttribute('fill', color);
    return p;
}

function createElement(svg: SVGElement, tagName: string) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    svg.appendChild(g);
    return g;
}

function getViewBox(svg: SVGElement) {
    const viewport = (svg.viewportElement || svg) as SVGSVGElement;
    return viewport.viewBox.baseVal;
}

interface HexGridSpec {
    opacity: number;
    opacityFade?: number;
    maxRing?: number;
    lines?: boolean;
    dots?: boolean;
}

interface AxisSpec {
    unit: Vector2;
    color: string;
    label?: string;
    width?: number;
}
