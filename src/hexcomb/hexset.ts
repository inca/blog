import { Hex } from '../hex';
import { Vector2 } from '../math';

export class HexSet {
    protected _map: Map<string, Hex> = new Map();
    protected _rotSymmetry: number | null = null;

    constructor(cells: Iterable<Hex> = []) {
        for (const hex of cells) {
            this.add(hex);
        }
    }

    [Symbol.iterator](): Iterator<Hex> {
        return this._map.values();
    }

    toJSON() {
        return this.getCells();
    }

    static fromJSON(arr: Vector2[]) {
        return new HexSet(arr.map(_ => Hex.fromJSON(_)));
    }

    get size() {
        return this._map.size;
    }

    getCells() {
        return [...this];
    }

    add(hex: Hex) {
        this._map.set(hex.toString(), hex);
        this._rotSymmetry = null;
    }

    remove(hex: Hex) {
        const had = this._map.delete(hex.toString());
        this._rotSymmetry = null;
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
        return this.map(_ => _.subtract(this.median));
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
        if (this._rotSymmetry == null) {
            this._rotSymmetry = this._calcRotSymmetry();
        }
        return this._rotSymmetry;
    }

    uniqRotations() {
        switch (this.rotSymmetry()) {
            case 6: return [0];
            case 3: return [0, 1];
            case 2: return [0, 1, 2];
            default: return [0, 1, 2, 3, 4, 5];
        }
    }

    maxRing() {
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
        return new Hex(Math.ceil(sum.q / this.size), Math.ceil(sum.r / this.size));
    }

    protected _calcRotSymmetry() {
        const normalized = this.normalize();
        if (this.rotate(1).normalize().equals(normalized)) {
            return 6;
        }
        if (this.rotate(2).normalize().equals(normalized)) {
            return 3;
        }
        if (this.rotate(3).normalize().equals(normalized)) {
            return 2;
        }
        return 1;
    }

}
