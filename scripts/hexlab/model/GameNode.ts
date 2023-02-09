import { Schema } from 'airtight';

import { Vector2 } from '../../commons/math.js';

export interface GameNode {
    pos: Vector2;
    type: string;
    cells: Vector2[];
}

export const GameNodeSchema = new Schema<GameNode>({
    type: 'object',
    properties: {
        pos: {
            type: 'array',
            items: { type: 'number' },
        },
        type: { type: 'string' },
        cells: {
            type: 'array',
            items: {
                type: 'array',
                items: { type: 'number' },
            }
        }
    }
});
