import { Schema } from 'airtight';

export interface NodeType {
    id: string;
    z: number;
    placement: string[];
    color: string;
    border: string;
    image: string;
}

export const NodeTypeSchema = new Schema<NodeType>({
    type: 'object',
    properties: {
        id: { type: 'string' },
        z: { type: 'number' },
        placement: { type: 'array', items: { type: 'string' } },
        color: { type: 'string' },
        border: { type: 'string' },
        image: { type: 'string' },
    }
});
