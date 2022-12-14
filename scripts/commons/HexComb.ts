import { HexSet } from './HexSet';
import { Piece, Step } from './types';

export class HexComb {
    pieceVariations: Array<HexSet[]>;
    totalPieceCellsCount: number;

    constructor(
        readonly field: HexSet,
        readonly pieces: HexSet[],
        readonly allowFlip: boolean,
    ) {
        this.pieceVariations = pieces.map(piece => {
            return [...piece.uniqVariations(allowFlip)];
        });
        this.totalPieceCellsCount = pieces.reduce((sum, p) => sum + p.size, 0);
    }

    *generateSteps() {
        yield* this._generateSteps(this.field, [], 0);
    }

    protected *_generateSteps(
        field: HexSet,
        piecesUsed: Piece[],
        pieceIndex: number,
    ): IterableIterator<Step> {
        const visitedHashes = new Set<string>();
        if (pieceIndex >= this.pieceVariations.length) {
            return;
        }
        const pieceVars = this.pieceVariations[pieceIndex];
        for (const offset of field) {
            next: for (const piece of pieceVars) {
                const newField = new HexSet(field);
                const offsetPiece = piece.offset(offset);
                // Try remove piece from that field
                if (!newField.tryRemoveAll(offsetPiece)) {
                    continue next;
                }
                // Placed successfully
                const newPieces = piecesUsed.concat([{ index: pieceIndex, cells: offsetPiece }]);
                const step: Step = { field: newField, pieces: newPieces };
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
        }
        // Also traverse variants where piece is skipped
        if (this.field.size < this.totalPieceCellsCount) {
            yield* this._generateSteps(field, piecesUsed, pieceIndex + 1);
        }
    }

    private *getStepHashes(step: Step) {
        const maxRotDir = 6 - step.field.rotSymmetry();
        for (let i = 0; i < maxRotDir; i++) {
            const pc = step.pieces.map(p => this.rotatePiece(p, i));
            const hash = pc.map(p => this.hashPiece(p)).join(':');
            yield hash;
        }
    }

    private rotatePiece(piece: Piece, rot: number) {
        return {
            index: piece.index,
            cells: piece.cells.map(_ => _.rotate(rot))
        };
    }

    private hashPiece(piece: Piece) {
        return piece.index + ';' +
            [...piece.cells].sort((a, b) => a.q === b.q ? a.r - b.r : a.q - b.q)
            .join();
    }

}
