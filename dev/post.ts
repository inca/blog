import path from 'path';
import { promises as fs } from 'fs';
import moment from 'moment';
import { renderTemplate } from './templates';
import { postsSrcDir, postsDstDir, isProduction, origin } from './config';
import { promisify } from 'util';
import glob from 'glob';
import { parsePostContent } from './content';

const globAsync = promisify(glob);

export interface Post {
    id: string,
    srcFile: string,
    dstFile: string,
    url: string;
    title: string;
    description: string;
    tags: string[];
    date: moment.Moment;
    html: string;
    draft: boolean;
}

export function getPostSrcFile(id: string) {
    return path.join(postsSrcDir, getPostId(id) + '.yaml');
}

export function getPostDstFile(id: string) {
    return path.join(postsDstDir, getPostId(id) + '.html');
}

export function getPostId(file: string) {
    const rel = file.startsWith(postsSrcDir) ? file.substring(postsSrcDir.length) :
        file.startsWith(postsDstDir) ? file.substring(postsDstDir.length) : file;
    return rel.replace(/\.(?:html|yaml)$/, '');
}

export function getPostUrl(id: string) {
    return `${isProduction ? origin : ''}/${id}`;
}

export async function postExists(id: string) {
    const srcFile = getPostSrcFile(id);
    try {
        const stat = await fs.stat(srcFile);
        return stat.isFile();
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
}

export async function readPost(id: string): Promise<Post> {
    id = getPostId(id);
    const url = getPostUrl(id);
    const srcFile = getPostSrcFile(id);
    const dstFile = getPostDstFile(id);
    const txt = await fs.readFile(srcFile, 'utf-8');
    const content = parsePostContent(txt);
    return {
        id,
        url,
        srcFile,
        dstFile,
        title: content.title,
        description: content.description,
        tags: content.tags,
        date: moment(content.date),
        html: content.html,
        draft: id.startsWith('drafts/'),
    };
}

export async function readdAllPosts(): Promise<Post[]> {
    const files = await globAsync('**/*.yaml', {
        cwd: postsSrcDir,
    });
    return Promise.all(files.map(f => readPost(f)));
}

export async function writePost(post: Post) {
    const out = renderTemplate('post', { post });
    const dir = path.dirname(post.dstFile);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(post.dstFile, out, 'utf-8');
}
