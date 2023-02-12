import { Hex } from '../../commons/Hex.js';
import { GameSettings } from '../schema/GameSettings.js';
import { NodeData } from '../schema/NodeData.js';
import { GameNode } from './GameNode.js';

export class GameField {

    map = new Map<string, GameNode[]>();

    constructor(readonly settings: GameSettings) {
        this.initNodes();
    }

    private initNodes() {
        for (const nodeData of this.settings.nodes) {
            this.registerNode(nodeData);
        }
    }

    // TODO cache if accessed frequently
    getAllNodes(): GameNode[] {
        const res: GameNode[] = [];
        for (const bucket of this.map.values()) {
            res.push(...bucket);
        }
        return res.sort((a, b) => a.nodeType.layer - b.nodeType.layer);
    }

    getNodesAt(hex: Hex) {
        return this.map.get(hex.toString()) ?? [];
    }

    hasNodeAt(hex: Hex, layer: number) {
        for (const node of this.getNodesAt(hex)) {
            if (node.nodeType.layer === layer) {
                return true;
            }
        }
        return false;
    }

    addNode(hex: Hex, type: number, overwrite = false) {
        const nodeType = this.settings.nodeTypes[type];
        if (!nodeType) {
            return;
        }
        if (this.hasNodeAt(hex, nodeType.layer)) {
            if (overwrite) {
                this.removeByLayer(hex, nodeType.layer);
            } else {
                return;
            }
        }
        const nodeData: NodeData = {
            pos: hex.toJSON(),
            type,
        };
        this.registerNode(nodeData);
        this.syncNodesToSettings();
    }

    removeByLayer(hex: Hex, layer: number) {
        const bucket = this.getNodesAt(hex);
        const i = bucket.findIndex(n => n.nodeType.layer === layer);
        if (i > -1) {
            bucket.splice(i, 1);
        }
    }

    private registerNode(nodeData: NodeData) {
        const nodeType = this.settings.nodeTypes[nodeData.type];
        if (!nodeType) {
            return;
        }
        const node = new GameNode(nodeData, nodeType);
        const bucket = this.getNodesAt(node.hex);
        const i = bucket.findIndex(n => n.nodeType.layer === nodeType.layer);
        // Only add node if there's no other node on that layer
        if (i === -1) {
            bucket.push(node);
        }
        this.map.set(node.hex.toString(), bucket);
    }


    private syncNodesToSettings() {
        this.settings.nodes = this.getAllNodes().map(_ => _.nodeData);
    }
}
