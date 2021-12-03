/**
 * Optionally adds MathJax on pages that have $$ or %% markers.
 * Must be called only once (not in initContent).
 */
export function initLinks(options: InitLinkOptions = {}) {
    const links: HTMLAnchorElement[] = [].slice.call(document.querySelectorAll('a[href]'));
    for (const link of links) {
        const isExternal = link.origin !== location.origin;
        const exact = options.exactLinks && link.matches(options.exactLinks);
        const active = exact ? location.href === link.href : location.href.startsWith(link.href);
        if (active) {
            link.classList.add('active');
        }
        if (isExternal) {
            link.target = '_blank';
        }
    }
}

export interface InitLinkOptions {
    exactLinks?: string;
}
