import { Hex } from '../hex';
import { HexSet } from './HexSet';
import { Model } from './Model';

interface Piece {
    index: number;
    cells: HexSet;
}

interface Step {
    field: HexSet;
    pieces: Piece[];
}

export class Combinator {
    pieceVariations: Array<HexSet[]>;
    totalPieceCellsCount: number;
    visitedSteps: Set<string> = new Set();

    constructor(
        readonly model: Model
    ) {
        this.pieceVariations = model.pieces.map(piece => {
            return [...piece.uniqRotations()];
        });
        this.totalPieceCellsCount = model.pieces.reduce((sum, p) => sum + p.size, 0);
    }

    *generateSteps() {
        yield* this._generateSteps(this.model.field, [], 0);
    }

    protected *_generateSteps(
        field: HexSet,
        piecesUsed: Piece[],
        pieceIndex: number,
    ): IterableIterator<Step> {

        if (pieceIndex >= this.pieceVariations.length) {
            return;
        }
        const pieceVars = this.pieceVariations[pieceIndex];
        for (const offset of field) {
            next: for (const piece of pieceVars) {
                const newField = new HexSet(field);
                const offsetPiece = piece.offset(offset);
                // Try remove piece from that field
                for (const cell of offsetPiece) {
                    const had = newField.remove(cell);
                    if (!had) {
                        continue next;
                    }
                }
                // Placed successfully
                const newPieces = piecesUsed.concat([{ index: pieceIndex, cells: offsetPiece }]);
                const step: Step = { field: newField, pieces: newPieces };
                // Deduplicate
                for (const hash of this.getStepHashes(step)) {
                    if (this.visitedSteps.has(hash)) {
                        continue next;
                    }
                    this.visitedSteps.add(hash);
                }
                yield step;
                yield* this._generateSteps(newField, newPieces, pieceIndex + 1);
            }
        }
        // Also traverse variants where piece is skipped
        if (this.model.field.size < this.totalPieceCellsCount) {
            yield* this._generateSteps(field, piecesUsed, pieceIndex + 1);
        }
    }

    protected *getStepHashes(step: Step) {
        const maxRotDir = 6 - step.field.rotSymmetry();
        for (let i = 0; i < maxRotDir; i++) {
            const pc = step.pieces.map(p => this.rotatePiece(p, i));
            const hash = pc.map(p => this.hashPiece(p)).join(':');
            yield hash;
        }
    }

    protected rotatePiece(piece: Piece, rot: number) {
        return {
            index: piece.index,
            cells: piece.cells.map(_ => _.rotate(rot))
        };
    }

    protected hashPiece(piece: Piece) {
        return piece.index + ';' +
            [...piece.cells].sort((a, b) => a.q - b.q || a.r - b.r).join();
    }

}
