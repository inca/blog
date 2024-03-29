import { add, dot, mul, sqrt3, Vector2 } from './math';

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

    constructor(
        public readonly q: number,
        public readonly r: number,
    ) {}

    toString() {
        return `${this.q},${this.r}`;
    }

    static fromString(str: string): Hex {
        const i = str.indexOf(',');
        const q = Number(str.substring(0, i)) || 0;
        const r = Number(str.substring(i + 1)) || 0;
        return new Hex(q, r);
    }

    equals(hex: Hex) {
        return this.q === hex.q && this.r === hex.r;
    }

    toJSON() {
        return [this.q, this.r];
    }

    static fromJSON(json: Vector2) {
        return new Hex(json[0], json[1]);
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

    static fromOrthogonal(xy: Vector2, radius: number) {
        return new Hex(
            dot(xy, Hex.Q_INV) / radius,
            dot(xy, Hex.R_INV) / radius,
        );
    }

    get offsetCoords(): Vector2 {
        const col = this.q + (this.r - (this.r & 1)) / 2;
        const row = this.r;
        return [col, row];
    }

    static fromOffsetCoords(coords: Vector2): Hex {
        return new Hex(
            coords[0] - (coords[1] - (coords[1] & 1)) / 2,
            coords[1],
        );
    }

    get cubeCoords() {
        return [this.q, this.r, 0 - this.q - this.r];
    }

    add(hex: Hex): Hex {
        return new Hex(this.q + hex.q, this.r + hex.r);
    }

    subtract(hex: Hex): Hex {
        return new Hex(this.q - hex.q, this.r - hex.r);
    }

    rotate(dir: number): Hex {
        // Normalize dir
        const steps = ((dir % 6) + 6) % 6;
        let coords = this.cubeCoords;
        for (let i = 0; i < steps; i++) {
            const [x, y, z] = coords;
            coords = [-y, -z, -x];
        }
        return new Hex(coords[0], coords[1]);
    }

    flip() {
        const [x, y, z] = this.cubeCoords;
        return new Hex(x, z);
    }

    distanceTo(hex: Hex) {
        return (
            Math.abs(this.q - hex.q) +
            Math.abs(this.q + this.r - hex.q - hex.r) +
            Math.abs(this.r - hex.r)
        ) / 2;
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
        if (minRadius === 0) {
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
