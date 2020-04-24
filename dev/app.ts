import Koa from 'koa';
import serveStatic from 'koa-static';
import Router from 'koa-router2';
import { staticDir } from './config';
import { readPost } from './post';
import { renderTemplate, isTemplateExists } from './templates';

const router = new Router();
export const app = new Koa();

router.get('/posts/*', async ctx => {
    const id = ctx.params[0];
    const post = await readPost(id);
    ctx.body = renderTemplate('post', { post });
});

router.get('/*', async (ctx, next) => {
    const templateName = 'pages/' + ctx.params[0];
    console.log(templateName);
    if (await isTemplateExists(templateName)) {
        ctx.body = renderTemplate(templateName, {});
    }
    return next();
});

app.use(router.routes());
app.use(serveStatic(staticDir));
