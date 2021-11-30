/**
 * Optionally adds MathJax on pages that have $$ or %% markers.
 * Must be called only once (not in initContent).
 */
export function initLinks(options: InitLinkOptions = {}) {
    const links: HTMLAnchorElement[] = [].slice.call(document.querySelectorAll('a[href]'));
    for (const link of links) {
        const exact = options.exactLinks && link.matches(options.exactLinks);
        const active = exact ? location.href === link.href : location.href.startsWith(link.href);
        if (active) {
            link.classList.add('active');
        }
    }
}

export interface InitLinkOptions {
    exactLinks?: string;
}
