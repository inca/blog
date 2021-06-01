export function onReady(fn: () => void) {
    if (document.readyState === 'interactive' || document.readyState === "complete") {
        setTimeout(fn, 0);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

export function externalizeLinks(scope: HTMLElement) {
    const links = [].slice.call(scope.querySelectorAll('article a')) as HTMLAnchorElement[];
    for (const link of links) {
        if (link.origin !== location.origin) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener');
        }
    }
}

export function highlightCode(scope: HTMLElement) {
    const blocks = [].slice.call(scope.querySelectorAll('pre code')) as HTMLElement[];
    for (const block of blocks) {
        window.hljs.highlightBlock(block);
    }
}

export function initContent(el: HTMLElement = document.documentElement) {
    externalizeLinks(el);
    highlightCode(el);
    if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
    }
}

export const colorScheme = [
    "#4e79a7",
    "#f28e2c",
    "#e15759",
    "#76b7b2",
    "#59a14f",
    "#edc949",
    "#af7aa1",
    "#ff9da7",
    "#9c755f",
    "#bab0ab",
];
