/**
 * Steps track actors on the same board.
 * Two steps are considered equal if actors share the same cells.
 */
export class GameStep {

    rank = 0;
    actorTypeMap = new Map<string, number>; // Hex(string) -> type

    isEqualTo(step: GameStep) {
        if (this.actorTypeMap.size !== step.actorTypeMap.size) {
            return false;
        }
        for (const [pos, type] of this.actorTypeMap) {
            if (step.actorTypeMap.get(pos) !== type) {
                return false;
            }
        }
        return true;
    }

}
