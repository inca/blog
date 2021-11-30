import { Hex } from '../hex';
import { Vector2 } from '../math';

export class HexSet {
    protected _map: Map<string, Hex> = new Map();

    constructor(cells: Iterable<Hex> = []) {
        for (const hex of cells) {
            this.add(hex);
        }
    }

    [Symbol.iterator](): Iterator<Hex> {
        return this._map.values();
    }

    toJSON() {
        return [...this];
    }

    static fromJSON(arr: Vector2[]) {
        return new HexSet(arr.map(_ => Hex.fromJSON(_)));
    }

    get size() {
        return this._map.size;
    }

    add(hex: Hex) {
        this._map.set(hex.toString(), hex);
    }

    remove(hex: Hex) {
        const had = this._map.delete(hex.toString());
        return had;
    }

    has(hex: Hex) {
        return this._map.has(hex.toString());
    }

    map(fn: (hex: Hex) => Hex): HexSet {
        const set = new HexSet();
        for (const hex of this) {
            set.add(fn(hex));
        }
        return set;
    }

    offset(offset: Hex): HexSet {
        return this.map(_ => _.add(offset));
    }

    rotate(rot: number): HexSet {
        return this.map(_ => _.rotate(rot));
    }

    normalize() {
        // Find closest piece to median — that's our new origin
        const median = this.median;
        const rings = this.occupiedRings;
        for (const hex of Hex.spiral(median, 0, rings)) {
            if (this.has(hex)) {
                return this.map(_ => _.subtract(hex));
            }
        }
        return this;
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

    rotSymmetry() {
        const uniqRots = [...this.uniqRotations()];
        return 6 / uniqRots.length;
    }

    *uniqRotations(): IterableIterator<HexSet> {
        const norm = this.normalize();
        yield norm;
        const rot1 = norm.rotate(1).normalize();
        if (rot1.equals(norm)) {
            return;
        }
        yield rot1;
        const rot2 = norm.rotate(2).normalize();
        if (rot2.equals(norm)) {
            return;
        }
        yield rot2;
        const rot3 = norm.rotate(3).normalize();
        if (rot3.equals(norm)) {
            return;
        }
        yield rot3;
        yield norm.rotate(4).normalize();
        yield norm.rotate(5).normalize();
    }

    get occupiedRings() {
        let max = 0;
        for (const hex of this) {
            max = Math.max(max, Math.abs(hex.q), Math.abs(hex.r));
        }
        return max;
    }

    get median(): Hex {
        let sum = Hex.zero;
        for (const hex of this) {
            sum = sum.add(hex);
        }
        return new Hex(Math.floor(sum.q / this.size), Math.floor(sum.r / this.size));
    }

}
