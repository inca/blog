import Koa from 'koa';
import serveStatic from 'koa-static';
import Router from 'koa-router2';
import { staticDir } from './config';
import { readPost, postExists, readdAllPosts } from './post';
import { renderTemplate, isTemplateExists } from './templates';

const router = new Router();
export const app = new Koa();

router.get('/', (ctx, next) => {
    ctx.url = '/index';
    return next();
});

router.get('/*', async (ctx, next) => {
    const allPosts = await readdAllPosts();
    const allTags = [...new Set(allPosts.flatMap(p => p.tags))];
    // Try post
    const id = ctx.params[0];
    if (await postExists(id)) {
        const post = await readPost(id);
        ctx.body = renderTemplate('post', { post });
        return;
    }
    // Try page
    const templateName = 'pages/' + ctx.params[0];
    if (await isTemplateExists(templateName)) {
        ctx.body = renderTemplate(templateName, {
            allPosts,
            allTags,
        });
        return;
    }
    return next();
});

app.use(router.routes());
app.use(serveStatic(staticDir));
