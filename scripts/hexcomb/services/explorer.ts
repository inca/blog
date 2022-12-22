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

    selectSet(set: SolutionSet) {
        this.selectedIndexes = set.pieces.map(_ => _.index);
        this.filterSteps();
    }

    filterSteps() {
        this.filteredSteps = this.findStepsContainingPieces(this.selectedIndexes);
    }

    findSolutionSets() {
        this.solutionSets = [];
        const indexes = [...this.state.pieces.keys()];
        for (let size = 1; size < this.state.pieces.length; size++) {
            const sets = combinations(indexes, size);
            for (const set of sets) {
                const pieces = set.map(i => {
                    return {
                        cells: this.state.pieces[i],
                        index: i,
                    };
                });
                const cellCount = pieces.reduce((sum, p) => sum + p.cells.size, 0);
                if (cellCount !== this.state.field.size) {
                    continue;
                }
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
