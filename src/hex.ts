import { Vector2, add, mul, dot } from './util';

export class Hex {
    static zero = new Hex(0, 0);

    static Q_BASIS: Vector2 = [2, 0];
    static R_BASIS: Vector2 = [1, Math.sqrt(3)];
    static Q_INV: Vector2 = [0.5, -Math.sqrt(3) / 6];
    static R_INV: Vector2 = [0, Math.sqrt(3) / 3];

    static AXIAL_DIRECTIONS = [
        new Hex(1, 0),
        new Hex(0, 1),
        new Hex(-1, 1),
        new Hex(-1, 0),
        new Hex(0, -1),
        new Hex(1, -1),
    ];

    constructor (
        public readonly q: number,
        public readonly r: number,
    ) {}

    static fromOrthogonal(xy: Vector2, radius: number) {
        return new Hex(
            dot(xy, Hex.Q_INV) / radius,
            dot(xy, Hex.R_INV) / radius,
        );
    }

    add(hex: Hex): Hex {
        return new Hex(this.q + hex.q, this.r + hex.r);
    }

    distanceTo(hex: Hex) {
        return (
            Math.abs(this.q - hex.q) +
            Math.abs(this.q + this.r - hex.q - hex.r) +
            Math.abs(this.r - hex.r)
        ) / 2;
    }

    toOrthogonal(radius: number): Vector2 {
        return mul(
            add(
                mul(Hex.Q_BASIS, this.q),
                mul(Hex.R_BASIS, this.r),
            ),
            radius
        );
    }

    toString() {
        return `(${this.q}; ${this.r})`;
    }

    // Traversal

    *neighbours() {
        for (const dir of Hex.AXIAL_DIRECTIONS) {
            yield this.add(dir);
        }
    }

    static *ring(center: Hex, radius: number): IterableIterator<Hex> {
        let current = center.add(new Hex(0, -radius));
        for (const dir of Hex.AXIAL_DIRECTIONS) {
            for (let i = 0; i < radius; i++) {
                yield current;
                current = current.add(dir);
            }
        }
    }

    static *spiral(center: Hex, minRadius: number, maxRadius: number): IterableIterator<Hex> {
        if (minRadius == 0) {
            yield center;
            minRadius += 1;
        }
        for (let r = minRadius; r <= maxRadius; r++) {
            for (const hex of Hex.ring(center, r)) {
                yield hex;
            }
        }
    }

}
