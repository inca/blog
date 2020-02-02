import glob from 'glob';
import { promisify } from 'util';
import { readPost, writePost } from './post';
import { postsSrcDir } from './config';

const globAsync = promisify(glob);

export async function buildPost(file: string) {
    console.log('post', 'Building post', { file });
    const post = await readPost(file);
    await writePost(post);
}

export async function buildAllPosts() {
    const files = await globAsync('**/*.rho', {
        cwd: postsSrcDir,
    });
    await Promise.all(files.map(f => buildPost(f)));
}
