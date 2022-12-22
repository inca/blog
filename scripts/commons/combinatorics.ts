export function combinations<T>(items: T[], k: number): T[][] {
    if (k === 0) {
        return [];
    }
    if (k === 1) {
        return items.map(_ => [_]);
    }
    const result: T[][] = [];
    for (let i = 0; i < items.length; i++) {
        const head = items[i];
        const tail = items.slice(i + 1);
        for (const comb of combinations(tail, k - 1)) {
            result.push([head, ...comb]);
        }
    }
    return result;
}
