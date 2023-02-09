import { Schema } from 'airtight';

import { GameNode, GameNodeSchema } from './GameNode.js';
import { NodeType, NodeTypeSchema } from './NodeType.js';

export interface GameSettings {
    nodeTypes: NodeType[];
    nodes: GameNode[];
}

export const GameSettingsSchema = new Schema<GameSettings>({
    type: 'object',
    properties: {
        nodeTypes: {
            type: 'array',
            items: NodeTypeSchema.schema,
        },
        nodes: {
            type: 'array',
            items: GameNodeSchema.schema,
        }
    }
});
