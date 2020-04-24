import { initContent } from './util';

connectDev();

function connectDev() {
    const ws = new WebSocket(`ws://${location.host}`);

    ws.onclose = function () {
        setTimeout(connectDev, 500);
    };

    ws.onopen = function () {
        console.log('Connected to dev server');
    };

    ws.onmessage = function (ev: MessageEvent) {
        const payload = JSON.parse(ev.data);
        switch (payload.type) {
            case 'postChanged':
                return onPostChanged(payload.post);
            case 'cssChanged':
                return onCssChanged(payload.cssFile);
            case 'templateChanged':
                return location.reload();
            case 'jsChanged':
                return location.reload();
        }
    };

    ws.onerror = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
    };

}

function onCssChanged(file: string) {
    const link = document.querySelector(`link[rel="stylesheet"][href^="/${file}"]`);
    if (link) {
        const newHref = link.getAttribute('href')?.replace(/\?.*/, '') + '?' + Date.now();
        link.setAttribute('href', newHref);
    }
}

function onPostChanged(post: Post) {
    const content = document.querySelector(`article[data-post-id="${post.id}"] .post__content`);
    if (content instanceof HTMLElement) {
        content.innerHTML = post.html;
        initContent(content);
    }
}

interface Post {
    id: string;
    html: string;
}
