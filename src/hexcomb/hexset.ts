import { Hex } from '../hex';
import { Vector2 } from '../math';

export class HexSet {
    protected map: Map<string, Hex> = new Map();

    constructor(cells: Iterable<Hex> = []) {
        for (const hex of cells) {
            this.add(hex);
        }
    }

    [Symbol.iterator](): Iterator<Hex> {
        return this.map.values();
    }

    toJSON() {
        return this.getCells();
    }

    static fromJSON(arr: Vector2[]) {
        return new HexSet(arr.map(_ => Hex.fromJSON(_)));
    }

    get size() {
        return this.map.size;
    }

    getCells() {
        return [...this.map.values()];
    }

    add(hex: Hex) {
        this.map.set(hex.toString(), hex);
    }

    remove(hex: Hex) {
        this.map.delete(hex.toString());
    }

    has(hex: Hex) {
        return this.map.has(hex.toString());
    }

    rotate(dir: number): HexSet {
        const set = new HexSet();
        for (const hex of this) {
            set.add(hex.rotate(dir));
        }
        return set;
    }

    equals(set: HexSet) {
        if (this.size !== set.size) {
            return false;
        }
        for (const hex of this) {
            if (!set.has(hex)) {
                return false;
            }
        }
        return true;
    }

    getRadialSymmetry(): number[] {
        const result: number[] = [];
        for (let i = 1; i < 6; i++) {
            const rotated = this.rotate(i);
            if (this.equals(rotated)) {
                result.push(i);
            }
        }
        return result;
    }

}
