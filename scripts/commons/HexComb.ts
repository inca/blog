import { Hex } from './Hex.js';
import { HexSet } from './HexSet';

export interface HexPiece {
    index: number;
    cells: HexSet;
}

export interface HexCombStep {
    field: HexSet;
    pieces: HexPiece[];
}

export class HexComb {
    pieceVariations: Array<HexPiece[]>;
    totalPieceCellsCount: number;
    minPieceCellsCount: number;
    counter = 0;

    constructor(
        readonly field: HexSet,
        readonly pieces: HexPiece[],
        readonly allowFlip: boolean,
    ) {
        this.pieceVariations = this.generatePieceVariations();
        this.totalPieceCellsCount = pieces.reduce((sum, p) => sum + p.cells.size, 0);
        this.minPieceCellsCount = pieces.reduce((res, p) => Math.min(res, p.cells.size), +Infinity);
        const totalCombs = this.pieceVariations.reduce((res, vars) => res * vars.length, 1);
        console.info('Total combs', totalCombs);
    }

    *generateSteps() {
        yield* this._generateSteps(this.field, [], 0);
    }

    protected *_generateSteps(
        field: HexSet,
        piecesUsed: HexPiece[],
        pieceIndex: number,
    ): IterableIterator<HexCombStep> {
        const visitedHashes = new Set<string>();
        if (pieceIndex >= this.pieceVariations.length) {
            return;
        }
        // Opt: check min partition
        const minPart = field.getMinPartition();
        if (minPart.size < this.minPieceCellsCount) {
            return;
        }
        const pieceVars = this.pieceVariations[pieceIndex];
        next: for (const pieceVar of pieceVars) {
            this.counter += 1;
            // if (this.counter % 1_000_000 === 0) {
            //     console.info(this.counter);
            // }
            const newField = new HexSet(field);
            // Try remove piece from that field
            if (!newField.tryRemoveAll(pieceVar.cells)) {
                continue next;
            }
            // Placed successfully
            const newPieces = piecesUsed.concat(pieceVar);
            const step: HexCombStep = { field: newField, pieces: newPieces };
            // Deduplicate
            for (const hash of this.getStepHashes(step)) {
                if (visitedHashes.has(hash)) {
                    continue next;
                }
                visitedHashes.add(hash);
            }
            yield step;
            yield* this._generateSteps(newField, newPieces, pieceIndex + 1);
        }
        // Also traverse variants where piece is skipped
        if (this.field.size < this.totalPieceCellsCount) {
            yield* this._generateSteps(field, piecesUsed, pieceIndex + 1);
        }
    }

    private *getStepHashes(step: HexCombStep) {
        const maxRotDir = 6 - step.field.rotSymmetry();
        for (let i = 0; i < maxRotDir; i++) {
            const pc = step.pieces.map(p => this.rotatePiece(p, i));
            const hash = pc.map(p => this.hashPiece(p)).join(':');
            yield hash;
        }
    }

    private rotatePiece(piece: HexPiece, rot: number): HexPiece {
        return {
            index: piece.index,
            cells: piece.cells.map(_ => _.rotate(rot)),
        };
    }

    private hashPiece(piece: HexPiece) {
        return piece.index + ';' +
            [...piece.cells].sort((a, b) => a.q - b.q || a.r - b.r)
                .join();
    }

    private generatePieceVariations() {
        const buckets: Array<HexPiece[]> = [];
        const sortedPieces = this.pieces.slice().sort((a, b) => b.cells.size - a.cells.size);
        const maxRings = this.field.occupiedRings + Math.max(...sortedPieces.map(_ => _.cells.occupiedRings));
        for (const piece of sortedPieces) {
            const bucket: HexPiece[] = [];
            buckets.push(bucket);
            for (const offset of Hex.spiral(Hex.zero, 0, maxRings)) {
                for (const varCells of piece.cells.uniqVariations(this.allowFlip)) {
                    const offsetCells = varCells.offset(offset);
                    const fits = this.field.hasAll(offsetCells);
                    if (fits) {
                        bucket.push({
                            index: piece.index,
                            cells: offsetCells,
                        });
                    }
                }
            }
        }
        return buckets;
    }

}
