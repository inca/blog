/**
 * Optionally adds MathJax on pages that have $$ or %% markers.
 * Must be called only once (not in initContent).
 */
export function initMath() {
    const body = document.body.textContent ?? '';
    if (!/\$\$|\%\%/.test(body)) {
        return;
    }
    (window.MathJax as any) = {
        extensions: ["TeX/AMSmath.js", "TeX/AMSsymbol.js"],
        tex: {
            inlineMath: [['%%', '%%']],
            displayMath: [['$$', '$$']],
        },
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
    document.body.appendChild(script);
}
