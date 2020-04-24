declare namespace hljs {
    function highlightBlock(el: HTMLElement): void;
}

declare namespace MathJax {
    let extensions: string[];
    let tex: {
        inlineMath?: string[][];
        displayMath?: string[][];
    };
    let typeset: () => void | undefined;
}
