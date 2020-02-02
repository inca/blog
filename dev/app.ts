import Koa from 'koa';
import serveStatic from 'koa-static';
import Router from 'koa-router2';
import { staticDir } from './config';
import { readPost } from './post';
import { renderTemplate } from './templates';

const router = new Router();
export const app = new Koa();

router.get('/posts/*', async ctx => {
    const id = ctx.params[0];
    const post = await readPost(id);
    ctx.body = renderTemplate('post.pug', { post });
});

app.use(router.routes());
app.use(serveStatic(staticDir));
