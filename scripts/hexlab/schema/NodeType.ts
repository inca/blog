import { Schema } from 'airtight';

export interface NodeType {
    id: string;
    layer: number;
    fill: string;
    border: string;
    image: string;
    roles: string[];
    placeMask: string[];
    passMask: string[];
    minPass: number;
    maxPass: number;
}

export const NodeTypeSchema = new Schema<NodeType>({
    type: 'object',
    properties: {
        id: { type: 'string' },
        layer: { type: 'number' },
        fill: { type: 'string', default: 'transparent' },
        border: { type: 'string', default: '#888' },
        image: { type: 'string' },
        roles: { type: 'array', items: { type: 'string' } },
        placeMask: { type: 'array', items: { type: 'string' } },
        passMask: { type: 'array', items: { type: 'string' } },
        minPass: { type: 'number' },
        maxPass: { type: 'number' },
    }
});
