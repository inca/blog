import { dep } from 'mesh-ioc';

import { combinations } from '../../commons/combinatorics.js';
import { HexCombStep, HexPiece } from '../../commons/HexComb.js';
import { provide } from '../../commons/provide.js';
import { State } from './state.js';

@provide('explorer')
export class SolutionExplorer {

    @dep() private state!: State;

    selectedIndexes: number[] = [];
    filteredSteps: HexCombStep[] = [];

    setSize = 5;
    solutionSets: SolutionSet[] = [];

    isPieceSelected(index: number) {
        return this.selectedIndexes.includes(index);
    }

    setPieceSelected(index: number, selected: boolean) {
        const set = new Set(this.selectedIndexes);
        if (selected) {
            set.add(index);
        } else {
            set.delete(index);
        }
        this.selectedIndexes = [...set];
        this.filterSteps();
    }

    filterSteps() {
        this.filteredSteps = this.findStepsContainingPieces(this.selectedIndexes);
    }

    findSolutionSets() {
        const indexes = [...this.state.pieces.keys()];
        const sets = combinations(indexes, this.setSize);
        this.solutionSets = [];
        for (const set of sets) {
            const steps = this.findStepsContainingPieces(set);
            if (steps.length === 0) {
                continue;
            }
            this.solutionSets.push({
                pieces: set.map(i => {
                    return {
                        cells: this.state.pieces[i],
                        index: i,
                    };
                }),
                count: steps.length,
            });
        }
    }

    private findStepsContainingPieces(indexes: number[]) {
        return this.state.savedSteps.filter(step => {
            return indexes.every(index => {
                return step.pieces.some(_ => _.index === index);
            });
        });
    }

}

export interface SolutionSet {
    pieces: HexPiece[];
    count: number;
}
