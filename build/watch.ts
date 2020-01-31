import path from 'path';
import chokidar from 'chokidar';
import { postsSrcDir, buildPost, buildAllPosts } from './post';
import { templatesDir } from './templates';
import { debounce } from 'debounce';

// Watch blog post file changes, only when added/modified
const watchPosts = chokidar.watch(postsSrcDir);
watchPosts.on('ready', () => {
    watchPosts.on('all', (ev, file) => {
        if (ev === 'add' || ev === 'change') {
            buildPost(path.relative(postsSrcDir, file));
        }
    });
});

// Watch for template changes, and rebuild all posts
const watchOut = chokidar.watch(templatesDir);
watchOut.on('change', debounce(() => {
    console.log('Templates changed, rebuilding');
    buildAllPosts();
}, 300));
