import { sqrt3 } from '../math';
import { Hex } from '../hex';

export function getPlotWidth(rings: number, cellRadius: number, margin: number) {
    const r = rings * 2 + 1;
    return (r * cellRadius + margin) * 2;
}

export function getPlotHeight(rings: number, cellRadius: number, margin: number) {
    const r = rings * 2 + 1;
    return (r * cellRadius * sqrt3 / 2 + margin) * 2;
}

export function getSvgPath(hex: Hex, radius: number) {
    const center = hex.toOrthogonal(radius);
    const coords = Hex.VERTICES.map(v => [
        v[0] * radius + center[0],
        v[1] * radius + center[1],
    ]);
    return 'M ' + coords.map(c => `${c[0]},${c[1]}`).join(' ') + 'z';
}
