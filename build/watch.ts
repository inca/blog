import path from 'path';
import chokidar from 'chokidar';
import { postsSrcDir, buildPost, buildAllPosts } from './post';
import debounce from 'debounce';

const outDir = path.join(process.cwd(), 'out');

// Watch blog post file changes, only when added/modified
const watchPosts = chokidar.watch(postsSrcDir);
watchPosts.on('ready', () => {
    watchPosts.on('all', (ev, file) => {
        if (ev === 'add' || ev === 'change') {
            buildPost(path.relative(postsSrcDir, file));
        }
    });
});

// Watch out file for template changes, and rebuild all posts
const watchOut = chokidar.watch(outDir);
watchOut.on('change', debounce(() => {
    buildAllPosts();
}, 300));
