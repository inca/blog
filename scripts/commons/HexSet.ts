import { Hex } from './Hex';
import { Vector2 } from './math';

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

    tryRemoveAll(cells: Iterable<Hex>) {
        for (const cell of cells) {
            if (!this.remove(cell)) {
                return false;
            }
        }
        return true;
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

    flip(): HexSet {
        return this.map(_ => _.flip());
    }

    normalize() {
        // Find closest piece to median — that's our new origin
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
        const hashes = new Set<string>();
        for (let i = 0; i <= 5; i++) {
            const rot = norm.rotate(i).normalize();
            if (hashes.has(rot.hash)) {
                continue;
            }
            yield rot;
            hashes.add(rot.hash);
        }
    }

    *uniqVariations(allowFlip: boolean): IterableIterator<HexSet> {
        const candidates = [...this.uniqRotations()];
        if (allowFlip) {
            candidates.push(...this.flip().uniqRotations());
        }
        // TODO deduplicate better
        const map = new Map<string, HexSet>(candidates.map(_ => [_.hash, _]));
        yield* map.values();
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

    get hash() {
        return [...this].sort((a, b) => a.q - b.q || a.r - b.r).join();
    }

}
