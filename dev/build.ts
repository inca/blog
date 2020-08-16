import glob from 'glob';
import { promisify } from 'util';
import { readPost, writePost } from './post';
import { postsSrcDir, templatesDir, staticDir } from './config';
import path from 'path';
import { readCommonRenderContext } from './util';
import { renderTemplate } from './templates';
import { promises as fs } from 'fs';

const globAsync = promisify(glob);

export async function buildPost(file: string) {
    console.log('post', 'Building post', { file });
    const post = await readPost(file);
    await writePost(post);
}

export async function buildPosts() {
    const files = await globAsync('**/*.rho', {
        cwd: postsSrcDir,
    });
    await Promise.all(files.map(f => buildPost(f)));
}

export async function buildPages() {
    const pagesDir = path.join(templatesDir, 'pages');
    const pages = await globAsync('**/*.pug', {
        cwd: pagesDir,
    });
    const data = await readCommonRenderContext();
    for (const page of pages) {
        console.log(page);
        const txt = renderTemplate('pages/' + page, data);
        const targetFile = path.join(staticDir, page.replace(/\.pug$/, '.html'));
        await fs.writeFile(targetFile, txt, 'utf-8');
    }
}
