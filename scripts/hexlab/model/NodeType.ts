import { Schema } from 'airtight';

export interface NodeType {
    id: string;
    z: number;
    placement: string[];
    fill: string;
    border: string;
    image: string;
}

export const NodeTypeSchema = new Schema<NodeType>({
    type: 'object',
    properties: {
        id: { type: 'string' },
        z: { type: 'number' },
        placement: { type: 'array', items: { type: 'string' } },
        fill: { type: 'string', default: '#888' },
        border: { type: 'string', default: '#888' },
        image: { type: 'string' },
    }
});
