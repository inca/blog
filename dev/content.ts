import yaml from 'yaml';
import marked from 'marked';

export interface PostContent {
    title: string;
    date: string;
    description: string;
    tags: string[];
    html: string;
}

export function parsePostContent(text: string): PostContent {
    const json = yaml.parse(text);
    const { title = '', date = '', description = '', tags = [] } = json;
    const html = [...processNode(json.content)].join('\n');
    return {
        title,
        date,
        description,
        tags,
        html,
    };
}

export function* processNode(node: Node): Iterable<string> {
    if (Array.isArray(node)) {
        for (const child of node) {
            yield* processNode(child);
        }
        return;
    }
    if (typeof node == 'string') {
        yield marked.parseInline(node);
        return;
    }
    for (const [tagName, v] of Object.entries(node)) {
        if (tagName.startsWith('$')) {
            continue;
        }
        const attrs = '';
        yield `<${tagName}${attrs}>`;
        yield* processNode(v);
        yield `</${tagName}>`;
    }
}

type Node = { [tagName: string]: Node } | string | Node[];
