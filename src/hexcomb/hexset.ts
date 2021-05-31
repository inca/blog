import { Hex } from '../hex';
import { Vector2 } from '../math';

export class HexSet {
    protected map: Map<string, Hex> = new Map();
    protected _rotSymmetry: number | null = null;

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
        this._rotSymmetry = null;
    }

    remove(hex: Hex) {
        const had = this.map.delete(hex.toString());
        this._rotSymmetry = null;
        return had;
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

    rotSymmetry() {
        if (this._rotSymmetry == null) {
            this._rotSymmetry = this._calcRotSymmetry();
        }
        return this._rotSymmetry;
    }

    uniqRotations() {
        switch (this.rotSymmetry()) {
            case 6: return [];
            case 3: return [1];
            case 2: return [1, 2];
            default: return [1, 2, 3, 4, 5];
        }
    }

    protected _calcRotSymmetry() {
        if (this.rotate(1).equals(this)) {
            return 6;
        }
        if (this.rotate(2).equals(this)) {
            return 3;
        }
        if (this.rotate(3).equals(this)) {
            return 2;
        }
        return 1;
    }

}
