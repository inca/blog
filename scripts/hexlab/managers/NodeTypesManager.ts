import { dep } from 'mesh-ioc';

import { provide } from '../../commons/provide.js';
import { NodeType, NodeTypeSchema } from '../model/NodeType.js';
import { StateManager } from './StateManager.js';

@provide('nodeTypes')
export class NodeTypesManager {

    @dep() state!: StateManager;

    selectedIndex = -1;

    getSelectedNodeType(): NodeType | null {
        return this.state.settings.nodeTypes[this.selectedIndex] ?? null;
    }

    select(i = -1) {
        this.selectedIndex = i;
    }

    addNodeType() {
        const nodeType = NodeTypeSchema.decode({});
        this.state.settings.nodeTypes.push(nodeType);
        this.selectedIndex = this.state.settings.nodeTypes.length - 1;
        this.state.save();
    }

    get all() {
        return this.state.settings.nodeTypes;
    }

    get selected(): NodeType | null {
        return this.state.settings.nodeTypes[this.selectedIndex] ?? null;
    }

}
