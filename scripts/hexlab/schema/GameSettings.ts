import { Schema } from 'airtight';

import { NodeData, NodeDataSchema } from './NodeData.js';
import { NodeType, NodeTypeSchema } from './NodeType.js';

export interface GameSettings {
    nodeTypes: NodeType[];
    nodes: NodeData[];
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
            items: NodeDataSchema.schema,
        }
    }
});
