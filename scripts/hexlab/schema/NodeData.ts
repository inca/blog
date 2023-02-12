import { Schema } from 'airtight';

import { Vector2 } from '../../commons/math.js';

export interface NodeData {
    pos: Vector2;
    type: number;
}

export const NodeDataSchema = new Schema<NodeData>({
    type: 'object',
    properties: {
        pos: {
            type: 'array',
            items: { type: 'number' },
        },
        type: { type: 'number' },
    }
});
