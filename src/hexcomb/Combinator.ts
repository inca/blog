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
            loop: for (const piece of pieceVars) {
                const newField = new HexSet(field);
                const offsetPiece = piece.offset(offset);
                // Try remove piece from that field
                for (const cell of offsetPiece) {
                    const had = newField.remove(cell);
                    if (!had) {
                        continue loop;
                    }
                }
                // Placed successfully
                const newPieces = piecesUsed.concat([{ index: pieceIndex, cells: offsetPiece }]);
                yield { field: newField, pieces: newPieces };
                yield* this._generateSteps(newField, newPieces, pieceIndex + 1);
            }
        }
        // Also traverse variants where piece is skipped
        if (this.model.field.size < this.totalPieceCellsCount) {
            yield* this._generateSteps(field, piecesUsed, pieceIndex + 1);
        }
    }

}
