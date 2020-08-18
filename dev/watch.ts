import path from 'path';
import chokidar from 'chokidar';
import { debounce } from 'debounce';
import { postsSrcDir, templatesDir, staticCssFiles, staticJsFiles, distDir } from './config';
import { events } from './events';
import { readPost } from './post';
import chalk from 'chalk';

export function startWatch() {
    // Watch blog post changes
    chokidar.watch(postsSrcDir)
        .on('change', (file) => {
            const id = path.relative(postsSrcDir, file);
            console.log(chalk.yellow('watch'), 'postChanged', id);
            readPost(id)
                .then(post => {
                    events.emit('event', {
                        type: 'postChanged',
                        post,
                    });
                });
        });

    // Watch for template changes
    chokidar.watch(templatesDir)
        .on('change', debounce(file => {
            const template = path.relative(templatesDir, file);
            console.log(chalk.yellow('watch'), 'templateChanged', template);
            events.emit('event', {
                type: 'templateChanged',
                template,
            });
        }, 300));

    // Watch css output
    chokidar.watch(staticCssFiles)
        .on('change', debounce(file => {
            const cssFile = path.relative(distDir, file);
            console.log(chalk.yellow('watch'), 'cssChanged', cssFile);
            events.emit('event', {
                type: 'cssChanged',
                cssFile,
            });
        }, 300));

    // Watch js output
    chokidar.watch(staticJsFiles)
        .on('change', debounce(file => {
            const jsFile = path.relative(distDir, file);
            console.log(chalk.yellow('watch'), 'jsChanged', jsFile);
            events.emit('event', {
                type: 'jsChanged',
                jsFile,
            });
        }, 300));
}
