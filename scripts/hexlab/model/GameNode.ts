import { Hex } from '../../commons/Hex.js';
import { NodeData } from '../schema/NodeData.js';
import { NodeType } from '../schema/NodeType.js';

export class GameNode {

    hex: Hex;

    constructor(
        readonly nodeData: NodeData,
        readonly nodeType: NodeType,
    ) {
        this.hex = Hex.fromJSON(nodeData.pos);
    }

}
