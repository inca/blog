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

    constructor(
        readonly field: HexSet,
        readonly pieces: HexSet[],
        readonly allowFlip: boolean,
    ) {
        this.pieceVariations = this.generatePieceVariations();
        console.log(this.pieceVariations);
        this.totalPieceCellsCount = pieces.reduce((sum, p) => sum + p.size, 0);
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
        const pieceVars = this.pieceVariations[pieceIndex];
        next: for (const pieceVar of pieceVars) {
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
            [...piece.cells].sort((a, b) => a.q === b.q ? a.r - b.r : a.q - b.q)
            .join();
    }

    private generatePieceVariations() {
        const buckets: Array<HexPiece[]> = [];
        for (const [index, initialCells] of this.pieces.entries()) {
            const bucket: HexPiece[] = [];
            buckets.push(bucket);
            for (const offset of this.field) {
                for (const varCells of initialCells.uniqVariations(this.allowFlip)) {
                    const offsetCells = varCells.offset(offset);
                    const fits = this.field.hasAll(offsetCells);
                    if (fits) {
                        bucket.push({
                            index,
                            cells: offsetCells,
                        });
                    }
                }
            }
        }
        return buckets;
    }

}
