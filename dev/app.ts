import Koa from 'koa';
import serveStatic from 'koa-static';
import Router from 'koa-router2';
import { staticDir } from './config';
import { readPost, postExists, readdAllPosts } from './post';
import { renderTemplate, isTemplateExists } from './templates';
import { readCommonRenderContext } from './util';

const router = new Router();
export const app = new Koa();

router.get('/', (ctx, next) => {
    ctx.url = '/index';
    return next();
});

router.get('/*', async (ctx, next) => {
    const data = await readCommonRenderContext();
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
        ctx.body = renderTemplate(templateName, data);
        return;
    }
    return next();
});

app.use(router.routes());
app.use(serveStatic(staticDir));
