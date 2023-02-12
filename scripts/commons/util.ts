import { Hex } from './Hex';
import { sqrt3 } from './math';

export const colorScheme = [
    '#4e79a7',
    '#f28e2c',
    '#e15759',
    '#76b7b2',
    '#59a14f',
    '#edc949',
    '#af7aa1',
    '#ff9da7',
    '#9c755f',
    '#bab0ab',
    '#7a65cc',
    '#abc321',
    '#a93659',
    '#99abed',
    '#459c8a',
    '#c9755f',
];

export function getPlotWidth(rings: number, cellRadius: number, margin: number) {
    const d = 2 * cellRadius;
    return 2 * margin + (2 * rings + 1) * d;
}

export function getPlotHeight(rings: number, cellRadius: number, margin: number) {
    const d = (2 * sqrt3 / 3) * cellRadius;
    return 2 * margin + 2 * d + 3 * rings * d;
}

export function getSvgPath(hex: Hex, radius: number) {
    const center = hex.toOrthogonal(radius);
    const coords = Hex.VERTICES.map(v => [
        v[0] * radius + center[0],
        v[1] * radius + center[1],
    ]);
    return 'M ' + coords.map(c => `${c[0]},${c[1]}`).join(' ') + 'z';
}

export function openFile(): Promise<string> {
    return new Promise(resolve => {
        const el = document.createElement('input');
        el.style.display = 'none';
        el.setAttribute('type', 'file');
        document.body.appendChild(el);
        el.addEventListener('change', ev => {
            const reader = new FileReader();
            reader.onload = ev => {
                resolve(ev.target?.result as string);
            };
            reader.readAsText((ev as any).target.files[0]);
        });
        el.click();
        document.body.removeChild(el);
    });
}

export function createDownloadFile(filename: string, content: string) {
    const el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;base64,' + btoa(content));
    el.setAttribute('download', filename);
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}

export function removeWhere<T>(array: T[], predicate: (item: T) => boolean) {
    const i = array.findIndex(predicate);
    if (i > -1) {
        array.splice(i, 1);
    }
    return i !== -1;
}

export function removeAll<T>(array: T[], predicate: (item: T) => boolean) {
    const removed = removeWhere(array, predicate);
    if (removed) {
        removeAll(array, predicate);
    }
}

export function shuffle<T>(array: T[]): T[] {
    const copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy;
}
