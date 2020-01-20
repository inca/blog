import { Post } from './post';

export function wrap(spec: {
    title: string,
    body: string,
}) {
    const { title, body } = spec;
    return `
<!doctype html>
<html>
<head>
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i&display=swap&subset=cyrillic"
        rel="stylesheet">
    <link rel="stylesheet"
        href="/build/index.css"/>
    <link rel="shortcut icon"
        href="/favicon.ico"/>
</head>
<body>
${body}
<script src="/build/index.js"></script>
</body>
</html>
    `;
}

export function layout(spec: {
    title?: string,
    content: string,
}) {
    const { title = '', content } = spec;
    return wrap({
        title: [title, 'AlphaMagenta'].join(' · '),
        body: `
        <div class="header">
            <div class="container header__container">
                TODO
            </div>
        </div>
        <div class="content">
            <div class="container content__container">
                ${content}
            </div>
        </div>
        <div class="footer">
            <div class="container footer__container">
                TODO
            </div>
        </div>
        `
    })
}

export function post(
    post: Post,
) {
    return layout({
        title: post.title,
        content: `
        <article class="post">
            <div class="post__cal cal">
                <div class="cal__day">${post.date.format('DD')}</div>
                <div class="cal__month">${post.date.format('MM')}</div>
                <div class="cal__year">${post.date.format('YYYY')}</div>
            <div>
            <header class="post__title">
                <h1>${post.title}</h1>
            </header>
            <div class="post__content">
            ${post.html}
            </div>
        </article>
        `
    });
}
