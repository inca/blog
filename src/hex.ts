import { Vector2, add, mul, dot, sqrt3 } from './math';

export class Hex {
    static zero = new Hex(0, 0);

    static Q_BASIS: Vector2 = [2, 0];
    static R_BASIS: Vector2 = [1, sqrt3];
    static Q_INV: Vector2 = [0.5, -sqrt3 / 6];
    static R_INV: Vector2 = [0, sqrt3 / 3];

    static VERTICES: Vector2[] = [
        [1, sqrt3 / 3],
        [0, sqrt3 * 2 / 3],
        [-1, sqrt3 / 3],
        [-1, -sqrt3 / 3],
        [0, -sqrt3 * 2 / 3],
        [1, -sqrt3 / 3],
    ];

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

    toJSON() {
        return [this.q, this.r];
    }

    static fromJSON(json: Vector2) {
        return new Hex(json[0], json[1]);
    }

    cubeCoords() {
        return [this.q, this.r, 0 - this.q - this.r];
    }

    add(hex: Hex): Hex {
        return new Hex(this.q + hex.q, this.r + hex.r);
    }

    rotate(dir: number): Hex {
        // Normalize dir
        const steps = ((dir % 6) + 6) % 6;
        let coords = this.cubeCoords();
        for (let i = 0; i < steps; i++) {
            const [x, y, z] = coords;
            coords = [-y, -z, -x];
        }
        return new Hex(coords[0], coords[1]);
    }

    distanceTo(hex: Hex) {
        return (
            Math.abs(this.q - hex.q) +
            Math.abs(this.q + this.r - hex.q - hex.r) +
            Math.abs(this.r - hex.r)
        ) / 2;
    }

    toOrthogonal(radius: number = 1): Vector2 {
        return mul(
            add(
                mul(Hex.Q_BASIS, this.q),
                mul(Hex.R_BASIS, this.r),
            ),
            radius
        );
    }

    toString() {
        return `(${this.q};${this.r})`;
    }

    equals(hex: Hex) {
        return this.q === hex.q && this.r === hex.r;
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
