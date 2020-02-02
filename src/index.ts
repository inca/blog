onReady(() => {
    externalizeLinks();
});

function onReady(fn: () => void) {
    if (document.readyState === 'interactive' || document.readyState === "complete") {
        setTimeout(fn, 0);
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function externalizeLinks() {
    const links = [].slice.call(document.querySelectorAll('article a')) as HTMLAnchorElement[];
    for (const link of links) {
        console.log(link);
        if (link.origin !== location.origin) {
            link.setAttribute('target', '_blank');
        }
    }
}
