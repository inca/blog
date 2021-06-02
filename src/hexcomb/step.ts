import { Hex } from '../hex';
import { HexSet } from './hexset';
import { Model } from './model';

export class Step {
    field!: HexSet;
    isValid: boolean;

    protected constructor(
        readonly model: Model,
        readonly parent: Step | null,
        readonly index: number,
        readonly piece: HexSet,
    ) {
        this.field = parent ? new HexSet(parent.field) : model.field;
        this.isValid = true;
        for (const cell of piece) {
            const had = this.field.remove(cell);
            if (!had) {
                this.isValid = false;
                break;
            }
        }
    }

    static init(model: Model) {
        return new Step(model, null, -1, new HexSet());
    }

    *iteratePieces(): IterableIterator<{ index: number, cells: HexSet }> {
        if (this.index > -1) {
            yield { index: this.index, cells: this.piece };
        }
        if (this.parent) {
            yield* this.parent.iteratePieces();
        }
    }

    *generateSteps(ctx: StepContext = new StepContext()): IterableIterator<Step> {
        for (let i = this.index + 1; i < this.model.pieces.length; i += 1) {
            const piece = this.model.pieces[i];
            for (const offset of this.field) {
                for (const rotated of piece.uniqRotations()) {
                    const p = rotated.offset(offset);
                    const step = new Step(this.model, this, i, p);
                    if (!step.isValid) {
                        continue;
                    }
                    ctx.stepsCount += 1;
                    yield step;
                    yield* step.generateSteps(ctx);
                }
            }
        }
    }

    *generatePerfectFits(ctx: StepContext = new StepContext()): IterableIterator<Step> {
        console.log('Generating...');
        for (const step of this.generateSteps(ctx)) {
            if (ctx.stepsCount % 1000 === 0) {
                console.log(`Checked ${ctx.stepsCount} steps so far`);
            }
            if (step.field.size === 0) {
                yield step;
            }
        }
        console.log(`Done in ${ctx.stepsCount} steps`);
    }

}

export class StepContext {
    stepsCount: number = 0;
}
